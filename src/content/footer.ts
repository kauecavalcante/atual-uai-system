/**
 * Textos do rodapé — transcritos do Figma (nós 7:215, 7:227, 7:228 e 7:210;
 * comps mobile 7:460, 7:472, 7:473 e 7:478).
 */
export const footerContent = {
  heading: "Saiba como entrar em contato conosco!",

  /**
   * Páginas legais. O wireframe traz só os rótulos — troque os `href` pelas
   * rotas reais quando as páginas existirem.
   */
  legalLinks: [
    { label: "Termos e Condições", href: "/termos-e-condicoes" },
    { label: "Política de Privacidade", href: "/politica-de-privacidade" },
  ],

  copyright: "© 2022 Atual. Todos os Direitos Reservados.",

  backToTopLabel: "Voltar ao topo da página",
} as const;
