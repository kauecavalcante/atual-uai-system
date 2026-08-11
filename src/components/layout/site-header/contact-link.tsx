import type { MouseEventHandler } from "react";
import Link from "next/link";

import { contactAction } from "@/config/navigation";
import { PhoneCallIcon } from "@/components/icons";
import { cn } from "@/lib/cn";

type ContactLinkProps = {
  className?: string;
  onClick?: MouseEventHandler<HTMLAnchorElement>;
};

/**
 * Botão "Contato" com contorno ciano — nós 7:54 (header) e 7:555 (drawer).
 * Padding do Figma: 32 + 8 na horizontal e 8 na vertical, ícone de 24px.
 */
export function ContactLink({ className, onClick }: ContactLinkProps) {
  return (
    <Link
      href={contactAction.href}
      onClick={onClick}
      className={cn(
        "border-accent inline-flex items-center gap-2 rounded-full border px-10 py-2 text-base leading-[1.1875] whitespace-nowrap text-white",
        "hover:bg-accent/10 transition-colors duration-200",
        "xl:gap-[0.5857vw] xl:px-[2.9283vw] xl:py-[0.5857vw] xl:text-[1.1713vw]",
        className,
      )}
    >
      <PhoneCallIcon className="size-6 shrink-0 xl:size-[1.757vw]" />
      {contactAction.label}
    </Link>
  );
}
