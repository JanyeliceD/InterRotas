import { View, Text, StyleSheet, TextInput, FlatList, Pressable, Modal } from 'react-native';
import { useState } from 'react';

const RotasIniciais = [
  { id: '1', nome: 'Linha 101 - Centro x Industrial', status: 'No Prazo', onibus: 'ABC-1234', lat: -23.55052, lng: -46.633308, motorista: 'Luiz', quilometragem: 1200 },
  { id: '2', nome: 'Linha 202 - Interbairros Norte', status: 'Atrasado', onibus: 'XYZ-5678', lat: -23.55552, lng: -46.639308, motorista: 'Joana', quilometragem: 5400 },
  { id: '3', nome: 'Linha 305 - Distrito Comercial', status: 'No Prazo', onibus: 'MNO-9012', lat: -23.54852, lng: -46.628308, motorista: 'Joana', quilometragem: 3100 },
  { id: '4', nome: 'Linha 404 - Bairro Novo', status: 'Atrasado', onibus: 'PQR-3456', lat: -23.55252, lng: -46.630308, motorista: 'Carlos', quilometragem: 6200 },
  { id: '5', nome: 'Linha 505 - Terminal Rodoviário', status: 'No Prazo', onibus: 'STU-7890', lat: -23.54952, lng: -46.632308, motorista: 'Ana', quilometragem: 800 },
  { id: '6', nome: 'Linha 606 - Zona Sul', status: 'Atrasado', onibus: 'VWX-2345', lat: -23.55152, lng: -46.635308, motorista: 'Maria', quilometragem: 4900 },
  { id: '7', nome: 'Linha 707 - Aeroporto', status: 'No Prazo', onibus: 'YZA-6789', lat: -23.55352, lng: -46.631308, motorista: 'Pedro', quilometragem: 1500 },
];

