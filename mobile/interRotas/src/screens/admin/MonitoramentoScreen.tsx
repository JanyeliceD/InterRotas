import { Alert,View, Text,StyleSheet,TextInput,FlatList,TouchableOpacity,Dimensions,Pressable } from 'react-native';
import { useState } from 'react';
import MapView,{Marker} from 'react-native-maps';

const Rotas=[{ id: '1', nome: 'Linha 101 - Centro x Industrial', status: 'No Prazo', onibus: 'ABC-1234', lat: -23.55052, lng: -46.633308,motorista:'luiz' },
  { id: '2', nome: 'Linha 202 - Interbairros Norte', status: 'Atrasado', onibus: 'XYZ-5678', lat: -23.55552, lng: -46.639308,motorista:'joana' },
  { id: '3', nome: 'Linha 305 - Distrito Comercial', status: 'No Prazo', onibus: 'MNO-9012', lat: -23.54852, lng: -46.628308,motorista:'joana' },
 { id: '4', nome: 'Linha 404 - Bairro Novo', status: 'Atrasado', onibus: 'PQR-3456', lat: -23.55252, lng: -46.630308,motorista:'carlos' },
 { id: '5', nome: 'Linha 505 - Terminal Rodoviário', status: 'No Prazo', onibus: 'STU-7890', lat: -23.54952, lng: -46.632308,motorista:'ana' },
 { id: '6', nome: 'Linha 606 - Zona Sul', status: 'Atrasado', onibus: 'VWX-2345', lat: -23.55152, lng: -46.635308,motorista:'maria' },
{ id: '7', nome: 'Linha 707 - Aeroporto', status: 'No Prazo', onibus: 'YZA-6789', lat: -23.55352, lng: -46.631308,motorista:'pedro' },

];
export default function MonitoramentoScreen() {
  const [busca,setBusca]=useState('');

  const [listaRotas, setListarRotas] = useState(Rotas);
  function verDetalhes( item: typeof Rotas [0]) {
   Alert.alert(
      '📋 Detalhes da Rota',
      `📍 Rota: ${item.nome}\n\n🚌 Ônibus/Placa: ${item.onibus}\n\n👤 Motorista: ${item.motorista}\n\n⚠️ Status Atual: ${item.status}\n\n🌐 Coordenadas:\nLat: ${item.lat} | Lng: ${item.lng}`,
      [{ text: 'Fechar', style: 'cancel' }]
    );
  }


  function editarRota() {
    Alert.alert('Aviso', 'Abrindo a tela de edição...');
  }

  function removerRota() {
    Alert.alert('Aviso', 'Rota removida com sucesso!');
  }

  const rotasFiltradas=Rotas.filter((rota)=>  rota.nome.toLowerCase().includes(busca.toLowerCase()) ||
  rota.motorista.toLowerCase().includes(busca.toLowerCase())
  );

  return (
    <View style={styles.container}>
   

   
      <View style={styles.searchContainer}>
        <Text style={styles.title}>Monitoramento de Frota</Text>
        <TextInput
        style={styles.searchInput}
        placeholder='Buscar rota ou linha...'
        value={busca}
        onChangeText={setBusca}
        ></TextInput>
      </View>
     
          <View style={styles.listContainer}>
          <Text style={styles.listTitle}>Rotas Ativas ({rotasFiltradas.length})
          </Text>
         <FlatList  
          data={rotasFiltradas}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <TouchableOpacity style={styles.rotaCard}>
              <View style={[
                styles.statusBadge, 
                { backgroundColor: item.status === 'Atrasado' ? '#7F1D1D' : '#064E3B' }
              ]}>
                <Text style={styles.rotaNome}>{item.nome}</Text>
                <Text style={styles.rotaOnibus}>Veículo: {item.onibus}</Text>
                <Text style={styles.rotaOnibus}>Motorista: {item.motorista}</Text>
              </View>
              <View style={styles.direitaCard}>
                  <Pressable style={styles.botaoAcao} onPress={() => verDetalhes(item)}>
                    <Text style={styles.textoBotaoAcao}>🔍Detalhes</Text>
                  </Pressable>
                  
                  <Pressable style={styles.botaoAcao} onPress={editarRota}>
                    <Text style={styles.textoBotaoAcao}>✏️ Editar</Text>
                  </Pressable>
                  
                  <Pressable style={[styles.botaoAcao, styles.botaoDeletar]} onPress={removerRota}>
                    <Text style={styles.textoBotaoAcao}>🗑️ Excluir</Text>
                  </Pressable>
                </View>
            </TouchableOpacity>
          )}
        />
      </View>
     </View>
  );
} 

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f3f3f3', 
  },
  direitaCard: {
    flexDirection: 'column',
    gap: 6,
    minWidth: 105,
  },
  botaoAcao: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    paddingVertical: 6,
    borderRadius: 6,
    alignItems: 'center',
  },textoBotaoAcao: {
    color: '#FFF',
    fontSize: 12,
    fontWeight: 'bold',
  },
botaoDeletar: {
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
  },
  searchContainer: {
    paddingTop: 50,
    paddingHorizontal: 16,
    paddingBottom: 16,
    backgroundColor: '#ffffff',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000000',
    marginBottom: 12,
  },
  searchInput: {
    backgroundColor: '#334155',
    color: '#FFF',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 8,
    fontSize: 16,
  },
 
  mapContainer: {
    height: Dimensions.get('window').height * 0.35, 
    width: '100%',
    backgroundColor: '#334155', 
  },
  map: {
    flex: 1, 
    width: '100%',
    height: '100%',
  },
  listContainer: {
    flex: 1, 
    padding: 16,
    backgroundColor: '#0F172A',
  },
  listTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#94A3B8',
    marginBottom: 12,
    
  },
  rotaCard: {
    backgroundColor: '#0F172A',
    padding: 16,
    borderRadius: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  rotaInfo: {
    flex: 1,
  },
  rotaNome: {
    color: '#FFF',
    fontSize: 15,
    fontWeight: '600',
  },
  rotaOnibus: {
    color: '#94A3B8',
    fontSize: 13,
    marginTop: 4,
  },
  statusBadge: {
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 6,
  },
  statusText: {
    fontSize: 12,
    fontWeight: 'bold',
  },
});