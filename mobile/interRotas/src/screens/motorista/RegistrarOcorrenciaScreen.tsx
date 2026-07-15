import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Alert,
  FlatList,
  Modal,
} from 'react-native';
import { useState } from 'react';
import { useEffect } from 'react';
import { buscarOnibusPorPlaca, listarOnibus, Onibus } from '../../services/onibusService';

import {
  Ocorrencia,
  registrarOcorrencia,
  listarOcorrencias,
  TipoOcorrencia,
} from '../../services/ocorrenciaService';

const tiposOcorrencia = [
  { label: 'Falha Mecânica', value: 'FALHA_MECANICA' as TipoOcorrencia },
  { label: 'Pneu Furado', value: 'PNEU_FURADO' as TipoOcorrencia },
  { label: 'Acidente', value: 'ACIDENTE' as TipoOcorrencia },
  { label: 'Trânsito', value: 'TRANSITO' as TipoOcorrencia },
  { label: 'Outro', value: 'OUTRO' as TipoOcorrencia },
]

export default function RegistrarOcorrenciaScreen({ navigation }: any) {
  const [placa, setPlaca] = useState('');
  const [tipoSelecionado, setTipoSelecionado] = useState<TipoOcorrencia | ''>('');
  const [observacao, setObservacao] = useState('');
  const [loading, setLoading] = useState(true);

  
  const [idOnibus, setIdOnibus] = useState('');
  const [onibusSelecionado, setOnibusSelecionado] = useState<Onibus | null>(null);
  const [onibus, setOnibus] = useState<Onibus[]>([]);
  const [modalOnibus, setModalOnibus] = useState(false);
  const [onibusPlaca, setOnibusPlaca] = useState('');

  useEffect(() => {
    carregarOnibus();
  }, []);

  async function carregarOnibus() {
    try {
      const dados = await listarOnibus();
      setOnibus(dados);
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível carregar os ônibus:');
    }
  }

  async function enviarOcorrencia() {
    if (!idOnibus || !tipoSelecionado) {
      Alert.alert(
        'Validação',
        'Por favor, preencha a placa e selecione um tipo de ocorrência.'
      );
      return;
    }

    try {
      await registrarOcorrencia(
        idOnibus, 
        tipoSelecionado, 
        observacao
      );

      Alert.alert(
        'Sucesso',
        'Ocorrência registrada com sucesso.'
      );
    } catch (error) {
      console.error(error);
      Alert.alert(
        'Erro',
        'Não foi possível registrar a ocorrência.'
      );
    } finally {
      setLoading(false);
    }

    navigation.navigate('MotoristaHome', {
    ultimaOcorrencia: {
      placa: onibusSelecionado?.placa,
      tipo: tipoSelecionado,
      observacao,
      horario: new Date().toLocaleTimeString(),
    },
  });

    setPlaca('');
    setTipoSelecionado('');
    setObservacao('');
  }

  return (
    <View style={styles.container}>
       {/* MODAL SELEÇÃO ÔNIBUS */}
             <Modal
               visible={modalOnibus}
               transparent
               animationType="slide"
               onRequestClose={() => setModalOnibus(false)}
             >
               <View style={styles.modalOverlay}>
                 <View style={styles.modalContainer}>
       
                   <Text style={styles.modalTitulo}>
                     Selecione o Ônibus
                   </Text>
       
                   <FlatList
                     data={onibus}
                     keyExtractor={(item, index) => item._id ?? index.toString()}
                     style={styles.listaParadas}
                     renderItem={({ item }) => (
                       <TouchableOpacity
                         style={styles.paradaItem}
                         onPress={() => {
                          if (!item._id) return;

                          setIdOnibus(item._id);
                          setOnibusSelecionado(item);
                          setModalOnibus(false);
                        }}
                       >
                         <Text>
                           {item.codigo} - {item.placa}
                         </Text>
                       </TouchableOpacity>
                     )}
                   />
       
                   <TouchableOpacity
                     style={styles.botaoCancelarSeletor}
                     onPress={() => setModalOnibus(false)}
                   >
                     <Text style={styles.buttonText}>
                       Cancelar
                     </Text>
                   </TouchableOpacity>
       
                 </View>
               </View>
             </Modal>

      <Text style={styles.title}>
        Registrar Ocorrência
      </Text>

      <TouchableOpacity
        style={styles.input}
        onPress={() => setModalOnibus(true)}
      >
      <Text>
      {onibusSelecionado
        ? `${onibusSelecionado.codigo} - ${onibusSelecionado.placa}`
        : 'Selecionar ônibus'}
    </Text>
      </TouchableOpacity>

      <Text style={styles.label}>
        Tipo de ocorrência
      </Text>

      <FlatList
        data={tiposOcorrencia}
        keyExtractor={(item) => item.value}
        numColumns={2}
        columnWrapperStyle={{
          justifyContent: 'space-between',
        }}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={[
              styles.tipoButton,

              tipoSelecionado === item.value &&
                styles.tipoSelecionado,
            ]}
            onPress={() => setTipoSelecionado(item.value)}
          >
            <Text style={styles.tipoText}>
              {item.label}
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
    backgroundColor: '#F8FAFC',
    padding: 16,
  },

  title: {
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

  label: {
    color: '#1E293B',
    fontSize: 16,
    marginBottom: 12,
  },

  tipoButton: {
    backgroundColor: '#F1F5F9',
    width: '48%',
    padding: 14,
    borderRadius: 8,
    marginBottom: 12,
    alignItems: 'center',
  },

  tipoSelecionado: {
    borderWidth: 2,
    borderColor: '#1E40AF',
  },

  tipoText: {
    color: '#1E293B',
    textAlign: 'center',
  },

  textArea: {
    backgroundColor: '#F1F5F9',
    color: '#1E293B',
    borderRadius: 8,
    padding: 14,
    height: 100,
    textAlignVertical: 'top',
    marginTop: 8,
    marginBottom: 100,
  },

  button: {
    backgroundColor: '#1E40AF',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 14,
    marginBottom: 56,
  },

  buttonText: {
    color: '#FFF',
    fontWeight: 'bold',
    fontSize: 16,
  },
  modalOverlay: { 
    flex: 1, 
    backgroundColor: 'rgba(0,0,0,0.5)', 
    justifyContent: 'center', 
    padding: 16 
  },
  modalTitulo: { 
    fontSize: 20, 
    fontWeight: 'bold', 
    marginBottom: 16, 
    color: '#1E40AF' 
  },
  paradaItem: { 
    padding: 14, 
    borderWidth: 1, 
    borderColor: '#CBD5E1', 
    borderRadius: 8, 
    marginBottom: 10 
  },
  modalContainer: {
    backgroundColor: '#FFF',
    borderRadius: 12,
    padding: 20,
    maxHeight: '80%',
    width: '100%',
  },
  paradaSelecionada: { backgroundColor: '#DBEAFE', borderColor: '#1E40AF' },
  paradaTexto: { fontSize: 16 },
  botaoCancelarSeletor: { backgroundColor: '#64748B', paddingVertical: 12, borderRadius: 8, alignItems: 'center', marginTop: 10 },
  mapContainer: { height: 300, borderRadius: 12, overflow: 'hidden', marginBottom: 12 },
  listaParadas: {
  maxHeight: 300,
  marginBottom: 15,
},
});