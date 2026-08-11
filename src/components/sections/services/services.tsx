import Image from "next/image";

import { sectionIds } from "@/config/site";
import { servicesContent } from "@/content/services";
import { CheckBadgeIcon } from "@/components/icons";
import { RichText } from "@/components/ui/rich-text";

import { ServicesCollage } from "./services-collage";

/**
 * Seção 2 — Serviços (Figma: frame 7:59 no desktop; nós 7:317, 7:318, 7:325 e
 * 7:351 no mobile).
 *
 * A seção usa a calha de 90px do frame (6.5885vw), maior que a de 48px do
 * header e do hero — é assim no design.
 *
 * Tipografia e espaçamentos seguem `max(valor-mobile, proporção-de-1366)`:
 * a expressão devolve exatamente o comp de 360 nas larguras pequenas, o de
 * 1366 na largura desenhada, e interpola entre os dois sem breakpoint.
 */
export function Services() {
  return (
    // `overflow-x: clip` contém a sangria lateral da colagem no mobile sem
    // criar contexto de rolagem: a moeda decorativa continua vazando para
    // baixo, como no design.
    <section
      id={sectionIds.services}
      aria-labelledby="services-title"
      className="relative overflow-x-clip pb-[100px] lg:pb-[6.1493vw]"
    >
      {/* Moeda desfocada sangrando na borda direita (nós 7:60 / 7:61). */}
      <div
        aria-hidden
        className="pointer-events-none absolute right-0 bottom-[11px] h-[140px] w-[114px] overflow-hidden lg:bottom-[-4.978vw] lg:h-[19.839vw] lg:w-[14.934vw]"
      >
        <div className="relative h-full w-[155px] lg:w-[22.035vw] lg:blur-[6px]">
          <Image
            src="/services/coin.png"
            alt=""
            fill
            sizes="(min-width: 1024px) 23vw, 155px"
            className="object-contain"
          />
        </div>
      </div>

      <div className="px-5 lg:px-[6.5885vw]">
        {/* O bloco de intro é centralizado com um deslocamento de +24px à
            direita, exatamente como no Figma (`left: calc(50% + 24px)`).
            Remova o `lg:translate-x-…` para centralizar de verdade. */}
        <div className="text-ink text-center lg:translate-x-[1.757vw]">
          <h2
            id="services-title"
            className="mx-auto max-w-[282px] text-[max(32px,3.0747vw)] leading-none font-medium lg:max-w-[64.08%]"
          >
            <RichText segments={servicesContent.title} />
          </h2>

          <div className="mx-auto mt-6 space-y-[1.21em] text-[max(18px,1.3177vw)] leading-[1.21] lg:mt-[1.1713vw] lg:max-w-[71.67%]">
            {servicesContent.paragraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
        </div>

        {/* `grid-cols-1` (minmax(0,1fr)) é obrigatório: sem ele a coluna
            implícita é `auto` e a largura percentual da colagem passa a se
            referenciar a si mesma, inflando a coluna. */}
        <div className="mt-[34px] grid grid-cols-1 gap-y-[25.75px] lg:mt-[5.6442vw] lg:grid-cols-[52.699%_1fr] lg:items-start lg:gap-x-[4.469%] lg:gap-y-0">
          {/* No mobile a colagem sangra 8px à esquerda e 18px à direita da
              viewport (386px de arte num frame de 360) — daí a largura maior
              que o container e a margem negativa. */}
          <ServicesCollage className="-ml-[8.819%] w-[120.694%] lg:ml-0 lg:w-full" />

          <div className="lg:pt-[1.1713vw]">
            <h3 className="text-ink text-[max(32px,3.0747vw)] leading-[1.21] font-medium">
              <RichText segments={servicesContent.pitch} />
            </h3>

            <ul className="mt-[max(31.496px,3.6603vw)] flex flex-col gap-[max(19px,2.196vw)]">
              {servicesContent.benefits.map((benefit) => (
                <li
                  key={benefit}
                  className="flex items-start gap-[max(14px,1.4641vw)]"
                >
                  <CheckBadgeIcon className="text-brand size-[max(21.741px,2.3426vw)] shrink-0" />
                  <span className="text-ink mt-px text-[max(16px,1.3177vw)] leading-[max(18.898px,2.196vw)] font-medium">
                    {benefit}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
