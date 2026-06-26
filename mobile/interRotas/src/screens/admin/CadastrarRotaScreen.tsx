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
import { useEffect } from 'react';
import { Motorista } from '../../types/motorista';
import { Onibus } from '../../types/onibus';
import { listarMotoristas } from '../../services/motoristaService';
import { listarOnibus } from '../../services/onibusService';
import { Parada } from '../../types/parada';
import { listarParadas } from '../../services/paradaService';
import { cadastrarRota } from '../../services/rotaService';

export default function CadastrarRotaScreen({ navigation }: { navigation: any }) {
  const [nome, setNome] = useState('');
  const [motorista, setMotorista] = useState<Motorista[]>([]);
  const [onibus, setOnibus] = useState<Onibus[]>([]);
  const [paradas, setParadas] = useState<Parada[]>([]);

  const [idMotorista, setidMotorista] = useState('');
  const [motoristaNome, setMotoristaNome] = useState('');

  const [idOnibus, setidOnibus] = useState('');
  const [onibusNome, setOnibusNome] = useState('');

  const [paradaId, setParadaId] = useState('');
  const [paradaNome, setParadaNome] = useState('');

  const [modalMotorista, setModalMotorista] =
    useState(false);

  const [modalOnibus, setModalOnibus] =
    useState(false);

useEffect(() => {
  async function carregarDados() {
    try {
      const motoristasApi = await listarMotoristas();
      console.log('Motoristas:', motoristasApi);

      const onibusApi = await listarOnibus();
      console.log('Ônibus:', onibusApi);

      const paradasApi = await listarParadas();
      console.log('Paradas:', paradasApi);

      setMotorista(motoristasApi);
      setOnibus(onibusApi);
      setParadas(paradasApi);

    } catch (error: any) {
      console.log('URL:', error.config?.url);
      console.log('Status:', error.response?.status);
      console.log('Data:', error.response?.data);

      Alert.alert(
        'Erro',
        'Não foi possível carregar os dados.'
      );
    }
  }

  carregarDados();
}, []);

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

  async function cadastrar() {
    if (!nome || !motorista || !onibus || paradasSelecionadas.length === 0) {
      Alert.alert(
        'Erro',
        'Preencha todos os campos.'
      );

      return;
    }

    try {
      await cadastrarRota({
        nome,
        idMotorista: idMotorista,
        idOnibus:idOnibus,
        paradas: paradasSelecionadas,
      });

        Alert.alert(
        'Sucesso',
        'Rota cadastrada.'
      );

        setNome('');
        setidMotorista('');
        setMotoristaNome('');
        setidOnibus('');
        setOnibusNome('');
        setParadasSelecionadas([]);
    } catch (error: any) {
  console.log(
    'Status:',
    error.response?.status
  );

  console.log(
    'Data:',
    error.response?.data
  );

  console.error(
    'Erro ao cadastrar rota:',
    error
  );
}

  }

  return (
    <View style={styles.container}>
      <Modal
        visible={modalMotorista}
        transparent
        animationType="slide"
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitulo}>
              Selecione o Motorista
            </Text>

            {motorista.map(
              (item) => (
                <TouchableOpacity
                  key={item._id}
                  style={styles.paradaItem}
                  onPress={() => {
                    setidMotorista(item._id

                    );
                    setMotoristaNome(
                      `${item.matricula} - ${item.nome}`
                    );
                    setModalMotorista(false);
                  }}
                >
                  <Text>{item.matricula} - {item.nome}</Text>
                </TouchableOpacity>
              )
            )}
          </View>
        </View>
      </Modal>

      <Modal
        visible={modalOnibus}
        transparent
        animationType="slide"
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitulo}>
              Selecione o Ônibus
            </Text>

            {onibus.map(
              (item) => (
                <TouchableOpacity
                  key={item._id}
                  style={styles.paradaItem}
                  onPress={() => {
                    setidOnibus(item._id);
                    setOnibusNome(
                      `${item.codigo} - ${item.placa}`
                    );
                    setModalOnibus(false);
                  }}
                >
                  <Text>{item.codigo} - {item.placa}</Text>
                </TouchableOpacity>
              )
            )}
          </View>
        </View>
      </Modal>

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

            {paradas.map((parada) => {
              const selecionada =
                paradasSelecionadas.includes(parada._id);

              return (
                <TouchableOpacity
                  key={parada._id}
                  style={[
                    styles.paradaItem,
                    selecionada &&
                      styles.paradaSelecionada,
                  ]}
                  onPress={() =>
                    toggleParada(parada._id)
                  }
                >
                  <Text
                    style={styles.paradaTexto}
                  >
                    {parada.nome}
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

      <TouchableOpacity
        style={styles.input}
        onPress={() => setModalMotorista(true)}
      >
        <Text>
          {motoristaNome || 'Selecionar motorista'}
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.input}
        onPress={() => setModalOnibus(true)}
      >
        <Text>
          {onibusNome || 'Selecionar ônibus'}
        </Text>
      </TouchableOpacity>

      <TouchableOpacity 
      style={styles.buttonParada}
      onPress={() => setModalVisible(true)}>
        <Text style={styles.buttonTextParada}>
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
  buttonParada: {
    backgroundColor: '#DBEAFE',
    borderColor: '#CBD5E1',
    borderWidth: 1,
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 16,
  },
  buttonTextParada: {
    color: '#1E293B',
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