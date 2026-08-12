"use server";

import { headers } from "next/headers";

import { rateLimit } from "@/lib/rate-limit";
import {
  HONEYPOT_FIELD,
  registrationSchema,
  type RegistrationField,
  type RegistrationInput,
} from "@/lib/validation/registration";

import type { RegistrationState } from "./registration-state";

const RATE_LIMIT = { limit: 5, windowMs: 10 * 60 * 1000 };

/**
 * Identifica o cliente para o rate limit. `x-forwarded-for` é definido pelo
 * proxy da hospedagem; o primeiro item é o IP de origem. Se não houver
 * cabeçalho, todos caem num balde único — restritivo por padrão, e não
 * permissivo.
 */
async function clientKey(): Promise<string> {
  const headerList = await headers();
  const forwarded = headerList.get("x-forwarded-for");
  return forwarded?.split(",")[0]?.trim() || "sem-ip";
}

/**
 * Ponto único de integração: hoje só registra que o cadastro chegou.
 *
 * TODO — ligar ao destino real (e-mail transacional, CRM ou storage dos
 * anexos). Enquanto isso, os arquivos não são persistidos em lugar nenhum.
 */
async function deliverRegistration(data: RegistrationInput): Promise<void> {
  const attachments = (
    [
      "articlesOfAssociation",
      "latestAmendment",
      "financialStatements",
      "proofOfAddress",
      "identityDocument",
    ] as const
  ).filter((field) => data[field] !== undefined);

  // Nunca logue o payload inteiro: CNPJ, telefone e e-mail são dados pessoais.
  console.info("[cadastro] recebido", {
    cnpj: `***${data.cnpj.slice(-4)}`,
    attachments: attachments.length,
  });
}

export async function submitRegistration(
  _previousState: RegistrationState,
  formData: FormData,
): Promise<RegistrationState> {
  // 1. Armadilha para robôs — campo escondido que só um script preenche.
  if (String(formData.get(HONEYPOT_FIELD) ?? "").length > 0) {
    // Devolve sucesso para não ensinar o robô a contornar a checagem.
    return { status: "success", message: "Cadastro enviado com sucesso!" };
  }

  // 2. Rate limit antes de qualquer trabalho caro (parsing de arquivos).
  const { allowed, retryAfterSeconds } = rateLimit(
    await clientKey(),
    RATE_LIMIT,
  );

  if (!allowed) {
    const minutes = Math.ceil(retryAfterSeconds / 60);
    return {
      status: "error",
      message: `Muitas tentativas seguidas. Tente novamente em ${minutes} min.`,
    };
  }

  // 3. Validação — a fonte de verdade.
  const parsed = registrationSchema.safeParse({
    cnpj: formData.get("cnpj"),
    company: formData.get("company"),
    tradeName: formData.get("tradeName"),
    phone: formData.get("phone"),
    email: formData.get("email"),
    articlesOfAssociation: formData.get("articlesOfAssociation"),
    latestAmendment: formData.get("latestAmendment"),
    financialStatements: formData.get("financialStatements"),
    proofOfAddress: formData.get("proofOfAddress"),
    identityDocument: formData.get("identityDocument"),
  });

  if (!parsed.success) {
    const errors: Partial<Record<RegistrationField, string>> = {};

    for (const issue of parsed.error.issues) {
      const field = issue.path[0] as RegistrationField | undefined;
      // Mantém só a primeira mensagem por campo — é a que fica sob o input.
      if (field && !errors[field]) errors[field] = issue.message;
    }

    return {
      status: "error",
      message: "Confira os campos destacados e envie novamente.",
      errors,
    };
  }

  try {
    await deliverRegistration(parsed.data);
  } catch (error) {
    console.error("[cadastro] falha ao entregar", error);
    return {
      status: "error",
      message:
        "Não conseguimos enviar seu cadastro agora. Tente novamente em instantes.",
    };
  }

  return {
    status: "success",
    message:
      "Cadastro enviado! Em breve um dos nossos especialistas entra em contato.",
  };
}
