import Image from "next/image";

import { cn } from "@/lib/cn";

/**
 * Arte de fundo do hero — reprodução fiel do frame `bg-principal` (7:6).
 *
 * Toda a composição é posicionada em PORCENTAGEM do próprio palco, de modo que
 * ela escala junto com a viewport exatamente como no Figma (que traz o mesmo
 * layout desenhado em 1366px e 1920px, proporcionais entre si).
 *
 * Geometria do palco:
 *  · < lg  → preenche a seção (proporção de referência 360 × 600, frame 7:293)
 *  · ≥ lg  → 1366 × 1534 (frame 7:6). É mais alto que a seção de propósito:
 *            no design o degradê e o gráfico vazam para trás da seção seguinte.
 *
 * A arte é decorativa: `aria-hidden` no topo e `alt=""` nas imagens.
 */

/** Overlay azul + fade para branco aplicado sobre a foto (nós 7:8 e 7:294). */
const PHOTO_OVERLAY =
  "linear-gradient(180deg, rgba(27,68,157,0) 33.548%, rgb(255,255,255) 98.254%)," +
  "linear-gradient(90deg, rgba(27,68,157,0.8) 0%, rgba(27,68,157,0.8) 100%)";

/** Fade branco independente que cobre a metade inferior do palco (nó 7:9). */
const WHITE_FADE =
  "linear-gradient(180deg, rgba(255,255,255,0) 0%, rgb(255,255,255) 50.055%)";

type ChartLayer = { readonly src: string; readonly className: string };

/** Colunas em perspectiva do gráfico — nós 7:12…7:17 (desktop). */
const DESKTOP_COLUMNS: readonly ChartLayer[] = [
  {
    src: "/hero/desktop/chart-column-1.svg",
    className: "inset-[48.64%_77.28%_21.13%_3.51%]",
  },
  {
    src: "/hero/desktop/chart-column-2.svg",
    className: "inset-[48.63%_64.36%_21.13%_22.67%]",
  },
  {
    src: "/hero/desktop/chart-column-3.svg",
    className: "inset-[45.52%_54.85%_21.13%_35.64%]",
  },
  {
    src: "/hero/desktop/chart-column-4.svg",
    className: "inset-[44.47%_41.68%_21.12%_45.15%]",
  },
  {
    src: "/hero/desktop/chart-column-5.svg",
    className: "inset-[19.79%_24.71%_21.13%_58.32%]",
  },
  {
    src: "/hero/desktop/chart-column-6.svg",
    className: "inset-[11.6%_3.51%_21.13%_75.29%]",
  },
];

/** Mesmas colunas no frame mobile — nós 7:297…7:302. */
const MOBILE_COLUMNS: readonly ChartLayer[] = [
  {
    src: "/hero/mobile/chart-column-1.svg",
    className: "inset-[63.97%_75.78%_1.5%_5.97%]",
  },
  {
    src: "/hero/mobile/chart-column-2.svg",
    className: "inset-[63.96%_63.49%_1.5%_24.17%]",
  },
  {
    src: "/hero/mobile/chart-column-3.svg",
    className: "inset-[61.98%_54.45%_1.5%_36.51%]",
  },
  {
    src: "/hero/mobile/chart-column-4.svg",
    className: "inset-[61.3%_41.93%_1.5%_45.55%]",
  },
  {
    src: "/hero/mobile/chart-column-5.svg",
    className: "inset-[45.5%_25.8%_1.42%_58.07%]",
  },
  {
    src: "/hero/mobile/chart-column-6.svg",
    className: "inset-[40.25%_5.65%_1.5%_74.2%]",
  },
];

/**
 * Camada vetorial esticada (os SVGs são exportados com
 * `preserveAspectRatio="none"`, então `background-size: 100% 100%` reproduz
 * exatamente o comportamento do Figma).
 *
 * Como `background-image` de elementos com `display: none` não é baixado, cada
 * conjunto só chega ao dispositivo no breakpoint em que é usado.
 */
function VectorLayer({
  src,
  className,
  blend = false,
}: ChartLayer & { blend?: boolean }) {
  return (
    <div
      className={cn(
        "absolute bg-no-repeat",
        blend && "mix-blend-overlay",
        className,
      )}
      style={{ backgroundImage: `url("${src}")`, backgroundSize: "100% 100%" }}
    />
  );
}

