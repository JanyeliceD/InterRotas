import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Alert,
  Modal,
} from 'react-native';
import { useState, useEffect } from 'react';
import { Motorista } from '../../types/motorista';
import { Onibus } from '../../types/onibus';
import { listarMotoristas } from '../../services/motoristaService';
import { listarOnibus } from '../../services/onibusService';
import { Parada } from '../../types/parada';
import { listarParadas } from '../../services/paradaService';
import { cadastrarRota } from '../../services/rotaService';

export default function CadastrarRotaScreen({ navigation }: { navigation: any }) {
  const [nome, setNome] = useState('');
  const [quilometragem, setQuilometragem] = useState(''); 
  const [motorista, setMotorista] = useState<Motorista[]>([]);
  const [onibus, setOnibus] = useState<Onibus[]>([]);
  const [paradas, setParadas] = useState<Parada[]>([]);

  const [idMotorista, setidMotorista] = useState('');
  const [idOnibus, setidOnibus] = useState('');           
  const [motoristaNome, setMotoristaNome] = useState(''); 
  const [onibusPlaca, setOnibusPlaca] = useState('');     
  const [codigoRota, setCodigoRota] = useState('');
  const [modalMotorista, setModalMotorista] = useState(false);
  const [modalOnibus, setModalOnibus] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [paradasSelecionadas, setParadasSelecionadas] = useState<string[]>([]);

  useEffect(() => {
    async function carregarDados() {
      try {
        const motoristasApi = await listarMotoristas();
        const onibusApi = await listarOnibus();
        const paradasApi = await listarParadas();

        setMotorista(motoristasApi);
        setOnibus(onibusApi);
        setParadas(paradasApi);
      } catch (error: any) {
        console.log('Erro ao carregar dados iniciais:', error.response?.data || error.message);
        Alert.alert('Erro', 'Não foi possível carregar os dados.');
      }
    }
    carregarDados();
  }, []);

  function toggleParada(paradaId: string) {
    if (paradasSelecionadas.includes(paradaId)) {
      setParadasSelecionadas(paradasSelecionadas.filter((item) => item !== paradaId));
    } else {
      setParadasSelecionadas([...paradasSelecionadas, paradaId]);
    }
  }

  async function cadastrar() {
    if (!codigoRota || !nome || !motoristaNome || !onibusPlaca || !quilometragem || paradasSelecionadas.length === 0) {
      Alert.alert('Erro', 'Por favor, preencha todos os campos.');
      return;
    }

    try {
       const payload = {
        codigo: codigoRota,              
        nome: nome,                       
        idOnibus: onibusPlaca,           
        idMotorista: motoristaNome,        
        motorista: motoristaNome,          
        quilometragem: Number(quilometragem), 
        paradas: paradasSelecionadas,     
      };

      console.log('Enviando formato exato:', payload);

      await cadastrarRota(payload);

      Alert.alert('Sucesso', 'Rota cadastrada com sucesso!');

   
      setCodigoRota('');
      setNome('');
      setQuilometragem(''); 
      setidMotorista('');
      setMotoristaNome('');
      setidOnibus('');
      setOnibusPlaca('');
      setParadasSelecionadas([]);
    } catch (error: any) {
      console.log('Status Erro:', error.response?.status);
      console.log('O que o NestJS barrou:', JSON.stringify(error.response?.data?.message));
      Alert.alert('Erro', 'O backend recusou os dados. Verifique as validações do DTO.');
    }
  
  }

  return (
    <View style={styles.container}>
      
      {/* MODAL SELEÇÃO MOTORISTA */}
      <Modal visible={modalMotorista} transparent animationType="slide">
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitulo}>Selecione o Motorista</Text>
            {motorista.map((item) => (
              <TouchableOpacity
                key={item._id}
                style={styles.paradaItem}
                onPress={() => {
                  setidMotorista(item._id);
                  setMotoristaNome(item.nome); 
                  setModalMotorista(false);
                }}
              >
                <Text>{item.matricula} - {item.nome}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </Modal>

      {/* MODAL SELEÇÃO ÔNIBUS */}
      <Modal visible={modalOnibus} transparent animationType="slide">
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitulo}>Selecione o Ônibus</Text>
            {onibus.map((item) => (
              <TouchableOpacity
                key={item._id}
                style={styles.paradaItem}
                onPress={() => {
                  setidOnibus(item._id);
                  setOnibusPlaca(item.placa); 
                  setModalOnibus(false);
                }}
              >
                <Text>{item.codigo} - {item.placa}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </Modal>

      {/* MODAL SELEÇÃO PARADAS */}
      <Modal visible={modalVisible} animationType="slide" transparent>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitulo}>Selecione as Paradas</Text>
            {paradas.map((parada) => {
              const selecionada = paradasSelecionadas.includes(parada._id);
              return (
                <TouchableOpacity
                  key={parada._id}
                  style={[styles.paradaItem, selecionada && styles.paradaSelecionada]}
                  onPress={() => toggleParada(parada._id)}
                >
                  <Text style={styles.paradaTexto}>{parada.nome}</Text>
                </TouchableOpacity>
              );
            })}
            <TouchableOpacity style={styles.button} onPress={() => { navigation.navigate('CadastrarParada'); setModalVisible(false); }}>
              <Text style={styles.buttonText}>Nova parada</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={() => setModalVisible(false)}>
              <Text style={styles.buttonText}>Concluir</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      <Text style={styles.titulo}>Cadastrar Rota</Text>

      <TextInput
        style={styles.input}
        placeholder="Nome da rota"
        placeholderTextColor="#64748B"
        value={nome}
        onChangeText={setNome}
      /> 
      <TextInput
            style={styles.input}
            placeholder="Código da rota (Ex: ROTA003)"
            placeholderTextColor="#64748B"
            value={codigoRota}
            onChangeText={setCodigoRota}
          />

      {/* INPUT VISUAL DA QUILOMETRAGEM ADICIONADO */}
      <TextInput
        style={styles.input}
        placeholder="Quilometragem da rota (km)"
        placeholderTextColor="#64748B"
        keyboardType="numeric" 
        value={quilometragem}
        onChangeText={setQuilometragem}
      />

      <TouchableOpacity style={styles.input} onPress={() => setModalMotorista(true)}>
        <Text style={{ color: motoristaNome ? '#1E293B' : '#64748B' }}>
          {motoristaNome ? `Motorista: ${motoristaNome}` : 'Selecionar motorista'}
        </Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.input} onPress={() => setModalOnibus(true)}>
        <Text style={{ color: onibusPlaca ? '#1E293B' : '#64748B' }}>
          {onibusPlaca ? `Veículo (Placa): ${onibusPlaca}` : 'Selecionar ônibus'}
        </Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.buttonParada} onPress={() => setModalVisible(true)}>
        <Text style={styles.buttonTextParada}>Adicionar Paradas</Text>
      </TouchableOpacity>

      <Text style={styles.infoParadas}>
        {paradasSelecionadas.length} parada(s) widgets selecionada(s)
      </Text>

      <TouchableOpacity style={styles.button} onPress={cadastrar}>
        <Text style={styles.buttonText}>Cadastrar Rota</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F8FAFC', padding: 16 },
  titulo: { color: '#1E40AF', fontSize: 24, fontWeight: 'bold', marginBottom: 24 },
  input: { backgroundColor: '#F1F5F9', color: '#1E293B', borderRadius: 8, padding: 14, marginBottom: 16 },
  button: { backgroundColor: '#1E40AF', padding: 16, borderRadius: 8, alignItems: 'center', marginBottom: 16 },
  buttonText: { color: '#FFF', fontWeight: 'bold', fontSize: 16 },
  buttonParada: { backgroundColor: '#DBEAFE', borderColor: '#CBD5E1', borderWidth: 1, padding: 16, borderRadius: 8, alignItems: 'center', marginBottom: 16 },
  buttonTextParada: { color: '#1E293B', fontWeight: 'bold', fontSize: 16 },
  infoParadas: { marginBottom: 16, color: '#475569' },
  modalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'center', padding: 16 },
  modalContainer: { backgroundColor: '#FFF', borderRadius: 12, padding: 20 },
  modalTitulo: { fontSize: 20, fontWeight: 'bold', marginBottom: 16, color: '#1E40AF' },
  paradaItem: { padding: 14, borderWidth: 1, borderColor: '#CBD5E1', borderRadius: 8, marginBottom: 10 },
  paradaSelecionada: { backgroundColor: '#DBEAFE', borderColor: '#1E40AF' },
  paradaTexto: { fontSize: 16 }
});