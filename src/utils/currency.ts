// Função responsável somente pela matemática
import { currencies } from '@/constants/currencies';

// Recebe um valor, uma moeda de origem e uma moeda de destino.
export function convertCurrency(
  amount: number,
  from: string,
  to: string,
): number { // O retorno no final será um tipo number, que é o valor convertido.
  // Dentro da lista currencies.ts localizamos o moeda de origem pelo código informado. Ex.: "USD" ou "BRL".
  const fromCurrency = currencies.find(
    (currency) => currency.code === from,
  );
  // Dentro da lista currencies.ts localizamos o moeda de destino pelo código informado. Ex.: "USD" ou "BRL".
  const toCurrency = currencies.find(
    (currency) => currency.code === to,
  );
  // Se não encontrarmos a moeda de origem ou a moeda de destino, lançamos um erro.
  if (!fromCurrency || !toCurrency) {
    throw new Error('Moeda não encontrada.');
  }
  // Primeiro, convertemos o valor para BRL (Real brasileiro), que é a moeda base.
  const amountInBrl = amount * fromCurrency.rate;
  // Depois, convertemos o valor em BRL para a moeda de destino.
  // Ex.: Queremos USB para EUR. Primeiro convertemos USB para BRL, depois BRL para EUR.
  return amountInBrl / toCurrency.rate;
}