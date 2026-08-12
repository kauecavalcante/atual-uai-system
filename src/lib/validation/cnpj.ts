/**
 * Validação de CNPJ pelos dígitos verificadores (módulo 11).
 *
 * Checar o formato não basta: "11.111.111/1111-11" tem 14 dígitos e passaria
 * numa validação de máscara, mas não é um CNPJ. Isso roda no servidor, então
 * é a checagem que realmente vale.
 */

const BLOCKLIST = /^(\d)\1{13}$/;

/** Remove máscara, mantendo só dígitos. */
export function stripCnpj(value: string): string {
  return value.replace(/\D/g, "");
}

/** Formata 14 dígitos como 00.000.000/0000-00. */
export function formatCnpj(value: string): string {
  const digits = stripCnpj(value).slice(0, 14);
  return digits
    .replace(/^(\d{2})(\d)/, "$1.$2")
    .replace(/^(\d{2})\.(\d{3})(\d)/, "$1.$2.$3")
    .replace(/\.(\d{3})(\d)/, ".$1/$2")
    .replace(/(\d{4})(\d)/, "$1-$2");
}

function checkDigit(digits: string, length: number): number {
  let sum = 0;
  let weight = length - 7;

  for (let index = 0; index < length; index += 1) {
    sum += Number(digits[index]) * weight;
    weight -= 1;
    if (weight < 2) weight = 9;
  }

  const remainder = sum % 11;
  return remainder < 2 ? 0 : 11 - remainder;
}

export function isValidCnpj(value: string): boolean {
  const digits = stripCnpj(value);

  if (digits.length !== 14) return false;
  // Sequências repetidas passam no módulo 11 mas não são CNPJs válidos.
  if (BLOCKLIST.test(digits)) return false;

  return (
    checkDigit(digits, 12) === Number(digits[12]) &&
    checkDigit(digits, 13) === Number(digits[13])
  );
}
