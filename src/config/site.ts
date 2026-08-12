/**
 * Configuração única do site. Tudo que é "identidade" da landing mora aqui
 * para não ficar espalhado entre componentes e metadata.
 */
export const siteConfig = {
  name: "Atual",
  title: "Atual — Antecipação de recebíveis para o seu negócio",
  description:
    "Transformamos sua venda a prazo em dinheiro à vista. Antecipe seus recebíveis, otimize o fluxo de caixa e eleve a performance dos seus recursos financeiros.",
  locale: "pt-BR",
  /**
   * Usado por `metadataBase` para resolver URLs absolutas de OG/canonical.
   * Defina NEXT_PUBLIC_SITE_URL no ambiente de produção.
   */
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
} as const;

/**
 * Dados de contato — transcritos do rodapé no Figma (nós 7:219, 7:222 e 7:225).
 * Usados no rodapé e no botão "Contato" do header.
 */
export const siteContact = {
  phone: {
    label: "(81) 9 8299-0066",
    href: "tel:+5581982990066",
  },
  email: {
    label: "financeiro@atualsecuritizadora.com.br",
    href: "mailto:financeiro@atualsecuritizadora.com.br",
  },
  address: "Rua padre carapuceiro 752 - Boa viagem - PE",
} as const;

/** Âncoras das seções da landing — fonte única para menu, CTAs e `id`s. */
export const sectionIds = {
  home: "inicio",
  services: "servicos",
  signup: "cadastro",
} as const;
