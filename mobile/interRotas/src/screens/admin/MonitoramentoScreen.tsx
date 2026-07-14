import { View, Text, StyleSheet, TextInput, FlatList, Pressable, Modal, ActivityIndicator, Alert } from 'react-native';
import { useState, useEffect } from 'react';

import { listarRotas, atualizarRota, deletarRota, Rotas } from '../../services/rotaService'; 
import { listarMotoristas, Motorista } from '../../services/motoristaService';
import { listarOnibus, Onibus } from '../../services/onibusService';
import Mapa from '../../components/Mapa';
import { Localizacao, listarLocalizacoes } from '../../services/localizacaoService';

export default function MonitoramentoScreen() {
  const [busca, setBusca] = useState('');
  const [listaRotas, setListaRotas] = useState<Rotas[]>([]);
  const [carregando, setCarregando] = useState(true);
  const [todosOnibus, setTodosOnibus] = useState<Onibus[]>([]);
  const [todosMotoristas, setTodosMotoristas] = useState<Motorista[]>([]);
  const [modalDetalhesVisivel, setModalDetalhesVisivel] = useState(false);
  const [rotaSelecionada, setRotaSelecionada] = useState<Rotas | null>(null);
  const [modalEditarVisivel, setModalEditarVisivel] = useState(false);
  const [idEditando, setIdEditando] = useState('');
  const [nomeEditando, setNomeEditando] = useState('');
  const [modalDeletarVisible, setModalDeletarVisible] = useState(false);
const [rotaParaDeletar, setRotaParaDeletar] = useState<any>(null);

  const [idOnibusSelecionado, setIdOnibusSelecionado] = useState('');
  const [idMotoristaSelecionado, setIdMotoristaSelecionado] = useState('');
  
  const [modalSeletorOnibusVisivel, setModalSeletorOnibusVisivel] = useState(false);
  const [modalSeletorMotoristaVisivel, setModalSeletorMotoristaVisivel] = useState(false);
  const [localizacoes, setLocalizacoes] = useState<Localizacao[]>([]);

  const precoDiesel = 5.90; 
  const mediaKmL = 3.5;

  const carregarDadosIniciais = async () => {
    try {
      setCarregando(true);
      const dadosRotas = await listarRotas();
      setListaRotas(Array.isArray(dadosRotas) ? dadosRotas : []);

      const dadosOnibus = await listarOnibus();
      setTodosOnibus(Array.isArray(dadosOnibus) ? dadosOnibus : []);

      const dadosMotoristas = await listarMotoristas();
      setTodosMotoristas(Array.isArray(dadosMotoristas) ? dadosMotoristas : []);
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível carregar os dados do servidor.');
    } finally {
      setCarregando(false);
    }
  };

  useEffect(() => {
    carregarDadosIniciais();
  }, []);

  useEffect(() => {
    carregarMapa();
    const intervalo = setInterval(() => {
      carregarMapa();
    }, 10000); 
    return () => clearInterval(intervalo);
  }, []);

  async function carregarMapa() {
    try {
      if (!rotaSelecionada) {
        return;
      }

      const dados = await listarLocalizacoes();
      const localizacoesDaRota = (Array.isArray(dados) ? dados : []).filter((loc) => {
        const idOnibusLocalizacao = typeof loc.idOnibus === 'string' ? loc.idOnibus : loc.idOnibus?._id;
        const idOnibusRota = typeof rotaSelecionada.idOnibus === 'string'
          ? rotaSelecionada.idOnibus
          : (rotaSelecionada.idOnibus as { _id?: string } | undefined)?._id;

        return idOnibusLocalizacao === idOnibusRota;
      });

      setLocalizacoes(localizacoesDaRota);
    } catch (err) {
      console.log("Erro ao carregar mapa", err);
    }
  }
  const onibusAtual = todosOnibus.find(o => o.placa === idOnibusSelecionado);
  const motoristaAtual = todosMotoristas.find(m => m.nome === idMotoristaSelecionado);

  const rotasFiltradas = listaRotas.filter((rota) => {
    const nomeRota = rota.nome?.toLowerCase() || '';
    const nomeMotorista = typeof rota.idMotorista === 'object' 
      ? (rota.idMotorista?.nome || '').toLowerCase() 
      : (rota.idMotorista || rota.motorista || '').toLowerCase();
    return nomeRota.includes(busca.toLowerCase()) || nomeMotorista.includes(busca.toLowerCase());
  });

  function verDetalhes(item: Rotas) {
    setRotaSelecionada(item);
    setModalDetalhesVisivel(true);
  }

  function iniciarEdicao(item: Rotas) {
    
    setIdEditando(item._id?.toString() || item.id?.toString() || '');
    setNomeEditando(item.nome || '');
    
    const textoOnibus = typeof item.idOnibus === 'object' ? (item.idOnibus?.placa || '') : (item.idOnibus || item.onibus || '');
    const textoMotorista = typeof item.idMotorista === 'object' ? (item.idMotorista?.nome || '') : (item.idMotorista || item.motorista || '');

    setIdOnibusSelecionado(textoOnibus);
    setIdMotoristaSelecionado(textoMotorista);
    
    setModalEditarVisivel(true);
  }

  async function salvarAlteracoesBackend() {
   
    if (!nomeEditando || !idOnibusSelecionado || !idMotoristaSelecionado) {
      Alert.alert('Erro', 'Por favor, preencha todos os campos obrigatórios.');
      return;
    }

    try {
      setCarregando(true);
      
       const payloadEnvio = {
        nome: nomeEditando,
        idOnibus: idOnibusSelecionado,       
        idMotorista: idMotoristaSelecionado  
      };
      
      console.log(` Enviando atualização para ID: "${idEditando}". Payload:`, payloadEnvio);

      await atualizarRota(idEditando, payloadEnvio);
      
      Alert.alert('Sucesso', 'Rota updated com sucesso!');
      setModalEditarVisivel(false);
      await carregarDadosIniciais();
    } catch (error: any) {
      console.log(' Erro retornado pelo servidor:', error.response?.data || error.message);
      Alert.alert('Erro', 'Não foi possível salvar as alterações no banco de dados.');
    } finally {
      setCarregando(false);
    }
  }

 async function lidarComDeletar(item: any) {
    const id = item._id;
    if (!id) return;

    try {
      setCarregando(true);
      
     
      await deletarRota(id); 
      
   
      setListaRotas((rotasAtuais) => rotasAtuais.filter(rota => rota._id !== id));
    } catch (error) {
      console.log('Erro ao deletar:', error);
    } finally {
      setCarregando(false);
    }
  }

  return (
    <View style={styles.container}>
      
      {/* MODAL DETALHES */}
      <Modal animationType="fade" transparent={true} visible={modalDetalhesVisivel} onRequestClose={() => setModalDetalhesVisivel(false)}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Relatório da Rota</Text>
            {rotaSelecionada && (
              <View style={styles.modalBody}>
                <View style={styles.mapContainer}>
                  <Mapa 
                  localizacoes={localizacoes} 
                  paradas={rotaSelecionada.paradas} 
                  mostrarOnibus={true} mostrarParadas={true} 
                  mostrarRota={true} 
                  />
                </View>
                <Text style={styles.modalTextoLinha}><Text style={styles.boldText}>Linha: </Text>{rotaSelecionada.nome}</Text>
                <Text style={styles.modalTexto}>
                  <Text style={styles.boldText}>Veículo/Placa: </Text>
                  {typeof rotaSelecionada.idOnibus === 'object' ? rotaSelecionada.idOnibus?.placa : (rotaSelecionada.idOnibus || 'Não informado')}
                </Text>
                <Text style={styles.modalTexto}>
                  <Text style={styles.boldText}>Motorista: </Text>
                  {typeof rotaSelecionada.idMotorista === 'object' ? rotaSelecionada.idMotorista?.nome : (rotaSelecionada.idMotorista || 'Não informado')}
                </Text>
                <View style={styles.divisor} />
                <Text style={styles.modalTexto}><Text style={styles.boldText}>Odômetro: </Text>{rotaSelecionada.quilometragem || 0} km</Text>
                <Text style={styles.modalTexto}><Text style={styles.boldText}>Diesel Estimado: </Text>{((rotaSelecionada.quilometragem || 0) / mediaKmL).toFixed(1)} L</Text>
                <Text style={styles.modalTextoFin}><Text style={styles.boldText}>Custo Total: </Text>R$ {(((rotaSelecionada.quilometragem || 0) / mediaKmL) * precoDiesel).toFixed(2)}</Text>
              </View>
            )}
            <Pressable style={styles.botaoFecharModal} onPress={() => setModalDetalhesVisivel(false)}>
              <Text style={styles.textoBotaoFechar}>Fechar</Text>
            </Pressable>
          </View>
        </View>
      </Modal>

      {/* MODAL EDITAR */}
      <Modal animationType="slide" transparent={true} visible={modalEditarVisivel} onRequestClose={() => setModalEditarVisivel(false)}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Editar Rota</Text>

            <Text style={styles.inputLabel}>Nome da Linha</Text>
            <TextInput style={styles.modalInput} value={nomeEditando} onChangeText={setNomeEditando} />

            <Text style={styles.inputLabel}>Selecionar Ônibus (Placa)</Text>
            <Pressable style={styles.seletorBotao} onPress={() => setModalSeletorOnibusVisivel(true)}>
              <Text style={styles.seletorBotaoTexto}>
                {onibusAtual ? `${onibusAtual.placa} ${onibusAtual.modelo ? `(${onibusAtual.modelo})` : ''}` : (idOnibusSelecionado || 'Escolha um veículo...')}
              </Text>
              <Text style={styles.setaSeletor}>▼</Text>
            </Pressable>

            <Text style={styles.inputLabel}>Selecionar Motorista</Text>
            <Pressable style={styles.seletorBotao} onPress={() => setModalSeletorMotoristaVisivel(true)}>
              <Text style={styles.seletorBotaoTexto}>
                {motoristaAtual ? motoristaAtual.nome : (idMotoristaSelecionado || 'Escolha um motorista...')}
              </Text>
              <Text style={styles.setaSeletor}>▼</Text>
            </Pressable>

            <View style={{ flexDirection: 'row', gap: 10, marginTop: 20 }}>
              <Pressable style={[styles.botaoFecharModal, { flex: 1, backgroundColor: '#94A3B8' }]} onPress={() => setModalEditarVisivel(false)}>
                <Text style={styles.textoBotaoFechar}>Cancelar</Text>
              </Pressable>
              <Pressable style={[styles.botaoFecharModal, { flex: 1, backgroundColor: '#059669' }]} onPress={salvarAlteracoesBackend}>
                <Text style={styles.textoBotaoFechar}>Salvar</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>

      {/* SELETOR ÔNIBUS */}
      <Modal animationType="fade" transparent={true} visible={modalSeletorOnibusVisivel} onRequestClose={() => setModalSeletorOnibusVisivel(false)}>
        <View style={styles.subModalOverlay}>
          <View style={styles.subModalContent}>
            <Text style={styles.subModalTitle}>Selecione o Veículo</Text>
            <FlatList
              data={todosOnibus}
              keyExtractor={(item) => (item._id || item.id || item.placa).toString()}
              renderItem={({ item }) => (
                <Pressable style={styles.itemSelecao} onPress={() => { setIdOnibusSelecionado(item.placa); setModalSeletorOnibusVisivel(false); }}>
                  <Text style={styles.itemSelecaoTexto}>{item.placa} {item.modelo ? `- ${item.modelo}` : ''}</Text>
                </Pressable>
              )}
            />
            <Pressable style={styles.botaoCancelarSeletor} onPress={() => setModalSeletorOnibusVisivel(false)}>
              <Text style={styles.textoBotaoFechar}>Voltar</Text>
            </Pressable>
          </View>
        </View>
      </Modal>

      {/* SELETOR MOTORISTA */}
      <Modal animationType="fade" transparent={true} visible={modalSeletorMotoristaVisivel} onRequestClose={() => setModalSeletorMotoristaVisivel(false)}>
        <View style={styles.subModalOverlay}>
          <View style={styles.subModalContent}>
            <Text style={styles.subModalTitle}>Selecione o Motorista</Text>
            <FlatList
              data={todosMotoristas}
              keyExtractor={(item) => (item._id || item.id || item.nome).toString()}
              renderItem={({ item }) => (
                <Pressable style={styles.itemSelecao} onPress={() => { setIdMotoristaSelecionado(item.nome); setModalSeletorMotoristaVisivel(false); }}>
                  <Text style={styles.itemSelecaoTexto}>{item.nome}</Text>
                </Pressable>
              )}
            />
            <Pressable style={styles.botaoCancelarSeletor} onPress={() => setModalSeletorMotoristaVisivel(false)}>
              <Text style={styles.textoBotaoFechar}>Voltar</Text>
            </Pressable>
          </View>
        </View>
      </Modal>

      {/* LISTA PRINCIPAL */}
      <View style={styles.searchContainer}>
        <Text style={styles.mainTitle}>Monitoramento de Frota</Text>
        <TextInput style={styles.searchInput} placeholder="Buscar rota ou motorista..." placeholderTextColor="#94A3B8" value={busca} onChangeText={setBusca} />
      </View>
     
      {carregando && listaRotas.length === 0 ? (
        <ActivityIndicator size="large" color="#1E40AF" style={{ marginTop: 40 }} />
      ) : (
        <FlatList  
          data={rotasFiltradas}
          keyExtractor={(item, index) => item._id?.toString() || item.id?.toString() || index.toString()}
          contentContainerStyle={styles.listContainer}
          showsVerticalScrollIndicator={false}
          refreshing={carregando}
          onRefresh={carregarDadosIniciais}
          ListHeaderComponent={<Text style={styles.sectionTitle}>Rotas Ativas ({rotasFiltradas.length})</Text>}
          renderItem={({ item }) => (
            <View style={styles.rotaCard}>
              <View style={styles.esquerdaCard}>
                <Text style={styles.rotaNome}>{item.nome}</Text>
                <Text style={styles.rotaInfo}>
                  <Text style={styles.boldText}>Veículo: </Text>
                  {typeof item.idOnibus === 'object' ? item.idOnibus?.placa : (item.idOnibus || item.onibus || 'Não informado')}
                </Text>
                <Text style={styles.rotaInfo}>
                  <Text style={styles.boldText}>Motorista: </Text>
                  {typeof item.idMotorista === 'object' ? item.idMotorista?.nome : (item.idMotorista || item.motorista || 'Não informado')}
                </Text>
                <View style={{ flexDirection: 'row', gap: 6, flexWrap: 'wrap', marginTop: 6 }}>
                  <View style={[styles.statusBadge, { backgroundColor: item.status === 'Atrasado' ? '#FEE2E2' : '#D1FAE5' }]}>
                    <Text style={[styles.statusText, { color: item.status === 'Atrasado' ? '#991B1B' : '#065F46' }]}>{item.status || 'Em andamento'}</Text>
                  </View>
                </View>
              </View>

              <View style={styles.direitaCard}>
                <Pressable style={styles.botaoAcao} onPress={() => verDetalhes(item)}><Text style={styles.textoBotaoAcao}>Detalhes</Text></Pressable>
                <Pressable style={styles.botaoEditar} onPress={() => iniciarEdicao(item)}><Text style={styles.textoBotaoEditar}>Editar</Text></Pressable>
                <Pressable style={[styles.botaoAcao, styles.botaoDeletar]} onPress={() => lidarComDeletar(item)}>
                  <Text style={styles.textoBotaoDeletar}>Excluir</Text>
                </Pressable>
              </View>
            </View>
          )}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F8FAFC' },
  searchContainer: { paddingTop: 40, paddingHorizontal: 16, paddingBottom: 16, backgroundColor: '#FFFFFF', borderBottomWidth: 1, borderColor: '#E2E8F0' },
  mainTitle: { fontSize: 22, fontWeight: '700', color: '#1E40AF', marginBottom: 12, textAlign: 'center' },
  searchInput: { backgroundColor: '#F1F5F9', color: '#1E293B', paddingHorizontal: 16, paddingVertical: 10, borderRadius: 8, fontSize: 15, borderWidth: 1, borderColor: '#E2E8F0' },
  listContainer: { paddingHorizontal: 16, paddingTop: 16, paddingBottom: 32 },
  sectionTitle: { fontSize: 16, fontWeight: '600', color: '#1E40AF', marginBottom: 12 },
  rotaCard: { flexDirection: 'row', backgroundColor: '#FFFFFF', borderRadius: 12, padding: 14, marginBottom: 12, alignItems: 'center', borderWidth: 1, borderColor: '#E2E8F0' },
  esquerdaCard: { flex: 1, paddingRight: 12 },
  rotaNome: { fontSize: 15, fontWeight: '700', color: '#1E293B', marginBottom: 6 },
  rotaInfo: { fontSize: 13, color: '#475569', marginBottom: 4 },
  boldText: { fontWeight: '600', color: '#1E293B' },
  statusBadge: { paddingHorizontal: 10, paddingVertical: 5, borderRadius: 6, alignSelf: 'flex-start' },
  statusText: { fontSize: 11, fontWeight: '700' },
  direitaCard: { flexDirection: 'column', width: 100, gap: 6 },
  botaoAcao: { backgroundColor: '#1E40AF', paddingVertical: 8, borderRadius: 6, alignItems: 'center', justifyContent: 'center' },
  textoBotaoAcao: { color: '#FFFFFF', fontSize: 12, fontWeight: '600' },
  botaoEditar: { backgroundColor: '#F1F5F9', paddingVertical: 8, borderRadius: 6, alignItems: 'center', justifyContent: 'center', borderWidth: 1, borderColor: '#CBD5E1' },
  textoBotaoEditar: { color: '#334155', fontSize: 12, fontWeight: '600' },
  botaoDeletar: { backgroundColor: '#FEF2F2', borderWidth: 1, borderColor: '#FCA5A5' },
  textoBotaoDeletar: { color: '#991B1B', fontSize: 12, fontWeight: '600' },
  modalOverlay: { flex: 1, backgroundColor: 'rgba(0, 0, 0, 0.5)', justifyContent: 'center', alignItems: 'center', padding: 20 },
  modalContent: { backgroundColor: '#FFFFFF', borderRadius: 16, padding: 20, width: '100%', maxWidth: 400 },
  modalTitle: { fontSize: 18, fontWeight: '700', color: '#1E40AF', marginBottom: 16, textAlign: 'center' },
  modalBody: { marginBottom: 20 },
  modalTextoLinha: { fontSize: 15, color: '#1E293B', marginBottom: 10 },
  modalTexto: { fontSize: 14, color: '#475569', marginBottom: 6 },
  divisor: { height: 1, backgroundColor: '#E2E8F0', marginVertical: 12 },
  modalTextoFin: { fontSize: 14, color: '#1E3A8A', fontWeight: '600', marginBottom: 6 },
  botaoFecharModal: { backgroundColor: '#1E40AF', paddingVertical: 12, borderRadius: 8, alignItems: 'center' },
  textoBotaoFechar: { color: '#FFFFFF', fontSize: 14, fontWeight: '600' },
  inputLabel: { fontSize: 12, fontWeight: '600', color: '#475569', marginBottom: 4, marginTop: 10 },
  modalInput: { backgroundColor: '#F8FAFC', borderWidth: 1, borderColor: '#CBD5E1', borderRadius: 6, paddingHorizontal: 12, paddingVertical: 8, color: '#1E293B', fontSize: 14 },
  seletorBotao: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#F8FAFC', borderWidth: 1, borderColor: '#CBD5E1', borderRadius: 6, paddingHorizontal: 12, paddingVertical: 10 },
  seletorBotaoTexto: { color: '#1E293B', fontSize: 14 },
  setaSeletor: { color: '#64748B', fontSize: 10 },
  subModalOverlay: { flex: 1, backgroundColor: 'rgba(0, 0, 0, 0.4)', justifyContent: 'flex-end' },
  subModalContent: { backgroundColor: '#FFFFFF', borderTopLeftRadius: 20, borderTopRightRadius: 20, padding: 20, maxHeight: '60%' },
  subModalTitle: { fontSize: 16, fontWeight: '700', color: '#1E293B', marginBottom: 14, textAlign: 'center' },
  itemSelecao: { paddingVertical: 14, borderBottomWidth: 1, borderColor: '#F1F5F9' },
  itemSelecaoTexto: { fontSize: 15, color: '#334155' },
  botaoCancelarSeletor: { backgroundColor: '#64748B', paddingVertical: 12, borderRadius: 8, alignItems: 'center', marginTop: 10 },
  mapContainer: { height: 300, borderRadius: 12, overflow: 'hidden', marginBottom: 12 },
});