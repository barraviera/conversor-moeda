// trim() remove espaços nas extremidades.
// replace(',', '.') troca a primeira vírgula por ponto.
// Number() converte o texto normalizado em número.
export function parseAmount(value: string): number {
  const normalizedValue = value.trim().replace(',', '.');

  return Number(normalizedValue);
}