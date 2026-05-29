import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Alert,
} from 'react-native';

import { useState } from 'react';

export default function CadastrarOnibusScreen() {
  const [placa, setPlaca] = useState('');
  const [modelo, setModelo] = useState('');
  const [capacidade, setCapacidade] =
    useState('');

  function cadastrar() {
    if (!placa || !modelo || !capacidade) {
      Alert.alert(
        'Erro',
        'Preencha todos os campos.'
      );

      return;
    }

    Alert.alert(
      'Sucesso',
      'Ônibus cadastrado.'
    );

    setPlaca('');
    setModelo('');
    setCapacidade('');
  }

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>
        Cadastrar Ônibus
      </Text>

      <TextInput
        style={styles.input}
        placeholder="Placa"
        placeholderTextColor="#64748B"
        value={placa}
        onChangeText={setPlaca}
      />

      <TextInput
        style={styles.input}
        placeholder="Modelo"
        placeholderTextColor="#64748B"
        value={modelo}
        onChangeText={setModelo}
      />

      <TextInput
        style={styles.input}
        placeholder="Capacidade de passageiros"
        placeholderTextColor="#64748B"
        keyboardType="numeric"
        value={capacidade}
        onChangeText={setCapacidade}
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