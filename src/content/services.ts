import type { RichSegment } from "@/components/ui/rich-text";

/**
 * Textos da seção de serviços — transcritos do Figma
 * (nós 7:65, 7:64, 7:68 e 7:75…7:95; comps mobile 7:317, 7:318 e 7:352).
 */
export const servicesContent = {
  title: [
    { text: "Antecipe", emphasis: "brand" },
    { text: " seus recebíveis, " },
    { text: "otimize", emphasis: "brand" },
    { text: " o fluxo de caixa e " },
    { text: "eleve a performance", emphasis: "brand" },
    { text: " dos seus recursos financeiros" },
  ] satisfies readonly RichSegment[],

  paragraphs: [
    "Com a antecipação de recebíveis, você adianta o recebimento de valores futuros, transformando vendas a prazo em recursos financeiros imediatos, gerando muito mais valor para a sua empresa.",
    "Dessa maneira você consegue manter o seu fluxo de caixa operante, reduzindo os riscos de inadimplência e melhorando a saúde financeira do seu negócio.",
  ],

  pitch: [
    { text: "Com a " },
    { text: "ATUAL", emphasis: "gradient" },
    { text: " a sua empresa pode ir muito mais longe! " },
    { text: "Invista agora", emphasis: "brand" },
    { text: " mesmo na " },
    { text: "antecipação", emphasis: "brand" },
    { text: " de recebíveis!" },
  ] satisfies readonly RichSegment[],

  benefits: [
    "Processo descomplicado e seguro",
    "Agilidade na concessão de crédito",
    "Rapidez no repasse dos recursos financeiros",
    "Transparência em todas as etapas",
    "Atendimento personalizado",
  ],

  /** Rótulos da UI fictícia da colagem — decorativos (nós 7:103, 7:104, 7:112). */
  collage: {
    incomeLabel: "Renda Total",
    incomeValue: "R$ 355.00",
    transferStatus: "Transferido com Sucesso!",
  },
} as const;
