"use client";

import { useActionState, useEffect, useId, useRef } from "react";

import { Button } from "@/components/ui/button";
import { Field, FileInput, TextInput } from "@/components/ui/field";
import { registrationContent } from "@/content/registration";
import { cn } from "@/lib/cn";
import {
  ACCEPTED_FILE_EXTENSIONS,
  HONEYPOT_FIELD,
} from "@/lib/validation/registration";
import { submitRegistration } from "@/server/actions/registration";
import { initialRegistrationState } from "@/server/actions/registration-state";

const { form } = registrationContent;

/**
 * Formulário de cadastro (Figma: frame 7:140 no desktop, 7:395 no mobile).
 *
 * Duas colunas no desktop com 24px de calha e 37px entre linhas; uma coluna
 * com 24px no mobile. Alguns campos ocupam a linha inteira nos dois casos.
 *
 * Funciona sem JavaScript: `action` recebe a Server Action, então o envio é um
 * POST de formulário comum. Com JS, `useActionState` devolve os erros por
 * campo sem recarregar a página.
 */
export function RegistrationForm({ className }: { className?: string }) {
  const [state, formAction, isPending] = useActionState(
    submitRegistration,
    initialRegistrationState,
  );
  const prefix = useId();
  const formRef = useRef<HTMLFormElement>(null);
  const statusRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    if (state.status === "idle") return;
    // Leva o foco ao resultado: sem isso, quem navega por teclado ou leitor
    // de tela não descobre que o envio terminou.
    statusRef.current?.focus();
    if (state.status === "success") formRef.current?.reset();
  }, [state]);

  return (
    <form
      ref={formRef}
      action={formAction}
      encType="multipart/form-data"
      aria-busy={isPending}
      className={cn(
        "bg-accent grid grid-cols-1 gap-x-6 gap-y-6",
        "rounded-[20px] px-5 py-10 lg:grid-cols-2 lg:gap-y-[37px] lg:px-10 lg:py-20",
        className,
      )}
    >
      {/* Armadilha para robôs: invisível e fora da ordem de tabulação, mas
          enviada junto. Só um preenchedor automático escreve aqui. */}
      <div className="hidden" aria-hidden>
        <label htmlFor={`${prefix}-${HONEYPOT_FIELD}`}>Não preencher</label>
        <input
          id={`${prefix}-${HONEYPOT_FIELD}`}
          name={HONEYPOT_FIELD}
          type="text"
          tabIndex={-1}
          autoComplete="off"
        />
      </div>

      {form.textFields.map((field) => {
        const id = `${prefix}-${field.name}`;
        const error = state.errors?.[field.name];

        return (
          <Field
            key={field.name}
            id={id}
            label={field.label}
            required
            error={error}
            className={field.fullWidth ? "lg:col-span-2" : undefined}
          >
            <TextInput
              id={id}
              name={field.name}
              type={field.type}
              placeholder={field.placeholder}
              autoComplete={field.autoComplete}
              inputMode={field.inputMode}
              required
              invalid={Boolean(error)}
              aria-describedby={error ? `${id}-error` : undefined}
            />
          </Field>
        );
      })}

      <h3 className="text-brand text-[18px] leading-[1.21] font-bold lg:col-span-2">
        {form.documentsHeading}
      </h3>

      {form.fileFields.map((field) => {
        const id = `${prefix}-${field.name}`;
        const error = state.errors?.[field.name];

        return (
          <Field
            key={field.name}
            id={id}
            label={field.label}
            error={error}
            className={field.fullWidth ? "lg:col-span-2" : undefined}
          >
            <FileInput
              id={id}
              name={field.name}
              accept={ACCEPTED_FILE_EXTENSIONS}
              invalid={Boolean(error)}
              aria-describedby={error ? `${id}-error` : undefined}
            />
          </Field>
        );
      })}

      <div className="lg:col-span-2">
        {state.status !== "idle" && state.message ? (
          <p
            ref={statusRef}
            tabIndex={-1}
            role={state.status === "error" ? "alert" : "status"}
            className={cn(
              "mb-4 rounded-lg px-4 py-3 text-[15px] leading-[1.35] font-medium",
              state.status === "error"
                ? "text-danger bg-white"
                : "text-brand bg-white",
            )}
          >
            {state.message}
          </p>
        ) : null}

        <Button
          type="submit"
          variant="solid"
          size="form"
          disabled={isPending}
          className="w-full"
        >
          {isPending ? "Enviando…" : form.submitLabel}
        </Button>
      </div>
    </form>
  );
}
