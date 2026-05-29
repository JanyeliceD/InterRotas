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
      <Text style={styles.titulo}>
        Cadastrar Motorista
      </Text>

      <TextInput
        style={styles.input}
        placeholder="Nome completo"
        placeholderTextColor="#64748B"
        value={nome}
        onChangeText={setNome}
      />

      <TextInput
        style={styles.input}
        placeholder="CPF"
        placeholderTextColor="#64748B"
        value={cpf}
        onChangeText={setCpf}
      />

      <TextInput
        style={styles.input}
        placeholder="Telefone"
        placeholderTextColor="#64748B"
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
    backgroundColor: '#F8FAFC',
    padding: 16,
  },

  titulo: {
    color: '#1E40AF',
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 24,
  },

  input: {
    backgroundColor: '#F1F5F9',
    color: '#1E293B',
    borderRadius: 8,
    padding: 14,
    marginBottom: 16,
  },

  button: {
    backgroundColor: '#1E40AF',
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