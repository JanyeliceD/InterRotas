import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { useState } from 'react';
import { cadastrarParada } from '../../services/paradaService';

export default function CadastrarParadaScreen() {
  const [nome, setNome] = useState('');
  const [endereco, setEndereco] = useState('');
  const [latitude, setLatitude] = useState('');
  const [longitude, setLongitude] = useState('');

  async function cadastrar() {
    try {
      await cadastrarParada({
        nome,
        endereco,
        latitude: Number(latitude),
        longitude: Number(longitude),
      });

        Alert.alert(
        'Sucesso',
        'Parada cadastrada.'
      );
    } catch {
      if (!nome || !latitude || !longitude) {
        Alert.alert(
          'Erro',
          'Preencha todos os campos.'
        );
      }
    }

    setNome('');
    setEndereco('');
    setLatitude('');
    setLongitude('');
  }

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>
        Cadastrar Parada
      </Text>

      <TextInput
        style={styles.input}
        placeholder="Nome da parada"
        placeholderTextColor="#64748B"
        value={nome}
        onChangeText={setNome}
      />

      <TextInput
        style={styles.input}
        placeholder="Endereço"
        placeholderTextColor="#64748B"
        value={endereco}
        onChangeText={setEndereco}
      />

      <TextInput
        style={styles.input}
        placeholder="Latitude"
        placeholderTextColor="#64748B"
        value={latitude}
        onChangeText={setLatitude}
      />

      <TextInput
        style={styles.input}
        placeholder="Longitude"
        placeholderTextColor="#64748B"
        value={longitude}
        onChangeText={setLongitude}
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