import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { useState } from 'react';
import { cadastrarMotorista } from '../../services/motoristaService';

export default function CadastrarMotoristaScreen() {
  const [nome, setNome] = useState('');
  const [cpf, setCpf] = useState('');
  const [cnh, setCnh] = useState('');
  const [email, setEmail] = useState('');
  const [telefone, setTelefone] = useState('');

  async function cadastrar() {
    try {
      await cadastrarMotorista({
        nome,
        cpf,
        cnh,
        email,
        telefone,
      })

        Alert.alert(
        'Sucesso',
        'Motorista cadastrado.'
      );
    } catch {
        if (!nome || !cpf || !cnh || !email || !telefone) {
        Alert.alert(
          'Erro',
          'Preencha todos os campos.'
        );
      }
    }

    setNome('');
    setCpf('');
    setCnh('');
    setEmail('');
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
        placeholder="CNH"
        placeholderTextColor="#64748B"
        value={cnh}
        onChangeText={setCnh}
      />

      <TextInput
        style={styles.input}
        placeholder="Email"
        placeholderTextColor="#64748B"
        value={email}
        onChangeText={setEmail}
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