// Usamos async/await para lidar com a chamada assíncrona à API de câmbio.
export async function getExchangeRate(
  from: string,
  to: string,
): Promise<number> {
  // Temporariamente usando uma taxa fixa.
  // Depois substituiremos pela API real.

  const rates: Record<string, number> = {
    USD: 5.30,
    EUR: 6.20,
    GBP: 7.10,
  };

  if (to !== 'BRL') {
    throw new Error('A moeda de destino deve ser BRL.');
  }

  const rate = rates[from];

  if (!rate) {
    throw new Error(`Cotação não encontrada para ${from}.`);
  }

  return rate;
}