import { sectionIds } from "@/config/site";

/**
 * Textos do hero — transcritos do Figma (nós 7:31, 7:32, 7:34).
 * Centralizados aqui para manter o componente livre de copy e facilitar
 * revisão editorial / futura internacionalização.
 */
export const heroContent = {
  title: "Transformamos sua venda a prazo em dinheiro à vista",
  lead: "É o investimento que você procurava para fazer o seu negócio girar com um dinheiro que já é seu!",
  cta: {
    label: "Cadastre-se agora",
    href: `#${sectionIds.signup}`,
  },
} as const;
