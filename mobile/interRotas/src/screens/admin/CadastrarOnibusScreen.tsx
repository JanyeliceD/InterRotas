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
      <Text style={styles.title}>
        Cadastro de Ônibus
      </Text>

      <TextInput
        style={styles.input}
        placeholder="Placa"
        placeholderTextColor="#94A3B8"
        value={placa}
        onChangeText={setPlaca}
      />

      <TextInput
        style={styles.input}
        placeholder="Modelo"
        placeholderTextColor="#94A3B8"
        value={modelo}
        onChangeText={setModelo}
      />

      <TextInput
        style={styles.input}
        placeholder="Capacidade"
        placeholderTextColor="#94A3B8"
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