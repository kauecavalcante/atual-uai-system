import { DownloadIcon } from "@/components/icons";
import { buttonVariants } from "@/components/ui/button";
import { RichText } from "@/components/ui/rich-text";
import { registrationContent } from "@/content/registration";
import { cn } from "@/lib/cn";

const { checklist } = registrationContent;

/**
 * Coluna "download-lista" (Figma: frame 7:128 no desktop, 7:383 no mobile).
 *
 * O aviso passa de 18px no mobile para 28px no desktop; o botão e a observação
 * mantêm o tamanho. Espaçamento de 24px entre os três blocos nos dois comps.
 */
export function DocumentChecklist({ className }: { className?: string }) {
  return (
    <div className={cn("text-ink", className)}>
      {/* 27px, não os 28px do comp: com as métricas reais da Inter, 28px
          quebra em 5 linhas onde o Figma mostra 4. A 27px/1.25 o bloco fecha
          nos mesmos 136px de altura e mantém a quebra desenhada. */}
      <p className="text-[max(18px,1.9766vw)] leading-[1.25]">
        <RichText segments={checklist.notice} />
      </p>

      {/* `<a download>` em vez de `next/link`: o destino é um arquivo, não uma
          rota — não há navegação de cliente para pré-carregar. */}
      <a
        href={checklist.downloadHref}
        download={checklist.downloadFileName}
        className={cn(
          buttonVariants({ variant: "primary", size: "checklist" }),
          "mt-6",
        )}
      >
        {checklist.downloadLabel}
        <DownloadIcon className="size-6 shrink-0" />
      </a>

      <p className="mt-6 text-[16px] leading-[1.21]">{checklist.note}</p>
    </div>
  );
}
