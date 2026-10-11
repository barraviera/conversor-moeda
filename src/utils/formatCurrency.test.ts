// 1234.5 verifica os separadores brasileiros: ponto para milhares e vírgula para decimais.
// 100 verifica se a função acrescenta as duas casas decimais.
// 0 verifica um caso de limite.
// Usamos toContain() em vez de comparar a string inteira porque alguns ambientes podem representar o espaço entre R$ e o valor de maneiras diferentes.

import { formatCurrencyBRL } from './formatCurrency';

describe('formatCurrencyBRL', () => {
  it('formata um valor com separadores brasileiros', () => {
    const resultado = formatCurrencyBRL(1234.5);

    expect(resultado).toContain('R$');
    expect(resultado).toContain('1.234,50');
  });

  it('formata um valor inteiro com duas casas decimais', () => {
    const resultado = formatCurrencyBRL(100);

    expect(resultado).toContain('100,00');
  });

  it('formata o valor zero', () => {
    const resultado = formatCurrencyBRL(0);

    expect(resultado).toContain('0,00');
  });
});