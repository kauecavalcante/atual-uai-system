import Image from "next/image";
import Link from "next/link";

import { siteConfig, sectionIds } from "@/config/site";
import { cn } from "@/lib/cn";

type LogoProps = {
  className?: string;
  /** `true` apenas na instância do header, que está acima da dobra. */
  priority?: boolean;
};

/**
 * Logo da marca (nós 7:39 / 7:571) — 135×71 no desktop, 110×57 no mobile.
 * A altura é fixada e a largura acompanha, para o símbolo nunca distorcer.
 */
export function Logo({ className, priority = false }: LogoProps) {
  return (
    <Link
      href={`#${sectionIds.home}`}
      className={cn("inline-flex shrink-0 rounded-sm", className)}
    >
      <Image
        src="/brand/logo-atual.png"
        alt={siteConfig.name}
        width={480}
        height={257}
        priority={priority}
        className="h-[57px] w-auto xl:h-[5.1976vw]"
      />
    </Link>
  );
}
