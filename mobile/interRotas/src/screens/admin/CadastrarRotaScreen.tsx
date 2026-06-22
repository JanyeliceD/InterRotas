import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Alert,
  Modal,
} from 'react-native';

import { useState } from 'react';

export default function CadastrarRotaScreen({ navigation }: { navigation: any }) {
  const [nome, setNome] = useState('');
  const [motorista, setMotorista] = useState('');
  const [onibus, setOnibus] = useState('');

  const paradasDisponiveis = [
  'Rodoviária',
  'Centro',
  'Hospital',
  'IFRN',
  'Mercado Público',
];

  const [modalVisible, setModalVisible] = useState(false);

  const [paradasSelecionadas, setParadasSelecionadas] =
    useState<string[]>([]);

  function toggleParada(parada: string) {
  if (paradasSelecionadas.includes(parada)) {
    setParadasSelecionadas(
      paradasSelecionadas.filter(
        (item) => item !== parada
      )
    );
  } else {
    setParadasSelecionadas([
      ...paradasSelecionadas,
      parada,
    ]);
  }
}

  function cadastrar() {
    if (!nome || !motorista || !onibus || paradasSelecionadas.length === 0) {
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
    setOnibus('');
  }

  return (
    <View style={styles.container}>
      <Modal
        visible={modalVisible}
        animationType="slide"
        transparent
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitulo}>
              Selecione as Paradas
            </Text>

            {paradasDisponiveis.map((parada) => {
              const selecionada =
                paradasSelecionadas.includes(parada);

              return (
                <TouchableOpacity
                  key={parada}
                  style={[
                    styles.paradaItem,
                    selecionada &&
                      styles.paradaSelecionada,
                  ]}
                  onPress={() =>
                    toggleParada(parada)
                  }
                >
                  <Text
                    style={styles.paradaTexto}
                  >
                    {parada}
                  </Text>
                </TouchableOpacity>
              );
            })}

            <TouchableOpacity
              style={styles.button}
              onPress={() => {
                navigation.navigate('CadastrarParada');
                setModalVisible(false);
              }}
            >
              <Text style={styles.buttonText}>
                Nova parada
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.button}
              onPress={() =>
                setModalVisible(false)
              }
            >
              <Text style={styles.buttonText}>
                Concluir
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
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
        placeholder="Ônibus"
        placeholderTextColor="#64748B"
        value={onibus}
        onChangeText={setOnibus}
      />

      <TouchableOpacity 
      style={styles.button}
      onPress={() => setModalVisible(true)}>
        <Text style={styles.buttonText}>
          Adicionar Paradas
        </Text>
      </TouchableOpacity>

      <Text style={styles.infoParadas}>
        {paradasSelecionadas.length} parada(s)
        selecionada(s)
      </Text>

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
    marginBottom: 16,
  },

  buttonText: {
    color: '#FFF',
    fontWeight: 'bold',
    fontSize: 16,
  },
  infoParadas: {
  marginBottom: 16,
  color: '#475569',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    padding: 16,
  },
  modalContainer: {
    backgroundColor: '#FFF',
    borderRadius: 12,
    padding: 20,
  },
  modalTitulo: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
    color: '#1E40AF',
  },
  paradaItem: {
    padding: 14,
    borderWidth: 1,
    borderColor: '#CBD5E1',
    borderRadius: 8,
    marginBottom: 10,
  },
  paradaSelecionada: {
    backgroundColor: '#DBEAFE',
    borderColor: '#1E40AF',
  },
  paradaTexto: {
    fontSize: 16,
  },
});