import {
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';

// Vamos usar o useState para armazenar o valor digitado pelo usuário no estado do componente.
import { useState } from 'react';

export default function HomeScreen() {
  // Criar o estado
  const [valor, setValor] = useState('');
  // Criar estado do resultado da conversão
  // Como estamos usando TypeScript, podemos definir o tipo do estado como number ou null, já que inicialmente não teremos um resultado.
  const [resultado, setResultado] = useState<number | null>(null);

  // Função de conversão que será chamada quando o usuário digitar um valor.
  const converter = () => {
    const valorNumerico = Number(valor);

    if (!valorNumerico) {
      return;
    }

    const cotacao = 5.30;
    const valorConvertido = valorNumerico * cotacao;

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