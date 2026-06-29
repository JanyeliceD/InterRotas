import { View, Text, StyleSheet, TextInput, FlatList, Pressable, Modal, ActivityIndicator, Alert } from 'react-native';
import { useState, useEffect } from 'react';

// IMPORTAÇÃO DOS SEUS SERVIÇOS E TIPOS
import { listarRotas, atualizarRota, deletarRota, Rotas } from '../../services/rotaService'; 
import { listarMotoristas, Motorista } from '../../services/motoristaService';
import { listarOnibus, Onibus } from '../../services/onibusService';

export default function MonitoramentoScreen() {
  const [busca, setBusca] = useState('');
  const [listaRotas, setListaRotas] = useState<Rotas[]>([]);
  const [carregando, setCarregando] = useState(true);

  // LISTAS AUXILIARES VINDAS DO BANCO DE DADOS
  const [todosOnibus, setTodosOnibus] = useState<Onibus[]>([]);
  const [todosMotoristas, setTodosMotoristas] = useState<Motorista[]>([]);

  // ESTADOS DO MODAL DE DETALHES (RELATÓRIO)
  const [modalDetalhesVisivel, setModalDetalhesVisivel] = useState(false);
  const [rotaSelecionada, setRotaSelecionada] = useState<Rotas | null>(null);

  // ESTADOS DO MODAL DE EDIÇÃO
  const [modalEditarVisivel, setModalEditarVisivel] = useState(false);
  const [idEditando, setIdEditando] = useState('');
  const [nomeEditando, setNomeEditando] = useState('');
  const [idOnibusSelecionado, setIdOnibusSelecionado] = useState('');
  const [idMotoristaSelecionado, setIdMotoristaSelecionado] = useState('');

  // ESTADOS DOS SUB-MODAIS DE SELEÇÃO (PICKERS)
  const [modalSeletorOnibusVisivel, setModalSeletorOnibusVisivel] = useState(false);
  const [modalSeletorMotoristaVisivel, setModalSeletorMotoristaVisivel] = useState(false);

  const precoDiesel = 5.90; 
  const mediaKmL = 3.5;

  // Busca todos os dados necessários do backend simultaneamente
  const carregarDadosIniciais = async () => {
    try {
      setCarregando(true);
      
      const dadosRotas = await listarRotas();
      setListaRotas(Array.isArray(dadosRotas) ? dadosRotas : (dadosRotas.data || []));

      const dadosOnibus = await listarOnibus();
      setTodosOnibus(Array.isArray(dadosOnibus) ? dadosOnibus : (dadosOnibus.data || []));

      const dadosMotoristas = await listarMotoristas();
      setTodosMotoristas(Array.isArray(dadosMotoristas) ? dadosMotoristas : (dadosMotoristas.data || []));

    } catch (error) {
      Alert.alert('Erro', 'Não foi possível carregar os dados do servidor.');
    } finally {
      setCarregando(false);
    }
  };

  useEffect(() => {
    carregarDadosIniciais();
  }, []);

  // Mapeia dinamicamente o objeto para exibição do texto no seletor com base no ID
  const onibusAtual = todosOnibus.find(o => (o._id || o.id) === idOnibusSelecionado);
  const motoristaAtual = todosMotoristas.find(m => (m._id || m.id) === idMotoristaSelecionado);

  // Filtro de busca inteligente e à prova de quebras por tipos de dados híbridos
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
    
    setIdOnibusSelecionado(item.idOnibus?._id || item.idOnibus || '');
    setIdMotoristaSelecionado(item.idMotorista?._id || item.idMotorista || '');
    
    setModalEditarVisivel(true);
  }

