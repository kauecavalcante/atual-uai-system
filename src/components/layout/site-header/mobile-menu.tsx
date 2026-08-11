"use client";

import { useCallback, useEffect, useId, useRef, useState } from "react";
import Link from "next/link";

import { mainNav } from "@/config/navigation";
import { CloseIcon, MenuIcon } from "@/components/icons";

import { ContactLink } from "./contact-link";
import { Logo } from "./logo";

/**
 * Menu mobile — gatilho (nó 7:321) + drawer lateral (frame "Menu Mob" 7:553).
 *
 * Usa o elemento nativo `<dialog>` em modo modal: com ele o navegador entrega
 * de graça o aprisionamento de foco, o fechamento por Escape e a inércia do
 * conteúdo atrás. A animação de entrada/saída vive em `globals.css`
 * (`.site-drawer`) e é desligada em `prefers-reduced-motion`.
 */
export function MobileMenu({ className }: { className?: string }) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [isOpen, setIsOpen] = useState(false);
  const dialogId = useId();

  const open = useCallback(() => {
    dialogRef.current?.showModal();
    setIsOpen(true);
  }, []);

  const close = useCallback(() => {
    dialogRef.current?.close();
    setIsOpen(false);
  }, []);

  // Fechamentos que não passam pelo `close()` acima chegam por aqui: `cancel`
  // dispara de imediato no Escape, `close` cobre qualquer outro caminho nativo
  // (o evento é enfileirado, por isso não dá para depender só dele).
  // `setIsOpen(false)` é idempotente, então os três caminhos convivem.
  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    const handleDismiss = () => setIsOpen(false);
    dialog.addEventListener("cancel", handleDismiss);
    dialog.addEventListener("close", handleDismiss);
    return () => {
      dialog.removeEventListener("cancel", handleDismiss);
      dialog.removeEventListener("close", handleDismiss);
    };
  }, []);

  // Impede o scroll do fundo enquanto o drawer está aberto.
  useEffect(() => {
    if (!isOpen) return;

    const { body } = document;
    const previous = body.style.overflow;
    body.style.overflow = "hidden";
    return () => {
      body.style.overflow = previous;
    };
  }, [isOpen]);

  /** Cliques no ::backdrop chegam no próprio <dialog>, fora da sua caixa. */
  const handleDialogClick = (event: React.MouseEvent<HTMLDialogElement>) => {
    const dialog = dialogRef.current;
    if (!dialog || event.target !== dialog) return;

    const { top, right, bottom, left } = dialog.getBoundingClientRect();
    const isInside =
      event.clientX >= left &&
      event.clientX <= right &&
      event.clientY >= top &&
      event.clientY <= bottom;

    if (!isInside) close();
  };

  return (
    <div className={className}>
      <button
        type="button"
        onClick={open}
        aria-label="Abrir menu"
        aria-haspopup="dialog"
        aria-expanded={isOpen}
        aria-controls={dialogId}
        className="text-accent -mr-2 grid size-11 place-items-center rounded-full"
      >
        <MenuIcon className="size-6" />
      </button>

      <dialog
        id={dialogId}
        ref={dialogRef}
        onClick={handleDialogClick}
        aria-label="Menu principal"
        className="site-drawer bg-brand w-[278px] max-w-[85vw] text-white"
      >
        <div className="flex h-full flex-col px-[30px] pt-[27px]">
          <Logo className="self-start" />

          <button
            type="button"
            onClick={close}
            aria-label="Fechar menu"
            className="text-accent absolute top-[5px] right-2 grid size-11 place-items-center rounded-full"
          >
            <CloseIcon className="h-[14px] w-auto" />
          </button>

          <nav aria-label="Principal" className="mt-[35px]">
            <ul>
              {mainNav.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    onClick={close}
                    className="hover:text-accent flex w-[226px] items-center py-2 text-base leading-[1.1875] transition-colors duration-200"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <ContactLink
            onClick={close}
            className="mt-6 w-[226px] justify-center"
          />
        </div>
      </dialog>
    </div>
  );
}
