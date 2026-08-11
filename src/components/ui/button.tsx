import type { AnchorHTMLAttributes, ButtonHTMLAttributes } from "react";
import Link from "next/link";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/cn";

/**
 * Variantes do botão. Medidas do CTA vêm do Figma (nó 7:33 / 7:315):
 * padding 12.715×8.477 (360) → 30×20 (1366), raio pill, sombra 0 4px 2px.
 */
export const buttonVariants = cva(
  [
    "inline-flex items-center justify-center rounded-full whitespace-nowrap uppercase",
    "transition-[filter,transform,box-shadow] duration-200 ease-out",
    "motion-safe:hover:-translate-y-px motion-safe:active:translate-y-0",
    "focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white",
    "aria-disabled:pointer-events-none aria-disabled:opacity-60",
    "disabled:pointer-events-none disabled:opacity-60",
  ],
  {
    variants: {
      variant: {
        primary: [
          "bg-accent text-brand",
          "shadow-[0_2px_1px_0_rgba(27,68,157,0.25)] lg:shadow-[0_4px_2px_0_rgba(27,68,157,0.25)]",
          "hover:brightness-105",
        ],
      },
      size: {
        // ≥ lg as medidas viram proporções puras de 1366 (18 / 30 / 20px),
        // acompanhando a escala da arte do hero.
        hero: [
          "text-cta",
          "px-[clamp(0.7947rem,0.4081rem+1.7182vw,1.875rem)]",
          "py-[clamp(0.5298rem,0.2721rem+1.1454vw,1.25rem)]",
          "lg:px-[2.1962vw] lg:py-[1.4641vw] lg:text-[1.3177vw]",
        ],
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "hero",
    },
  },
);

type ButtonVariants = VariantProps<typeof buttonVariants>;

export type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> &
  ButtonVariants;

export function Button({ className, variant, size, ...props }: ButtonProps) {
  return (
    <button
      className={cn(buttonVariants({ variant, size }), className)}
      {...props}
    />
  );
}

export type ButtonLinkProps = AnchorHTMLAttributes<HTMLAnchorElement> &
  ButtonVariants & { href: string };

/**
 * Mesmo visual do `Button`, porém semanticamente um link — o CTA do hero
 * navega para a seção de cadastro, então precisa ser um `<a>`.
 */
export function ButtonLink({
  className,
  variant,
  size,
  href,
  ...props
}: ButtonLinkProps) {
  const isExternal = /^https?:\/\//.test(href);

  return (
    <Link
      href={href}
      className={cn(buttonVariants({ variant, size }), className)}
      // Links externos nunca dão acesso a `window.opener` do nosso lado.
      {...(isExternal
        ? { target: "_blank", rel: "noopener noreferrer" }
        : null)}
      {...props}
    />
  );
}
