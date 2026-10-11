import {
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';

// Vamos usar o useState para armazenar o valor digitado pelo usuário no estado do componente.
import { useState } from 'react';

// Importando o componente CurrencySelector que criamos anteriormente.
import { CurrencySelector } from '@/components/CurrencySelector';
// Importando a função getExchangeRate que criamos no arquivo currencyApi.ts, que faz a chamada à API de câmbio.
import { getExchangeRate } from '@/services/currencyApi';
// Função para formatar o valor convertido em reais, que criamos no arquivo formatCurrency.ts.
import { formatCurrencyBRL } from '@/utils/formatCurrency';

// Importando a função parseAmount que criamos no arquivo parseAmount.ts, que normaliza o valor digitado pelo usuário e o converte em número.
import { parseAmount } from '@/utils/parseAmount';

export default function HomeScreen() {
  // Criar o estado
  const [valor, setValor] = useState('');
  // Criar estado do resultado da conversão
  // Como estamos usando TypeScript, podemos definir o tipo do estado como number ou null, já que inicialmente não teremos um resultado.
  const [resultado, setResultado] = useState<number | null>(null);

  // Criar estado da data da cotação
  const [dataCotacao, setDataCotacao] = useState<string | null>(null);

  // Estados da moeda selecionada
  const [moedaOrigem, setMoedaOrigem] = useState('USD');

  // Indica se a cotação está sendo buscada, para desabilitar o botão e mostrar "CONVERTENDO...".
  const [carregando, setCarregando] = useState(false);
  // Mensagem de erro exibida abaixo do botão; null quando não há erro.
  const [erro, setErro] = useState<string | null>(null);

  // Função de conversão que será chamada quando o usuário pressionar o botão "CONVERTER".
  const converter = async () => {
    // Usando a função parseAmount para normalizar o valor digitado pelo usuário e convertê-lo em número.
    const valorNumerico = parseAmount(valor);
    
    // Se o valor digitado for vazio ou não for um número válido, mostramos uma mensagem de erro e limpamos o resultado e a data da cotação.
    if (valor.trim() === '' || !Number.isFinite(valorNumerico)) {
      setErro('Digite um valor numérico válido.');
      setResultado(null);
      setDataCotacao(null);
      return;
    }
    // Se o valor digitado for menor ou igual a zero, mostramos uma mensagem de erro e limpamos o resultado e a data da cotação.
    if (valorNumerico <= 0) {
      setErro('Digite um valor maior que zero.');
      setResultado(null);
      setDataCotacao(null);
      return;
    }

    try {
      setCarregando(true);
      setErro(null);
      setResultado(null);
      setDataCotacao(null);

      // A api é chamada, passando a moeda de origem e a moeda de destino (BRL).
      const cotacao = await getExchangeRate(
        moedaOrigem,
        'BRL',
      );

      const valorConvertido = valorNumerico * cotacao.rate;

      setResultado(valorConvertido);
      setDataCotacao(cotacao.date);

    } catch (error) {
      // Se o erro for uma instância de Error, usamos a mensagem do erro. Caso contrário, mostramos uma mensagem genérica.
      if (error instanceof Error) {
        setErro(error.message);
        // Se o erro não for uma instância de Error, mostramos uma mensagem genérica.
      } else {
        setErro('Ocorreu um erro inesperado. Tente novamente.');
      }

    } finally {
      setCarregando(false);
    }
  };

  return (
    <View style={styles.container}>

      <Text style={styles.title}>Conversor de Moedas</Text>

      <Text style={styles.label}>Valor</Text>

      <TextInput
        style={styles.input}
        value={valor} // O valor visual do TextInput é controlado pelo estado valor.
        onChangeText={setValor} // Quando o usuário digitar algo, atualizamos o estado com o valor digitado.
        keyboardType="decimal-pad" // Oferece um teclado numérico com ponto decimal, adequado para digitar valores monetários.
        placeholder="Digite o valor"
      />

      <Text style={styles.label}>De</Text>

      {/*
        Usando o componente CurrencySelector para selecionar a moeda de origem.
        Quando o usuário selecionar uma moeda, iremos limpar o resultado
        e o erro, para que o usuário saiba que precisa clicar em
        "CONVERTER" novamente.
      */}
      <CurrencySelector
        currency={moedaOrigem}
        onChange={(currency) => {
          setMoedaOrigem(currency);

          // Limpar resultado, data da cotação e erro quando a moeda de origem mudar.
          setResultado(null);
          setDataCotacao(null);
          // Limpar o erro, caso exista, para que o usuário saiba que precisa clicar em "CONVERTER" novamente.
          setErro(null);
        }}
      />

      <Text style={styles.label}>Para</Text>

      <View style={styles.fixedCurrency}>
        <Text style={styles.fixedCurrencyText}>🇧🇷 BRL</Text>
      </View>

      <Pressable
        style={[
          styles.button,
          carregando && styles.buttonDisabled,
        ]}
        onPress={converter}
        disabled={carregando}
      >
        <Text style={styles.buttonText}>
          {carregando ? 'CONVERTENDO...' : 'CONVERTER'}
        </Text>
      </Pressable>

      {erro !== null && (
        <Text style={styles.error}>
          {erro}
        </Text>
      )}

      {resultado !== null && (
        <Text style={styles.result}>
          {formatCurrencyBRL(resultado)}
        </Text>
      )}

      {dataCotacao !== null && (
        <Text style={styles.quoteDate}>
          Cotação referente a: {dataCotacao}
        </Text>
      )}

      <Text>Valor digitado: {valor}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
  },

  title: {
    fontSize: 28,
    fontWeight: '700',
    marginBottom: 12,
  },

  label: {
    fontSize: 16,
    marginBottom: 8,
  },

  input: {
    width: '100%',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 18,
    marginBottom: 16,
  },

  button: {
    width: '100%',
    backgroundColor: '#2563eb',
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 24,
    marginBottom: 24,
  },

  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '700',
  },

  result: {
    alignItems: 'center',
    marginTop: 8,
  },

  resultLabel: {
    fontSize: 16,
    marginBottom: 4,
  },

  resultValue: {
    fontSize: 32,
    fontWeight: '700',
  },

  fixedCurrency: {
    width: '100%',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 14,
    backgroundColor: '#f3f4f6',
  },

  fixedCurrencyText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#4b5563',
  },

  buttonDisabled: {
    opacity: 0.6,
  },

  error: {
    color: '#dc2626',
    fontSize: 14,
    textAlign: 'center',
    marginBottom: 16,
  },

  quoteDate: {
    fontSize: 13,
    color: '#6b7280',
    textAlign: 'center',
    marginTop: 8,
  },

});