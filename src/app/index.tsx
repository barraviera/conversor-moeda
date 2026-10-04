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
// Função matemática que faz a conversão de moedas, que criamos no arquivo currency.ts.
import { convertCurrency } from '@/utils/currency';

export default function HomeScreen() {
  // Criar o estado
  const [valor, setValor] = useState('');
  // Criar estado do resultado da conversão
  // Como estamos usando TypeScript, podemos definir o tipo do estado como number ou null, já que inicialmente não teremos um resultado.
  const [resultado, setResultado] = useState<number | null>(null);

  // Estados da moeda selecionada
  const [moedaOrigem, setMoedaOrigem] = useState('USD');
  const [moedaDestino, setMoedaDestino] = useState('BRL');

  // Função de conversão que será chamada quando o usuário digitar um valor.
  const converter = () => {
    const valorNumerico = Number(valor);

    if (!valorNumerico) {
      return;
    }
    // Chamando a função convertCurrency que criamos no arquivo currency.ts, passando o valor digitado, a moeda de origem e a moeda de destino.
    const valorConvertido = convertCurrency(
      valorNumerico,
      moedaOrigem,
      moedaDestino,
    );
    // Atualizando o estado do resultado com o valor convertido.
    setResultado(valorConvertido);
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

      // Usando o componente CurrencySelector para selecionar a moeda de origem.
      <CurrencySelector
        currency={moedaOrigem}
        onChange={setMoedaOrigem}
      />

      <Text style={styles.label}>Para</Text>

      // Usando o componente CurrencySelector para selecionar a moeda de destino.
      <CurrencySelector
        currency={moedaDestino}
        onChange={setMoedaDestino}
      />

      <Pressable style={styles.button} onPress={converter}>
        <Text style={styles.buttonText}>CONVERTER</Text>
      </Pressable>

      {resultado !== null && (
        <View style={styles.result}>
          <Text style={styles.resultLabel}>Resultado</Text>

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

});