export function HeroArtwork({ className }: { className?: string }) {
  return (
    <div
      aria-hidden
      className={cn(
        // `isolate` prende o mix-blend-mode das colunas ao palco: elas mesclam
        // com a foto, nunca com o resto da página. `overflow-hidden` reproduz
        // o clip do artboard — no Figma o recorte da mão passa 35px da borda
        // direita (604 + 797 > 1366) e é cortado ali.
        "absolute inset-0 isolate -z-10 overflow-hidden",
        "lg:bottom-auto lg:aspect-[1366/1534]",
        className,
      )}
    >
      {/* Foto de fundo + overlay azul (nós 7:8 / 7:294). */}
      <div className="absolute inset-x-0 top-0 h-full lg:h-[70.9257%]">
        <Image
          src="/hero/backdrop.jpg"
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover object-center lg:object-[50%_57.73%]"
        />
        <div
          className="absolute inset-0"
          style={{ backgroundImage: PHOTO_OVERLAY }}
        />
      </div>

      {/* Degradê branco que dissolve o hero na seção seguinte (nó 7:9). */}
      <div
        className="absolute inset-x-0 top-[21.3168%] hidden h-[78.6832%] lg:block"
        style={{ backgroundImage: WHITE_FADE }}
      />

      {/* Gráfico — colunas em perspectiva e linha com marcadores (nó 7:10). */}
      <div className="lg:hidden">
        {MOBILE_COLUMNS.map((column) => (
          <VectorLayer key={column.src} {...column} blend />
        ))}
        <VectorLayer
          src="/hero/mobile/chart-line.svg"
          className="inset-[40.17%_5.58%_24.26%_5.56%]"
        />
      </div>
      <div className="hidden lg:block">
        {DESKTOP_COLUMNS.map((column) => (
          <VectorLayer key={column.src} {...column} blend />
        ))}
        <VectorLayer
          src="/hero/desktop/chart-line.svg"
          className="inset-[11.47%_3.44%_32.99%_3.08%]"
        />
      </div>

      {/* Brilho ciano no canto superior esquerdo (nó 7:25) — só no desktop. */}
      <VectorLayer
        src="/hero/desktop/glow-ellipse.svg"
        className="inset-0 hidden lg:block"
      />

      {/* Mão com a borboleta (nós 7:28 / 7:310). O recorte externo e a folha
          interna têm dimensões próprias, preservadas como no Figma. */}
      <div
        className={cn(
          "absolute overflow-hidden",
          "top-[51.8333%] left-[12.5%] h-[43.8333%] w-[87.5%]",
          "lg:top-[12.5163%] lg:left-[44.2167%] lg:h-[43.5463%] lg:w-[58.3455%]",
        )}
      >
        <picture>
          <source
            media="(min-width: 64rem)"
            type="image/avif"
            srcSet="/hero/desktop/hand-butterfly.avif"
          />
          <source
            media="(min-width: 64rem)"
            type="image/webp"
            srcSet="/hero/desktop/hand-butterfly.webp"
          />
          <source
            media="(min-width: 64rem)"
            srcSet="/hero/desktop/hand-butterfly.png"
          />
          <source type="image/avif" srcSet="/hero/mobile/hand-butterfly.avif" />
          <source type="image/webp" srcSet="/hero/mobile/hand-butterfly.webp" />
          {/* Art direction: recortes diferentes por breakpoint, algo que
              `next/image` não cobre. O <picture> entrega AVIF/WebP com PNG de
              fallback e baixa apenas o arquivo do breakpoint ativo. */}
          <img
            src="/hero/mobile/hand-butterfly.png"
            alt=""
            width={666}
            height={375}
            decoding="async"
            className={cn(
              "absolute max-w-none -translate-x-1/2 -translate-y-1/2 object-cover",
              "top-[50.0696%] left-[54.3127%] h-[62.2126%] w-[96.291%] rotate-[-21.49deg] object-[100%_63.8%]",
              "lg:top-[47.9801%] lg:left-[55.5487%] lg:h-[56.8359%] lg:w-[93.5306%] lg:rotate-[-21.97deg] lg:object-center",
            )}
          />
        </picture>
      </div>
    </div>
  );
}
