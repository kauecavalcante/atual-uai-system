import type { CSSProperties } from "react";
import Image from "next/image";

import { servicesContent } from "@/content/services";
import { BarChartIcon, CheckCircleIcon } from "@/components/icons";
import { cn } from "@/lib/cn";

/**
 * Colagem da seção de serviços (nós 7:97…7:121 no desktop, 7:325 no mobile).
 *
 * As duas versões do Figma compartilham exatamente os mesmos valores de
 * `top` e `height` em porcentagem — só a distribuição horizontal muda. Por
 * isso o componente é único: vertical em porcentagem, horizontal com variante
 * em `lg`.
 *
 * O "miolo" (raios, paddings, ícones) é medido em `--u`, que vale 1px do comp
 * desktop e encolhe junto com o palco por ser derivado de `cqh`. Na largura
 * mobile ele resulta em 0.71px — a mesma razão de escala que o Figma aplicou.
 * Os textos usam `max(mobile, --u × desktop)` porque foram ajustados à mão
 * para continuarem legíveis no mobile.
 *
 * Tudo aqui é ilustração: `aria-hidden` na raiz, inclusive nos rótulos da UI
 * fictícia — "R$ 355.00" lido em voz alta seria informação falsa.
 */

const CARD_SHADOW =
  "shadow-[0_calc(var(--u)*4)_calc(var(--u)*9)_rgba(0,0,0,0.05)]";

export function ServicesCollage({ className }: { className?: string }) {
  const { collage } = servicesContent;

  return (
    <div
      aria-hidden
      style={{ "--u": "calc(100cqh / 612.05)" } as CSSProperties}
      className={cn(
        "[container-type:size] relative",
        "aspect-[386.22/434.53] lg:aspect-[625/612.05]",
        className,
      )}
    >
      {/* Foto dos prédios — espelhada, com o canto grande no topo à esquerda. */}
      <div
        className={cn(
          "absolute top-[6.045%] h-[86.43%] overflow-hidden",
          "left-[7.35%] w-[82.72%] lg:left-[16.96%] lg:w-[72%]",
          "rounded-tl-[calc(var(--u)*80)] rounded-tr-[calc(var(--u)*20)] rounded-b-[calc(var(--u)*20)]",
        )}
      >
        <Image
          src="/services/buildings.jpg"
          alt=""
          fill
          sizes="(min-width: 1024px) 34vw, 75vw"
          className="-scale-x-100 object-cover object-bottom"
        />
      </div>

      {/* Card "Renda Total" (nós 7:101…7:105). */}
      <div
        className={cn(
          // A altura vem do conteúdo (no desktop dá os 70px do Figma). Fixá-la
          // em 11.44% estouraria no mobile, onde os textos foram aumentados à
          // mão e não acompanham a escala geométrica.
          "absolute top-[31.37%] flex items-end justify-between bg-white",
          "left-[64.92%] w-[25.37%] lg:left-[77.92%] lg:w-[22.08%]",
          "px-[calc(var(--u)*13)] py-[calc(var(--u)*18)]",
          "rounded-l-[calc(var(--u)*10)] lg:rounded-[calc(var(--u)*10)]",
          CARD_SHADOW,
        )}
      >
        <span className="flex min-w-0 flex-col whitespace-nowrap">
          <span className="text-muted text-[max(10px,calc(var(--u)*12))] leading-[1.21]">
            {collage.incomeLabel}
          </span>
          <span className="text-ink text-[max(14px,calc(var(--u)*16))] leading-[1.21] font-medium">
            {collage.incomeValue}
          </span>
        </span>
        <BarChartIcon className="text-accent size-[calc(var(--u)*20)] shrink-0" />
      </div>

      {/* Argola dourada (nó 7:120). */}
      <div className="absolute top-[49.34%] left-0 h-[9.15%] w-[11.58%] lg:left-[10.56%] lg:w-[10.08%]">
        <Image
          src="/services/ring.png"
          alt=""
          fill
          sizes="(min-width: 1024px) 5vw, 12vw"
          className="object-contain"
        />
      </div>

      {/* Card "Transferido com Sucesso!" (nós 7:110…7:113). */}
      <div
        className={cn(
          "absolute top-[67.97%] flex h-[11.11%] items-center bg-white",
          "left-[7.31%] w-[57.74%] lg:left-0 lg:w-[48.32%]",
          "gap-[calc(var(--u)*15)] px-[calc(var(--u)*25)]",
          "rounded-r-[calc(var(--u)*10)] lg:rounded-[calc(var(--u)*10)]",
          CARD_SHADOW,
        )}
      >
        <CheckCircleIcon className="text-accent size-[calc(var(--u)*24)] shrink-0" />
        <span className="text-ink truncate text-[max(14px,calc(var(--u)*18))] leading-[1.21] tracking-[-0.03em]">
          {collage.transferStatus}
        </span>
      </div>

      {/* Card com o símbolo da marca (nós 7:117 / 7:118). */}
      <div
        className={cn(
          "absolute top-[81.86%] h-[18.14%] bg-white",
          "left-[66.16%] w-[23.96%] lg:left-[78.56%] lg:w-[20.85%]",
          "p-[calc(var(--u)*30)]",
          "rounded-[calc(var(--u)*10)] rounded-br-[calc(var(--u)*40)]",
          "shadow-[0_calc(var(--u)*4)_calc(var(--u)*4.5)_rgba(0,0,0,0.05)]",
        )}
      >
        <div className="relative size-full">
          <Image
            src="/services/logo-mark.png"
            alt=""
            fill
            sizes="(min-width: 1024px) 7vw, 15vw"
            className="object-contain"
          />
        </div>
      </div>

      {/* Moeda sobre o canto superior direito da foto (nó 7:121). */}
      <div className="absolute top-0 left-[76.29%] h-[18.95%] w-[23.71%] lg:left-[76.96%] lg:w-[20.64%]">
        <Image
          src="/services/coin.png"
          alt=""
          fill
          sizes="(min-width: 1024px) 10vw, 22vw"
          className="object-contain"
        />
      </div>
    </div>
  );
}
