import type { InputHTMLAttributes, ReactNode } from "react";

import { cn } from "@/lib/cn";

/**
 * Primitivos de formulário (Figma: nós 7:141…7:201 / 7:396…7:454).
 *
 * Medidas do comp: rótulo 16px com 8px até o campo, campo de 43px de altura,
 * texto de 14px, recuo interno de 8px no mobile e 16px no desktop. Diferente
 * do resto da página, estas medidas não escalam com a largura da viewport:
 * controle de formulário grande demais atrapalha em vez de ajudar.
 *
 * O wireframe desenha o primeiro par de campos com 41px e os demais com 43px.
 * Aqui todos usam 43px — altura desigual entre campos seria defeito, não
 * decisão de design.
 */

const CONTROL_BASE = [
  "h-[43px] w-full rounded-lg bg-white text-[14px] text-ink",
  "border border-transparent",
  "placeholder:text-muted",
  "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand",
  "aria-[invalid=true]:border-danger",
  "disabled:cursor-not-allowed disabled:opacity-60",
];

type FieldProps = {
  readonly id: string;
  readonly label: string;
  readonly required?: boolean;
  readonly error?: string;
  readonly className?: string;
  readonly children: ReactNode;
};

export function Field({
  id,
  label,
  required,
  error,
  className,
  children,
}: FieldProps) {
  return (
    <div className={cn("flex flex-col", className)}>
      <label
        htmlFor={id}
        className="text-brand mb-2 text-[16px] leading-[1.1875] font-medium"
      >
        {label}
        {/* O asterisco é redundante para leitores de tela: o `required` do
            input já anuncia a obrigatoriedade. */}
        {required ? <span aria-hidden> *</span> : null}
      </label>

      {children}

      {error ? (
        <p
          id={`${id}-error`}
          className="text-danger mt-1.5 text-[13px] leading-[1.3] font-medium"
        >
          {error}
        </p>
      ) : null}
    </div>
  );
}

export type TextInputProps = InputHTMLAttributes<HTMLInputElement> & {
  readonly invalid?: boolean;
};

export function TextInput({ className, invalid, ...props }: TextInputProps) {
  return (
    <input
      aria-invalid={invalid || undefined}
      className={cn(CONTROL_BASE, "px-2 lg:px-4", className)}
      {...props}
    />
  );
}

export type FileInputProps = InputHTMLAttributes<HTMLInputElement> & {
  readonly invalid?: boolean;
};

/**
 * Input de arquivo nativo com o botão estilizado via `::file-selector-button`.
 *
 * O texto do botão e o "nenhum arquivo escolhido" vêm do navegador, no idioma
 * dele — é exatamente o que o wireframe retrata. Trocar por um controle
 * customizado só traria de volta, com mais código, o teclado e o leitor de
 * tela que o nativo já entrega.
 */
export function FileInput({ className, invalid, ...props }: FileInputProps) {
  return (
    <input
      type="file"
      aria-invalid={invalid || undefined}
      className={cn(
        CONTROL_BASE,
        "cursor-pointer px-2 py-[9px] lg:px-3",
        "file:text-brand file:bg-brand/10 file:mr-2 file:cursor-pointer",
        "file:h-[25px] file:rounded file:border-0 file:px-2",
        "file:text-[14px] file:leading-[25px] file:font-medium",
        "hover:file:bg-brand/15",
        className,
      )}
      {...props}
    />
  );
}