async function lidarComDeletar(id: string) {
    console.log('====== INICIANDO PROCESSO DE EXCLUSÃO ======');
    console.log('ID enviado para o Service:', id);

    if (!id) {
      console.log('🛑 Erro: ID não foi fornecido.');
      return;
    }

    try {
      setCarregando(true);
      
      // Chama o backend direto para testar a rota
      const resposta = await deletarRota(id); 
      console.log('🟢 RESPOSTA DO SERVIDOR COM SUCESSO:', resposta);

      // Atualiza o estado na tela
      setListaRotas((rotasAtuais) => 
        rotasAtuais.filter(rota => {
          const rId = rota._id?.toString() || rota.id?.toString();
          return rId !== id;
        })
      );
      
      Alert.alert("Sucesso", "Rota excluída com sucesso!");
    } catch (error: any) {
      console.log('🛑 ERRO DETECTADO NA REQUISIÇÃO:');
      
      if (error.response) {
        console.log('Status do erro do Backend:', error.response.status);
        console.log('Corpo do erro do Backend:', error.response.data);
      } else if (error.request) {
        console.log('A requisição foi feita mas não houve resposta do servidor (Sem conexão).');
      } else {
        console.log('Erro de configuração do Axios:', error.message);
      }
    } finally {
      setCarregando(false);
      await carregarDadosIniciais();
    }
  }
  async function salvarAlteracoesBackend() {
    const nomeDoMotoristaEscolhido = todosMotoristas.find(m => (m._id || m.id) === idMotoristaSelecionado)?.nome || '';
    const placaDoOnibusEscolhido = todosOnibus.find(o => (o._id || o.id) === idOnibusSelecionado)?.placa || '';

    if (!nomeEditando || !placaDoOnibusEscolhido || !nomeDoMotoristaEscolhido) {
      Alert.alert('Erro', 'Por favor, selecione o ônibus e o motorista.');
      return;
    }

    try {
      setCarregando(true);

      // Envia as strings brutas para o backend salvar diretamente na rota
      await atualizarRota(idEditando, {
        nome: nomeEditando,
        idOnibus: placaDoOnibusEscolhido,     
        idMotorista: nomeDoMotoristaEscolhido  
      });

      Alert.alert('Sucesso', 'Rota atualizada com sucesso!');
      setModalEditarVisivel(false);
      await carregarDadosIniciais();
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível salvar.');
    } finally {
      setCarregando(false);
    }
  }

  return (
    <View style={styles.container}>
      
      {/* 1. MODAL DE VISUALIZAR DETALHES (RELATÓRIO) */}
      <Modal animationType="fade" transparent={true} visible={modalDetalhesVisivel} onRequestClose={() => setModalDetalhesVisivel(false)}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>📋 Relatório da Rota</Text>
            {rotaSelecionada && (
              <View style={styles.modalBody}>
                <Text style={styles.modalTextoLinha}><Text style={styles.boldText}>Linha: </Text>{rotaSelecionada.nome}</Text>
                <Text style={styles.modalTexto}>
                  <Text style={styles.boldText}>Veículo/Placa: </Text>
                  {typeof rotaSelecionada.idOnibus === 'object' ? rotaSelecionada.idOnibus?.placa : (rotaSelecionada.idOnibus || rotaSelecionada.onibus || 'Não informado')}
                </Text>
                <Text style={styles.modalTexto}>
                  <Text style={styles.boldText}>Motorista: </Text>
                  {typeof rotaSelecionada.idMotorista === 'object' ? rotaSelecionada.idMotorista?.nome : (rotaSelecionada.idMotorista || rotaSelecionada.motorista || 'Não informado')}
                </Text>
                <View style={styles.divisor} />
                <Text style={styles.modalTexto}><Text style={styles.boldText}>🛣️ Odômetro: </Text>{rotaSelecionada.quilometragem || 0} km</Text>
                <Text style={styles.modalTexto}><Text style={styles.boldText}>⛽ Diesel Estimado: </Text>{((rotaSelecionada.quilometragem || 0) / mediaKmL).toFixed(1)} L</Text>
                <Text style={styles.modalTextoFin}><Text style={styles.boldText}>💰 Custo Total: </Text>R$ {(((rotaSelecionada.quilometragem || 0) / mediaKmL) * precoDiesel).toFixed(2)}</Text>
              </View>
            )}
            <Pressable style={styles.botaoFecharModal} onPress={() => setModalDetalhesVisivel(false)}>
              <Text style={styles.textoBotaoFechar}>Fechar</Text>
            </Pressable>
          </View>
        </View>
      </Modal>

      {/* 2. MODAL DE EDIÇÃO PRINCIPAL */}
      <Modal animationType="slide" transparent={true} visible={modalEditarVisivel} onRequestClose={() => setModalEditarVisivel(false)}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>📝 Editar Rota</Text>

            <Text style={styles.inputLabel}>Nome da Linha</Text>
            <TextInput style={styles.modalInput} value={nomeEditando} onChangeText={setNomeEditando} />

            {/* SELETOR DE ÔNIBUS */}
            <Text style={styles.inputLabel}>Selecionar Ônibus (Placa)</Text>
            <Pressable style={styles.seletorBotao} onPress={() => setModalSeletorOnibusVisivel(true)}>
              <Text style={styles.seletorBotaoTexto}>
                {onibusAtual ? `${onibusAtual.placa} (${onibusAtual.modelo || ''})` : 'Escolha um veículo...'}
              </Text>
              <Text style={styles.setaSeletor}>▼</Text>
            </Pressable>

            {/* SELETOR DE MOTORISTA */}
            <Text style={styles.inputLabel}>Selecionar Motorista</Text>
            <Pressable style={styles.seletorBotao} onPress={() => setModalSeletorMotoristaVisivel(true)}>
              <Text style={styles.seletorBotaoTexto}>
                {motoristaAtual ? motoristaAtual.nome : 'Escolha um motorista...'}
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

      {/* SUB-MODAL: SELEÇÃO DE ÔNIBUS */}
      <Modal animationType="fade" transparent={true} visible={modalSeletorOnibusVisivel}>
        <View style={styles.subModalOverlay}>
          <View style={styles.subModalContent}>
            <Text style={styles.subModalTitle}>Selecione o Veículo</Text>
            <FlatList
              data={todosOnibus}
              keyExtractor={(item) => (item._id || item.id).toString()}
              renderItem={({ item }) => (
                <Pressable style={styles.itemSelecao} onPress={() => { setIdOnibusSelecionado(item._id || item.id); setModalSeletorOnibusVisivel(false); }}>
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

      {/* SUB-MODAL: SELEÇÃO DE MOTORISTAS */}
      <Modal animationType="fade" transparent={true} visible={modalSeletorMotoristaVisivel}>
        <View style={styles.subModalOverlay}>
          <View style={styles.subModalContent}>
            <Text style={styles.subModalTitle}>Selecione o Motorista</Text>
            <FlatList
              data={todosMotoristas}
              keyExtractor={(item) => (item._id || item.id).toString()}
              renderItem={({ item }) => (
                <Pressable style={styles.itemSelecao} onPress={() => { setIdMotoristaSelecionado(item._id || item.id); setModalSeletorMotoristaVisivel(false); }}>
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

      {/* LISTA PRINCIPAL DE MONITORAMENTO */}
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
<Pressable 
  style={[styles.botaoAcao, styles.botaoDeletar]} 
  onPress={() => {
    // Garante extrair o ID correto independente de vir do MongoDB (_id) ou mapeado (id)
    const idRota = item._id?.toString() || item.id?.toString() || '';
    lidarComDeletar(idRota);
  }}
>
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
  botaoCancelarSeletor: { backgroundColor: '#64748B', paddingVertical: 12, borderRadius: 8, alignItems: 'center', marginTop: 10 }
});