import { cn } from "@/lib/cn";

/**
 * Trecho de um texto com destaque. No Figma o corpo é medium/#161c28 e os
 * destaques são bold/#1b449d — exceto "ATUAL", que usa um degradê vertical
 * do azul da marca para o ciano (nós 7:65, 7:68, 7:317 e 7:352).
 */
export type RichSegment = {
  readonly text: string;
  readonly emphasis?: "brand" | "gradient";
};

/**
 * Renderiza títulos com destaques sem recorrer a `dangerouslySetInnerHTML`:
 * o conteúdo continua sendo dado estruturado, e a ênfase vira `<strong>`,
 * que é o que ela significa também para leitores de tela.
 */
export function RichText({ segments }: { segments: readonly RichSegment[] }) {
  return (
    <>
      {segments.map((segment, index) =>
        segment.emphasis ? (
          <strong
            key={`${index}-${segment.text}`}
            className={cn(
              "font-bold",
              segment.emphasis === "gradient"
                ? "from-brand to-accent bg-gradient-to-b bg-clip-text text-transparent"
                : "text-brand",
            )}
          >
            {segment.text}
          </strong>
        ) : (
          <span key={`${index}-${segment.text}`}>{segment.text}</span>
        ),
      )}
    </>
  );
}
