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
      <Text style={styles.titulo}>
        Cadastrar Rota
      </Text>

      <TextInput
        style={styles.input}
        placeholder="Nome da rota"
        placeholderTextColor="#64748B"
        value={nome}
        onChangeText={setNome}
      />

      <TextInput
        style={styles.input}
        placeholder="Motorista"
        placeholderTextColor="#64748B"
        value={motorista}
        onChangeText={setMotorista}
      />

      <TextInput
        style={styles.input}
        placeholder="Origem"
        placeholderTextColor="#64748B"
        value={origem}
        onChangeText={setOrigem}
      />

      <TextInput
        style={styles.input}
        placeholder="Destino"
        placeholderTextColor="#64748B"
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