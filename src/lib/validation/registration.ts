import { z } from "zod";

import { isValidCnpj, stripCnpj } from "./cnpj";

/**
 * Contrato do formulário de cadastro (Figma: frame 7:140 / 7:395).
 *
 * O schema é a autoridade e roda no servidor — os atributos HTML (`required`,
 * `type`, `accept`) são só a primeira barreira, para dar retorno imediato a
 * quem preenche. Nada do que chega do cliente é assumido como válido.
 */

/** Limite por arquivo. Precisa caber no `bodySizeLimit` do next.config.ts. */
export const MAX_FILE_BYTES = 5 * 1024 * 1024;

/** Só documentos: PDF e imagens. Nada executável. */
export const ACCEPTED_FILE_TYPES = [
  "application/pdf",
  "image/jpeg",
  "image/png",
  "image/webp",
] as const;

export const ACCEPTED_FILE_EXTENSIONS = ".pdf,.jpg,.jpeg,.png,.webp";

const optionalDocument = z
  .instanceof(File)
  .optional()
  // Campo de arquivo vazio chega como um File de 0 byte: trate como ausente.
  .transform((file) => (file && file.size > 0 ? file : undefined))
  .refine((file) => !file || file.size <= MAX_FILE_BYTES, {
    message: "O arquivo precisa ter no máximo 5 MB.",
  })
  .refine(
    (file) =>
      !file || (ACCEPTED_FILE_TYPES as readonly string[]).includes(file.type),
    { message: "Formato não aceito. Envie PDF, JPG, PNG ou WEBP." },
  );

export const registrationSchema = z.object({
  cnpj: z
    .string()
    .trim()
    .min(1, "Informe o CNPJ.")
    .refine(isValidCnpj, "CNPJ inválido — confira os números.")
    .transform(stripCnpj),

  company: z
    .string()
    .trim()
    .min(2, "Informe a razão social da empresa.")
    .max(120, "Máximo de 120 caracteres."),

  tradeName: z
    .string()
    .trim()
    .min(2, "Informe o nome fantasia.")
    .max(120, "Máximo de 120 caracteres."),

  phone: z
    .string()
    .trim()
    .min(1, "Informe o telefone.")
    .refine((value) => {
      const digits = value.replace(/\D/g, "");
      // 10 dígitos (fixo) ou 11 (celular), sempre com DDD válido.
      return (
        (digits.length === 10 || digits.length === 11) &&
        Number(digits.slice(0, 2)) >= 11
      );
    }, "Telefone inválido — inclua o DDD."),

  email: z
    .email("E-mail inválido.")
    .trim()
    .max(160, "Máximo de 160 caracteres."),

  articlesOfAssociation: optionalDocument,
  latestAmendment: optionalDocument,
  financialStatements: optionalDocument,
  proofOfAddress: optionalDocument,
  identityDocument: optionalDocument,
});

export type RegistrationInput = z.infer<typeof registrationSchema>;
export type RegistrationField = keyof RegistrationInput;

/** Campo-armadilha: preenchido só por robô, precisa chegar vazio. */
export const HONEYPOT_FIELD = "website";
