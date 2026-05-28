import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Alert,
} from 'react-native';

import { useState } from 'react';

export default function CadastrarMotoristaScreen() {
  const [nome, setNome] = useState('');
  const [cpf, setCpf] = useState('');
  const [telefone, setTelefone] =
    useState('');

  function cadastrar() {
    if (!nome || !cpf || !telefone) {
      Alert.alert(
        'Erro',
        'Preencha todos os campos.'
      );

      return;
    }

    Alert.alert(
      'Sucesso',
      'Motorista cadastrado.'
    );

    setNome('');
    setCpf('');
    setTelefone('');
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        Cadastro de Motorista
      </Text>

      <TextInput
        style={styles.input}
        placeholder="Nome completo"
        placeholderTextColor="#94A3B8"
        value={nome}
        onChangeText={setNome}
      />

      <TextInput
        style={styles.input}
        placeholder="CPF"
        placeholderTextColor="#94A3B8"
        value={cpf}
        onChangeText={setCpf}
      />

      <TextInput
        style={styles.input}
        placeholder="Telefone"
        placeholderTextColor="#94A3B8"
        value={telefone}
        onChangeText={setTelefone}
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