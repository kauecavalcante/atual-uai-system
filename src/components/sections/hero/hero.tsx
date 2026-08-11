import { sectionIds } from "@/config/site";
import { heroContent } from "@/content/hero";
import { ButtonLink } from "@/components/ui/button";

import { HeroArtwork } from "./hero-artwork";

/**
 * Seção 1 — Hero (Figma: frames 7:6 / 7:27 no desktop, 7:293 / 7:312 no mobile).
 *
 * O conteúdo fica em fluxo normal (nunca posicionado de forma absoluta) para
 * que o texto possa refluir, respeitar o zoom do navegador e continuar legível
 * com fontes maiores. O alinhamento com a arte é mantido por espaçamentos
 * proporcionais em `vw`, iguais aos do Figma nas larguras desenhadas.
 *
 * O padding-top reserva os 128px (desktop) / 97px (mobile) do header, que no
 * design se sobrepõe ao hero e será implementado na próxima etapa.
 */
export function Hero() {
  return (
    <section
      id={sectionIds.home}
      aria-labelledby="hero-title"
      className="relative isolate"
    >
      <HeroArtwork />

      <div
        className={[
          "flex flex-col items-start",
          // ≥ lg todas as medidas são proporcionais a 1366 (48 / 240 / 271px),
          // então a arte e o texto permanecem travados em qualquer largura.
          "px-5 lg:px-[3.5139vw]",
          "pt-[clamp(6.5rem,34.1667vw,12rem)] lg:pt-[17.5695vw]",
          "pb-[clamp(10rem,70.5556vw,24rem)] lg:pb-[19.8389vw]",
        ].join(" ")}
      >
        <h1
          id="hero-title"
          className="text-hero-title text-white lg:max-w-[55.2708vw] lg:text-[5.8565vw] lg:leading-[5.8565vw]"
        >
          {heroContent.title}
        </h1>

        <p className="text-hero-lead mt-[0.5625rem] text-white lg:mt-[1.2445vw] lg:max-w-[41.7277vw] lg:text-[1.757vw]">
          {heroContent.lead}
        </p>

        <ButtonLink
          href={heroContent.cta.href}
          className="mt-[1.1875rem] lg:mt-[2.3426vw]"
        >
          {heroContent.cta.label}
        </ButtonLink>
      </div>
    </section>
  );
}
