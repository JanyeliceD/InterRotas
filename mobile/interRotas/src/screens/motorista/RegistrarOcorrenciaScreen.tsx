import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Alert,
  FlatList,
} from 'react-native';

import { useState } from 'react';

const tiposOcorrencia = [
  'Pneu furado',
  'Falha mecânica',
  'Atraso',
  'Desvio de rota',
  'Superlotação',
  'Emergência',
];

export default function RegistrarOcorrenciaScreen() {
  const [placa, setPlaca] = useState('');
  const [tipoSelecionado, setTipoSelecionado] = useState('');
  const [observacao, setObservacao] = useState('');

  function enviarOcorrencia() {
    if (!placa || !tipoSelecionado) {
      Alert.alert(
        'Erro',
        'Preencha a placa e selecione uma ocorrência.'
      );

      return;
    }

    Alert.alert(
      'Sucesso',
      'Ocorrência enviada com sucesso.'
    );

    setPlaca('');
    setTipoSelecionado('');
    setObservacao('');
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        Registrar Ocorrência
      </Text>

      <TextInput
        style={styles.input}
        placeholder="Placa do ônibus"
        placeholderTextColor="#94A3B8"
        value={placa}
        onChangeText={setPlaca}
      />

      <Text style={styles.label}>
        Tipo de ocorrência
      </Text>

      <FlatList
        data={tiposOcorrencia}
        numColumns={2}
        keyExtractor={(item) => item}
        columnWrapperStyle={{
          justifyContent: 'space-between',
        }}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={[
              styles.ocorrenciaButton,
              tipoSelecionado === item &&
                styles.ocorrenciaSelecionada,
            ]}
            onPress={() =>
              setTipoSelecionado(item)
            }
          >
            <Text style={styles.ocorrenciaText}>
              {item}
            </Text>
          </TouchableOpacity>
        )}
      />

      <TextInput
        style={styles.textArea}
        placeholder="Observação (opcional)"
        placeholderTextColor="#94A3B8"
        multiline
        numberOfLines={4}
        value={observacao}
        onChangeText={setObservacao}
      />

      <TouchableOpacity
        style={styles.button}
        onPress={enviarOcorrencia}
      >
        <Text style={styles.buttonText}>
          Enviar ocorrência
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
    fontSize: 22,
    fontWeight: 'bold',
    color: '#FFF',
    marginBottom: 20,
  },

  input: {
    backgroundColor: '#334155',
    color: '#FFF',
    borderRadius: 8,
    padding: 14,
    marginBottom: 16,
  },

  label: {
    color: '#CBD5E1',
    marginBottom: 10,
    fontSize: 16,
  },

  ocorrenciaButton: {
    backgroundColor: '#0F172A',
    width: '48%',
    padding: 14,
    borderRadius: 8,
    marginBottom: 12,
    alignItems: 'center',
  },

  ocorrenciaSelecionada: {
    borderWidth: 2,
    borderColor: '#3B82F6',
  },

  ocorrenciaText: {
    color: '#FFF',
    textAlign: 'center',
  },

  textArea: {
    backgroundColor: '#334155',
    color: '#FFF',
    borderRadius: 8,
    padding: 14,
    marginTop: 10,
    height: 100,
    textAlignVertical: 'top',
  },

  button: {
    backgroundColor: '#1D4ED8',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 20,
  },

  buttonText: {
    color: '#FFF',
    fontWeight: 'bold',
    fontSize: 16,
  },
});