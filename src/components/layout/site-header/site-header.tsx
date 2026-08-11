import Link from "next/link";

import { mainNav } from "@/config/navigation";
import { cn } from "@/lib/cn";

import { ContactLink } from "./contact-link";
import { Logo } from "./logo";
import { MobileMenu } from "./mobile-menu";

/**
 * Header do site — frame `header` (7:35) no desktop e a barra de topo do
 * `Home Mob` (logo 7:320 + gatilho 7:321) no mobile.
 *
 * No design o header se sobrepõe ao hero, então ele é `absolute` e transparente
 * (o hero já reserva a altura dele no próprio `padding-top`).
 *
 * A partir de `xl` (1280px) todas as medidas viram proporções de 1366px — a
 * mesma escala usada pelo hero, para header e arte permanecerem alinhados.
 * Abaixo disso o menu completo não cabe com tipografia legível, então entra o
 * drawer.
 */
export function SiteHeader() {
  return (
    <header className="absolute inset-x-0 top-0 z-40">
      <div
        className={cn(
          "flex items-center justify-between",
          "h-[97px] px-5",
          "xl:h-[9.3704vw] xl:px-[3.5139vw]",
        )}
      >
        <Logo priority />

        <nav
          aria-label="Principal"
          className="hidden items-center xl:flex xl:gap-[1.1713vw] xl:p-[0.5857vw]"
        >
          {mainNav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "relative flex items-center whitespace-nowrap text-white",
                // leading 1.1875 reproduz a caixa de 19px do Figma para 16px —
                // é o que mantém a altura do item em 35px e o sublinhado no
                // lugar certo.
                "p-[0.5857vw] text-[1.1713vw] leading-[1.1875]",
                "transition-opacity duration-200 hover:opacity-80",
                item.highlighted && "font-bold",
              )}
            >
              {item.label}
              {item.highlighted ? (
                // Sublinhado ciano de 3px com pontas arredondadas, recuado
                // 10px em cada lado da caixa do item (nós 7:46, 7:49, 7:52).
                <span
                  aria-hidden
                  className="bg-accent absolute inset-x-[0.7321vw] -bottom-[1.5px] h-[3px] rounded-full"
                />
              ) : null}
            </Link>
          ))}
        </nav>

        <ContactLink className="hidden xl:inline-flex" />
        <MobileMenu className="xl:hidden" />
      </div>
    </header>
  );
}
