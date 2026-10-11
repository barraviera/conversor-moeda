// Definindo o formato da resposta.
// Aqui estamos declarando um tipo TypeScript.
// Ele descreve o formato esperado dos dados que receberemos da API.
type ExchangeRateResponse = {
  date: string;
  base: string;
  quote: string;
  rate: number;
};

// Definindo o formato do resultado da função getExchangeRate.
// Vamos usar para informar ao TypeScript que a função retorna um objeto com a cotação e a data da cotação.
export type ExchangeRateResult = {
  rate: number;
  date: string;
};

// Declarando a função assíncrona.
// export: permite que outros arquivos importem a função.
// async: permite utilizar await dentro da função e faz com que ela retorne uma Promise.
// getExchangeRate: nome da função.
// from: string: recebe o código da moeda de origem.
// to: string: recebe o código da moeda de destino.
// Promise<number>: indica que a função entregará, de forma assíncrona, um número.
// Ex. de uso: const cotacao = await getExchangeRate('USD', 'BRL');
// Por que precisamos de async e await?
// Porque uma requisição HTTP leva tempo. A aplicação não deve presumir que a resposta chegará imediatamente.
export async function getExchangeRate(
  from: string,
  to: string,
): Promise<ExchangeRateResult> { // Usamos ExchangeRateResult para indicar que a função retorna um objeto com rate e date.
  // Se to for diferente de BRL, lançamos um erro. Isso impede que a função seja usada para converter para outras moedas.
  if (to !== 'BRL') {
    throw new Error('A moeda de destino deve ser BRL.');
  }

  // Não precisamos consultar a API para converter uma moeda para ela mesma.
  if (from === to) {
    return {
      rate: 1,
      date: new Date().toISOString().slice(0, 10),
    };
  }

  // Fazendo a requisição HTTP para a API de câmbio.
  // O que é fetch?
  // É uma função disponível no ambiente JavaScript que permite realizar requisições HTTP. 
  // No React Native, ela pode ser utilizada para consumir APIs sem instalar uma biblioteca adicional.
  // As crases permitem criar uma template string, isto é, uma string que incorpora valores de variáveis usando ${...}.
  // Se from for 'USD' e to for 'BRL', a URL construída será: https://api.frankfurter.dev/v2/rate/usd/brl
  // O método toLowerCase() Transforma o texto em letras minúsculas. Por exemplo, 'USD' passa a ser 'usd'.
  // Fazemos isso para montar a URL no formato usado pelo endpoint escolhido.
  // O await fetch(...) 
  // O fetch inicia a requisição. O await espera a Promise da requisição ser resolvida e atribui o resultado à variável response.
  // Importante: response ainda não é a cotação. É um objeto que representa a resposta HTTP, contendo informações como o status da requisição e métodos para ler o corpo da resposta.
  const response = await fetch(
    `https://api.frankfurter.dev/v2/rate/${from.toLowerCase()}/${to.toLowerCase()}`,
  );

  // Se a resposta da requisição for 404, significa que não existe cotação para a moeda de origem e destino informadas. Lançamos um erro com uma mensagem explicativa.
  if (response.status === 404) {
    throw new Error(
      `Não existe cotação disponível para ${from} → ${to}.`,
    );
  }
  // Se a resposta da requisição não for 200, significa que houve algum problema com a API. Lançamos um erro com uma mensagem explicativa.
  if (!response.ok) {
    throw new Error(
      'O serviço de cotações está indisponível. Tente novamente.',
    );
  }

  // Transformando o JSON em objeto.
  // Agora vamos ler o corpo da resposta.
  // O método response.json() interpreta o corpo JSON e retorna uma Promise com os dados convertidos para estruturas JavaScript, como objetos e números.
  // O await espera essa leitura terminar.
  // ExchangeRateResponse indica ao TypeScript que queremos tratar data como o tipo ExchangeRateResponse.
  // Assim podemos escrever: data.rate e o TypeScript sabe que rate é um número.
  const data: ExchangeRateResponse = await response.json();
  // Validando o número retornado
  // Number.isFinite(data.rate): verifica se o valor é um número finito, excluindo valores como NaN e Infinity.
  // data.rate <= 0: verifica se a cotação é menor ou igual a zero.
  // O operador || significa “ou”. Portanto, se qualquer uma dessas condições for verdadeira, lançamos o erro.
  if (!Number.isFinite(data.rate) || data.rate <= 0) {
    throw new Error('A API retornou uma cotação inválida.');
  }
  // Ao inves de retornarmos somente a cotação, retornamos também a data da cotação. Isso é útil para exibir ao usuário quando a cotação foi obtida.
  return {
    rate: data.rate,
    date: data.date,
  };
}