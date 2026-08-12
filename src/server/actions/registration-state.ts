import type { RegistrationField } from "@/lib/validation/registration";

/**
 * Estado devolvido pela Server Action de cadastro.
 *
 * Vive fora de `registration.ts` porque um módulo `"use server"` só pode
 * exportar funções async — qualquer constante exportada de lá quebra o build
 * em tempo de execução.
 */
export type RegistrationState = {
  readonly status: "idle" | "success" | "error";
  readonly message?: string;
  readonly errors?: Partial<Record<RegistrationField, string>>;
};

export const initialRegistrationState: RegistrationState = { status: "idle" };
