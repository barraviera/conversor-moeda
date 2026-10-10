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

export default function HomeScreen() {
  // Criar o estado
  const [valor, setValor] = useState('');
  // Criar estado do resultado da conversão
  // Como estamos usando TypeScript, podemos definir o tipo do estado como number ou null, já que inicialmente não teremos um resultado.
  const [resultado, setResultado] = useState<number | null>(null);

  // Estados da moeda selecionada
  const [moedaOrigem, setMoedaOrigem] = useState('USD');

  // Indica se a cotação está sendo buscada, para desabilitar o botão e mostrar "CONVERTENDO...".
  const [carregando, setCarregando] = useState(false);
  // Mensagem de erro exibida abaixo do botão; null quando não há erro.
  const [erro, setErro] = useState<string | null>(null);

  // Função de conversão que será chamada quando o usuário pressionar o botão "CONVERTER".
  const converter = async () => {
    // Valor recebido do TextInput.
    const valorNumerico = Number(valor);
    // Se o valor digitado não for um número válido (ou for zero), mostramos uma mensagem de erro.
    if (!valorNumerico) {
      setErro('Digite um valor válido.');
      return;
    }

    try {
      setCarregando(true);
      setErro(null);
      setResultado(null);
      // A api é chamada, passando a moeda de origem e a moeda de destino (BRL).
      const cotacao = await getExchangeRate(
        moedaOrigem,
        'BRL',
      );

      const valorConvertido = valorNumerico * cotacao;

      setResultado(valorConvertido);
    } catch (error) {
      setErro('Não foi possível obter a cotação.');
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
        keyboardType="numeric"
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
          setResultado(null);
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
        <View style={styles.result}>
          <Text style={styles.resultLabel}>
            Resultado
          </Text>

          <Text style={styles.resultValue}>
            R$ {resultado.toFixed(2)}
          </Text>
        </View>
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

});