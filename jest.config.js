// O preset configura o ambiente de testes para Expo. 
// Já testMatch informa que arquivos com nomes como parseAmount.test.ts e formatCurrency.test.ts devem ser reconhecidos como testes.
module.exports = {
  preset: 'jest-expo',
  testMatch: ['**/?(*.)+(spec|test).[jt]s?(x)'],
};