import { Alert, View, Text, StyleSheet, TextInput, FlatList, Pressable } from 'react-native';
import { useState } from 'react';

const Rotas = [
  { id: '1', nome: 'Linha 101 - Centro x Industrial', status: 'No Prazo', onibus: 'ABC-1234', lat: -23.55052, lng: -46.633308, motorista: 'luiz' },
  { id: '2', nome: 'Linha 202 - Interbairros Norte', status: 'Atrasado', onibus: 'XYZ-5678', lat: -23.55552, lng: -46.639308, motorista: 'joana' },
  { id: '3', nome: 'Linha 305 - Distrito Comercial', status: 'No Prazo', onibus: 'MNO-9012', lat: -23.54852, lng: -46.628308, motorista: 'joana' },
  { id: '4', nome: 'Linha 404 - Bairro Novo', status: 'Atrasado', onibus: 'PQR-3456', lat: -23.55252, lng: -46.630308, motorista: 'carlos' },
  { id: '5', nome: 'Linha 505 - Terminal Rodoviário', status: 'No Prazo', onibus: 'STU-7890', lat: -23.54952, lng: -46.632308, motorista: 'ana' },
  { id: '6', nome: 'Linha 606 - Zona Sul', status: 'Atrasado', onibus: 'VWX-2345', lat: -23.55152, lng: -46.635308, motorista: 'maria' },
  { id: '7', nome: 'Linha 707 - Aeroporto', status: 'No Prazo', onibus: 'YZA-6789', lat: -23.55352, lng: -46.631308, motorista: 'pedro' },
];

export default function MonitoramentoScreen() {
  const [busca, setBusca] = useState('');

  function verDetalhes(item: typeof Rotas[0]) {
    Alert.alert(
      'Detalhes da Rota',
    );
  }

  function editarRota() {
    Alert.alert('Aviso', 'Abrindo a tela de edição...');
  }

  function removerRota() {
    Alert.alert('Aviso', 'Rota removida com sucesso!');
  }

  const rotasFiltradas = Rotas.filter((rota) => 
    rota.nome.toLowerCase().includes(busca.toLowerCase()) ||
    rota.motorista.toLowerCase().includes(busca.toLowerCase())
  );

  return (
    <View style={styles.container}>
      
     
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

          
              <View style={[
                styles.statusBadge, 
                { backgroundColor: item.status === 'Atrasado' ? '#FEE2E2' : '#D1FAE5' }
              ]}>
                <Text style={[
                  styles.statusText,
                  { color: item.status === 'Atrasado' ? '#991B1B' : '#065F46' }
                ]}>
                  {item.status}
                </Text>
              </View>
            </View>

        
            <View style={styles.direitaCard}>
              <Pressable style={styles.botaoAcao} onPress={() => verDetalhes(item)}>
                <Text style={styles.textoBotaoAcao}> Detalhes</Text>
              </Pressable>
              
              <Pressable style={styles.botaoAcao} onPress={editarRota}>
                <Text style={styles.textoBotaoAcao}> Editar</Text>
              </Pressable>
              
              <Pressable style={styles.botaoAcao} onPress={removerRota}>
                <Text style={styles.textoBotaoAcao}>Excluir</Text>
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
    color: '#1e40af',
    marginBottom: 12,
  },
  rotaCard: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF', 
    borderRadius: 12,
    padding: 14,
    marginBottom: 12,
    alignItems: 'center',
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
    marginTop:6,
  },
  statusText: {
    fontSize: 12,
    fontWeight: '700',
  },
  
 
  direitaCard: {
    flexDirection: 'column',
    width: 110, 
    gap: 6, 
  },
  botaoAcao: {
    backgroundColor: '#1E40AF', 
    paddingVertical: 8,
    borderRadius: 6,
    alignItems: 'center',
    justifyContent: 'center',
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
  },
  textoBotaoEditar: {
    color: '#334155',
    fontSize: 12,
    fontWeight: '600',
  },
  botaoDeletar: {
    backgroundColor: '#FEF2F2', 
    borderRadius: 6,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#FCA5A5',
  },
  textoBotaoDeletar: {
    color: '#991B1B', 
    fontSize: 12,
    fontWeight: '600',
  },
});