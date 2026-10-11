// export function: permite reutilizar a função em outros arquivos.
// value: number: recebe o valor numérico que queremos formatar.
// Intl.NumberFormat: é uma funcionalidade nativa do JavaScript para formatar números de acordo com uma localidade.
// 'pt-BR': define as convenções brasileiras, como vírgula para separar os centavos.
// style: 'currency': informa que queremos formatar como moeda.
// currency: 'BRL': especifica o real brasileiro.
// .format(value): devolve o número formatado como texto.
// Ex.: de uso formatCurrencyBRL(1234.5);
export function formatCurrencyBRL(value: number): string {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(value);
}