// Aqui estamos criando um componente chamado CurrencySelector que permite ao usuário selecionar uma moeda de uma lista. 
// O componente recebe duas props: currency, que é a moeda atualmente selecionada, e onChange, que é uma função chamada quando o usuário seleciona uma nova moeda.
import { useState } from 'react';
import {
    FlatList,
    Modal,
    Pressable,
    StyleSheet,
    Text,
    View,
} from 'react-native';

import { currencies } from '@/constants/currencies';

// Definindo o tipo das props que o componente CurrencySelector vai receber.
// Ele simplesmente recebe a moeda atualmente selecionada e uma função para atualizar essa moeda quando o usuário fizer uma seleção.
// Ele não precisa saber o que o pai vai fazer quando uma moeda for escolhida, apenas que ele deve chamar a função onChange com o código da moeda selecionada.
type CurrencySelectorProps = {
    currency: string;
    onChange: (currency: string) => void;
};

export function CurrencySelector({
    currency,
    onChange,
}: CurrencySelectorProps) {
    const [visible, setVisible] = useState(false);

    const handleSelect = (selectedCurrency: string) => {
        onChange(selectedCurrency);
        setVisible(false);
    };

    return (
        <>
            <Pressable
                style={styles.selector}
                onPress={() => setVisible(true)}
            >
                <Text style={styles.currency}>{currency}</Text>
                <Text style={styles.arrow}>▼</Text>
            </Pressable>
            
            {/*
                O modal inicia fechado, e só é aberto quando o usuário pressiona o Pressable.
                Quando o modal é aberto, ele mostra uma lista de moedas disponíveis para seleção.
                Cada item da lista é um Pressable que, quando pressionado, chama a função handleSelect com o código da moeda selecionada.
                A função handleSelect chama a função onChange passada pelo pai e fecha o modal.
            */}
            <Modal
                visible={visible}
                transparent
                animationType="slide"
                onRequestClose={() => setVisible(false)}
            >
                <View style={styles.overlay}>
                    <View style={styles.modal}>
                        <Text style={styles.title}>Selecione uma moeda</Text>

                        {/*
                            No FlatList: "Pegue o array currencies e gere uma lista."
                            O FlatList renderiza cada item do array currencies como um Pressable.
                            Cada Pressable mostra o código e o nome da moeda.
                            Se a moeda do item for a mesma que a moeda atualmente selecionada, mostramos um ✓ ao lado.
                            Quando o usuário pressiona um item, chamamos handleSelect com o código da moeda selecionada.
                        */}
                        <FlatList
                            data={currencies}
                            keyExtractor={(item) => item.code}
                            renderItem={({ item }) => (
                                <Pressable
                                    style={styles.option}
                                    onPress={() => handleSelect(item.code)}
                                >
                                    <View>
                                        <Text style={styles.code}>{item.code}</Text>
                                        <Text style={styles.name}>{item.name}</Text>
                                    </View>

                                    {item.code === currency && (
                                        <Text style={styles.selected}>✓</Text>
                                    )}
                                </Pressable>
                            )}
                        />

                        <Pressable
                            style={styles.cancelButton}
                            onPress={() => setVisible(false)}
                        >
                            <Text style={styles.cancelText}>Cancelar</Text>
                        </Pressable>
                    </View>
                </View>
            </Modal>
        </>
    );
}

const styles = StyleSheet.create({
    selector: {
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderWidth: 1,
        borderRadius: 8,
        paddingHorizontal: 16,
        paddingVertical: 14,
    },

    currency: {
        fontSize: 16,
        fontWeight: '600',
    },

    arrow: {
        fontSize: 12,
    },

    overlay: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        justifyContent: 'flex-end',
    },

    modal: {
        backgroundColor: '#fff',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        padding: 24,
        maxHeight: '70%',
    },

    title: {
        fontSize: 20,
        fontWeight: '700',
        marginBottom: 16,
    },

    option: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingVertical: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#e5e5e5',
    },

    code: {
        fontSize: 17,
        fontWeight: '600',
    },

    name: {
        fontSize: 14,
        color: '#666',
        marginTop: 2,
    },

    selected: {
        fontSize: 22,
    },

    cancelButton: {
        marginTop: 16,
        paddingVertical: 14,
        alignItems: 'center',
    },

    cancelText: {
        fontSize: 16,
        fontWeight: '600',
    },
});