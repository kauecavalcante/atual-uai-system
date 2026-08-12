import {
  ArrowUpIcon,
  MailIcon,
  MapPinIcon,
  PhoneCallIcon,
} from "@/components/icons";
import { sectionIds, siteContact } from "@/config/site";
import { footerContent } from "@/content/footer";

const CONTACT_ROWS = [
  { Icon: PhoneCallIcon, ...siteContact.phone },
  { Icon: MailIcon, ...siteContact.email },
  { Icon: MapPinIcon, label: siteContact.address, href: undefined },
] as const;

/**
 * Rodapé (Figma: `bg-footer` 7:122, `Frame 213` 7:213 e `footer` 7:205;
 * comps mobile 7:292, 7:458, 7:476 e 7:481).
 *
 * A faixa azul começa antes de a seção de cadastro terminar — no comp ela
 * abre em y=2544 enquanto o formulário só fecha em 2999. Daí a margem
 * negativa: 455px no desktop, 146px no mobile, medidos a partir da base do
 * formulário. Como as medidas internas do formulário são fixas, a margem
 * também é fixa; escalá-la com a viewport descolaria a faixa do card.
 *
 * `z-0` contra o `z-10` da seção de cadastro: o card do formulário precisa
 * passar por cima da faixa, não o contrário.
 */
export function SiteFooter() {
  return (
    <footer className="bg-brand relative z-0 -mt-[146px] text-white lg:-mt-[455px]">
      <div className="px-5 pt-[202px] pb-[30px] lg:px-[3.5139vw] lg:pt-[106px] lg:pb-[25px]">
        <div className="max-w-[320px] lg:max-w-[374px]">
          <h2 className="text-[32px] leading-none font-bold">
            {footerContent.heading}
          </h2>

          <address className="mt-6 flex flex-col gap-3 not-italic">
            {CONTACT_ROWS.map(({ Icon, label, href }) => {
              const content = (
                <>
                  <Icon className="size-[18px] shrink-0 lg:size-4" />
                  <span className="text-[16px] leading-[1.21]">{label}</span>
                </>
              );

              return href ? (
                <a
                  key={label}
                  href={href}
                  className="flex items-center gap-2 hover:underline lg:gap-3"
                >
                  {content}
                </a>
              ) : (
                <p key={label} className="flex items-center gap-2 lg:gap-3">
                  {content}
                </p>
              );
            })}
          </address>

          <ul className="mt-5 flex h-[30px] items-center gap-[18px] lg:mt-7">
            {footerContent.legalLinks.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  // 15px, não 16px: é o tamanho em que os dois links mais a
                  // calha de 18px fecham os 326.5px do bloco no comp (7:226).
                  className="text-[15px] leading-[30px] hover:underline"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Voltar ao topo: âncora, não botão — funciona sem JavaScript e o
            `scroll-behavior: smooth` global cuida da animação (já desligada
            em `prefers-reduced-motion`). */}
        <div className="mt-[33px] flex justify-end lg:mt-[153px]">
          <a
            href={`#${sectionIds.home}`}
            aria-label={footerContent.backToTopLabel}
            className="bg-accent text-brand grid size-10 place-items-center rounded-lg transition-[filter] hover:brightness-105"
          >
            <ArrowUpIcon className="size-5" />
          </a>
        </div>

        <div className="mt-5 flex h-[34px] items-center justify-between lg:mt-[22px] lg:h-[30px]">
          <p className="text-[14px] leading-[1.21]">
            {footerContent.copyright}
          </p>
        </div>
      </div>
    </footer>
  );
}
