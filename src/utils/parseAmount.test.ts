// describe() agrupa testes relacionados à função parseAmount.
// it() descreve um comportamento que esperamos.
// expect() recebe o valor que queremos verificar.
// toBe() compara o resultado com o valor esperado.
// Number.isNaN() verifica se o resultado é NaN, o valor numérico especial que representa um resultado inválido.

import { parseAmount } from './parseAmount';

describe('parseAmount', () => {
  it('converte um número inteiro', () => {
    expect(parseAmount('100')).toBe(100);
  });

  it('converte um decimal com ponto', () => {
    expect(parseAmount('10.50')).toBe(10.5);
  });

  it('converte um decimal com vírgula', () => {
    expect(parseAmount('10,50')).toBe(10.5);
  });

  it('remove espaços nas extremidades', () => {
    expect(parseAmount('  25,50  ')).toBe(25.5);
  });

  it('retorna zero para uma entrada vazia', () => {
    expect(parseAmount('')).toBe(0);
  });

  it('retorna NaN para texto inválido', () => {
    expect(Number.isNaN(parseAmount('abc'))).toBe(true);
  });
});