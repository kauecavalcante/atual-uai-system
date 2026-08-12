import { sectionIds } from "@/config/site";

export type NavItem = {
  readonly label: string;
  readonly href: string;
  /**
   * No Figma (nós 7:45, 7:48 e 7:51) estes itens aparecem em negrito com um
   * sublinhado ciano — sinalizando os destinos externos do produto.
   */
  readonly highlighted?: boolean;
};

/**
 * Menu principal — mesma lista no header desktop (nó 7:40) e no drawer mobile
 * (nó 7:560), então vive num único lugar.
 *
 * `Assinatura de Documentos` e `Sistemas de Operações` apontam para portais que
 * ainda não têm URL definida no wireframe: troque os `href` abaixo pelos
 * endereços reais assim que forem informados.
 */
export const mainNav: readonly NavItem[] = [
  { label: "Home", href: `#${sectionIds.home}` },
  { label: "Serviços", href: `#${sectionIds.services}` },
  { label: "Cadastro", href: `#${sectionIds.signup}`, highlighted: true },
  {
    label: "Assinatura de Documentos",
    href: "#assinatura-de-documentos",
    highlighted: true,
  },
  {
    label: "Sistemas de Operações",
    href: "#sistemas-de-operacoes",
    highlighted: true,
  },
];

/** Botão "Contato" (nós 7:54 / 7:555) — leva ao formulário de cadastro. */
export const contactAction = {
  label: "Contato",
  href: `#${sectionIds.signup}`,
} as const;
