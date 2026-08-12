import { RichText } from "@/components/ui/rich-text";
import { sectionIds } from "@/config/site";
import { registrationContent } from "@/content/registration";

import { DocumentChecklist } from "./document-checklist";
import { RegistrationForm } from "./registration-form";

/**
 * Seção 3 — Cadastro (Figma: frames 7:123, 7:128 e 7:140 no desktop;
 * 7:380, 7:383 e 7:395 no mobile).
 *
 * Calha de 48px (3.5139vw), a mesma do header e do hero — a seção de serviços
 * é a exceção, com 90px.
 *
 * `z-10`: no comp o card do formulário passa por cima da faixa azul do rodapé,
 * que começa em y=2544 enquanto o formulário só termina em 2999. Quando o
 * rodapé entrar, ele precisa subir com margem negativa e ficar em `z-0`.
 */
export function Registration() {
  return (
    <section
      id={sectionIds.signup}
      aria-labelledby="registration-title"
      className="relative z-10"
    >
      <div className="px-5 lg:px-[3.5139vw]">
        <div className="text-ink text-center">
          <h2
            id="registration-title"
            // Sem largura máxima: no mobile quebra em 2 linhas na própria
            // calha (comp 7:381) e no desktop cabe em 1 linha (comp 7:125).
            className="text-[max(32px,3.0747vw)] leading-none font-medium"
          >
            <RichText segments={registrationContent.title} />
          </h2>

          <p className="mx-auto mt-3 text-[max(18px,1.3177vw)] leading-[1.21] lg:mt-[1.1713vw] lg:max-w-[39.92%]">
            {registrationContent.subtitle}
          </p>
        </div>

        <div className="mt-[30px] grid gap-y-[21px] lg:mt-[3.5139vw] lg:grid-cols-[25.748%_1fr] lg:gap-x-[8.189%] lg:gap-y-0">
          <DocumentChecklist className="lg:pt-[6.0029vw]" />
          <RegistrationForm />
        </div>
      </div>
    </section>
  );
}
