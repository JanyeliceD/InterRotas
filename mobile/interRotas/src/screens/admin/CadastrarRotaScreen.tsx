import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Alert,
} from 'react-native';

import { useState } from 'react';

export default function CadastrarRotaScreen() {
  const [nome, setNome] = useState('');
  const [motorista, setMotorista] = useState('');
  const [origem, setOrigem] = useState('');
  const [destino, setDestino] = useState('');

  function cadastrar() {
    if (!nome || !motorista || !origem || !destino) {
      Alert.alert(
        'Erro',
        'Preencha todos os campos.'
      );

      return;
    }

    Alert.alert(
      'Sucesso',
      'Rota cadastrada.'
    );

    setNome('');
    setMotorista('');
    setOrigem('');
    setDestino('');
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        Cadastro de Rota
      </Text>

      <TextInput
        style={styles.input}
        placeholder="Nome da rota"
        placeholderTextColor="#94A3B8"
        value={nome}
        onChangeText={setNome}
      />

      <TextInput
        style={styles.input}
        placeholder="Motorista"
        placeholderTextColor="#94A3B8"
        value={motorista}
        onChangeText={setMotorista}
      />

      <TextInput
        style={styles.input}
        placeholder="Origem"
        placeholderTextColor="#94A3B8"
        value={origem}
        onChangeText={setOrigem}
      />

      <TextInput
        style={styles.input}
        placeholder="Destino"
        placeholderTextColor="#94A3B8"
        value={destino}
        onChangeText={setDestino}
      />

      <TouchableOpacity
        style={styles.button}
        onPress={cadastrar}
      >
        <Text style={styles.buttonText}>
          Cadastrar
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1E293B',
    padding: 16,
  },

  title: {
    color: '#FFF',
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 24,
  },

  input: {
    backgroundColor: '#334155',
    color: '#FFF',
    borderRadius: 8,
    padding: 14,
    marginBottom: 16,
  },

  button: {
    backgroundColor: '#2563EB',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
  },

  buttonText: {
    color: '#FFF',
    fontWeight: 'bold',
    fontSize: 16,
  },
});