export default function MonitoramentoScreen() {
  const [busca, setBusca] = useState('');
  const [listaRotas, setListaRotas] = useState(RotasIniciais);

  // ESTADOS DO MODAL: Controlam se a janela está aberta e qual rota foi clicada
  const [modalVisivel, setModalVisivel] = useState(false);
  const [rotaSelecionada, setRotaSelecionada] = useState<typeof RotasIniciais[0] | null>(null);

  const precoDiesel = 5.90; 
  const mediaKmL = 3.5;

  // 1. FUNÇÃO DETALHES (Agora ela abre o Modal em vez do Alert)
  function verDetalhes(item: typeof RotasIniciais[0]) {
    setRotaSelecionada(item);
    setModalVisivel(true);
  }

  // 2. FUNÇÃO EDITAR
  function editarRota(id: string) {
    setListaRotas(rotasAtuais => 
      rotasAtuais.map(rota => {
        if (rota.id === id) {
          return { ...rota, motorista: rota.motorista.includes('(Turno B)') ? rota.motorista.replace(' (Turno B)', '') : `${rota.motorista} (Turno B)` };
        }
        return rota;
      })
    );
  }

  // 3. FUNÇÃO REMOVER (Remove direto da lista para funcionar no PC sem travar)
  function removerRota(id: string) {
    setListaRotas(rotasAtuais => rotasAtuais.filter(rota => rota.id !== id));
  }

  const rotasFiltradas = listaRotas.filter((rota) => 
    rota.nome.toLowerCase().includes(busca.toLowerCase()) ||
    rota.motorista.toLowerCase().includes(busca.toLowerCase())
  );

  return (
    <View style={styles.container}>
      
      {/* CÓDIGO DO MODAL (A janela flutuante que vai aparecer no centro) */}
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisivel}
        onRequestClose={() => setModalVisivel(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>📋 Relatório da Rota</Text>
            
            {rotaSelecionada && (
              <View style={styles.modalBody}>
                <Text style={styles.modalTextoLinha}><Text style={styles.boldText}>Linha: </Text>{rotaSelecionada.nome}</Text>
                <Text style={styles.modalTexto}><Text style={styles.boldText}>Veículo: </Text>{rotaSelecionada.onibus}</Text>
                <Text style={styles.modalTexto}><Text style={styles.boldText}>Motorista: </Text>{rotaSelecionada.motorista}</Text>
                <Text style={styles.modalTexto}><Text style={styles.boldText}>📍 GPS: </Text>Lat {rotaSelecionada.lat} | Lng {rotaSelecionada.lng}</Text>
                
                <View style={styles.divisor} />
                
                <Text style={styles.modalTexto}><Text style={styles.boldText}>🛣️ Odômetro: </Text>{rotaSelecionada.quilometragem} km percorridos</Text>
                <Text style={styles.modalTexto}><Text style={styles.boldText}>⛽ Diesel Estimado: </Text>{(rotaSelecionada.quilometragem / mediaKmL).toFixed(1)} Litros</Text>
                <Text style={styles.modalTextoFin}><Text style={styles.boldText}>💰 Custo da Viagem: </Text>R$ {((rotaSelecionada.quilometragem / mediaKmL) * precoDiesel).toFixed(2)}</Text>
                
                <Text style={[styles.modalTexto, { color: rotaSelecionada.quilometragem >= 5000 ? '#E11D48' : '#059669' }]}>
                  Status de Manutenção: {rotaSelecionada.quilometragem >= 5000 ? '⚠️ REQUER TROCA DE ÓLEO' : '✅ REVISÃO EM DIA'}
                </Text>
              </View>
            )}

            <Pressable style={styles.botaoFecharModal} onPress={() => setModalVisivel(false)}>
              <Text style={styles.textoBotaoFechar}>Fechar Relatório</Text>
            </Pressable>
          </View>
        </View>
      </Modal>

      {/* LISTA PRINCIPAL */}
      <View style={styles.searchContainer}>
        <Text style={styles.mainTitle}>Monitoramento de Frota</Text>
        <TextInput
          style={styles.searchInput}
          placeholder="Buscar rota ou linha..."
          placeholderTextColor="#94A3B8"
          value={busca}
          onChangeText={setBusca}
        />
      </View>
     
      <FlatList  
        data={rotasFiltradas}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={
          <Text style={styles.sectionTitle}>Rotas Ativas ({rotasFiltradas.length})</Text>
        }
        renderItem={({ item }) => (
          <View style={styles.rotaCard}>
            
            <View style={styles.esquerdaCard}>
              <Text style={styles.rotaNome}>{item.nome}</Text>
              
              <Text style={styles.rotaInfo}>
                <Text style={styles.boldText}>Veículo: </Text>{item.onibus}
              </Text>
              <Text style={styles.rotaInfo}>
                <Text style={styles.boldText}>Motorista: </Text>{item.motorista}
              </Text>
              <Text style={styles.rotaInfo}>
                <Text style={styles.boldText}>Odômetro: </Text>{item.quilometragem} km
              </Text>

              <View style={{ flexDirection: 'row', gap: 6, flexWrap: 'wrap', marginTop: 6 }}>
                <View style={[
                  styles.statusBadge, 
                  { backgroundColor: item.status === 'Atrasado' ? '#FEE2E2' : '#D1FAE5' }
                ]}>
                  <Text style={[styles.statusText, { color: item.status === 'Atrasado' ? '#991B1B' : '#065F46' }]}>
                    {item.status}
                  </Text>
                </View>

                {item.quilometragem >= 5000 && (
                  <View style={styles.manutencaoBadge}>
                    <Text style={styles.manutencaoText}>⚠️ TROCA DE ÓLEO</Text>
                  </View>
                )}
              </View>
            </View>

            <View style={styles.direitaCard}>
              <Pressable style={styles.botaoAcao} onPress={() => verDetalhes(item)}>
                <Text style={styles.textoBotaoAcao}>Detalhes</Text>
              </Pressable>
              
              <Pressable style={styles.botaoEditar} onPress={() => editarRota(item.id)}>
                <Text style={styles.textoBotaoEditar}>Editar</Text>
              </Pressable>
              
              <Pressable style={[styles.botaoAcao, styles.botaoDeletar]} onPress={() => removerRota(item.id)}>
                <Text style={styles.textoBotaoDeletar}>Excluir</Text>
              </Pressable>
            </View>

          </View>
        )}
      />
    </View>
  );
} 

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC', 
  },
  searchContainer: {
    paddingTop: 40,
    paddingHorizontal: 16,
    paddingBottom: 16,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderColor: '#E2E8F0',
  },
  mainTitle: {
    fontSize: 22,
    fontWeight: '700',
    color: '#1E40AF', 
    marginBottom: 12,
    textAlign: 'center',
  },
  searchInput: {
    backgroundColor: '#F1F5F9', 
    color: '#1E293B',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 8,
    fontSize: 15,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  listContainer: {
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 32,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1E40AF',
    marginBottom: 12,
  },
  rotaCard: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF', 
    borderRadius: 12,
    padding: 14,
    marginBottom: 12,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  esquerdaCard: {
    flex: 1,
    paddingRight: 12,
  },
  rotaNome: {
    fontSize: 15,
    fontWeight: '700',
    color: '#1E293B',
    marginBottom: 6,
  },
  rotaInfo: {
    fontSize: 13,
    color: '#475569',
    marginBottom: 4,
  },
  boldText: {
    fontWeight: '600',
    color: '#1E293B',
  },
  statusBadge: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 6,
    alignSelf: 'flex-start', 
  },
  statusText: {
    fontSize: 11,
    fontWeight: '700',
  },
  manutencaoBadge: {
    backgroundColor: '#FEF2F2',
    borderWidth: 1,
    borderColor: '#FCA5A5',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
    alignSelf: 'flex-start',
  },
  manutencaoText: {
    color: '#991B1B',
    fontSize: 10,
    fontWeight: '700',
  },
  direitaCard: {
    flexDirection: 'column',
    width: 100, 
    gap: 6, 
  },
  botaoAcao: {
    backgroundColor: '#1E40AF', 
    paddingVertical: 8,
    borderRadius: 6,
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer' as any,
  },
  textoBotaoAcao: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '600',
  },
  botaoEditar: {
    backgroundColor: '#F1F5F9',
    paddingVertical: 8,
    borderRadius: 6,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#CBD5E1',
    cursor: 'pointer' as any,
  },
  textoBotaoEditar: {
    color: '#334155',
    fontSize: 12,
    fontWeight: '600',
  },
  botaoDeletar: {
    backgroundColor: '#FEF2F2', 
    borderWidth: 1,
    borderColor: '#FCA5A5',
  },
  textoBotaoDeletar: {
    color: '#991B1B', 
    fontSize: 12,
    fontWeight: '600',
  },

  // ESTILOS NOVOS DO MODAL (JANELA FLUTUANTE)
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Escurece o fundo
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  modalContent: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    width: '100%',
    maxWidth: 400, // Não deixa ficar gigante no PC
    boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1E40AF',
    marginBottom: 16,
    textAlign: 'center',
  },
  modalBody: {
    marginBottom: 20,
  },
  modalTextoLinha: {
    fontSize: 15,
    color: '#1E293B',
    marginBottom: 10,
  },
  modalTexto: {
    fontSize: 14,
    color: '#475569',
    marginBottom: 6,
  },
  divisor: {
    height: 1,
    backgroundColor: '#E2E8F0',
    marginVertical: 12,
  },
  modalTextoFin: {
    fontSize: 14,
    color: '#1E3A8A',
    fontWeight: '600',
    marginBottom: 6,
  },
  
  botaoFecharModal: {
    backgroundColor: '#1E40AF',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    cursor: 'pointer' as any,
  },
  textoBotaoFechar: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600',
  },
});