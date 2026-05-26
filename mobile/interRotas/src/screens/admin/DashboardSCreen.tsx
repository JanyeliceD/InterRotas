import { View, Text,StyleSheet,TextInput,FlatList,TouchableOpacity,Dimensions,Pressable } from 'react-native';
import { useState } from 'react';
import MapView,{Marker} from 'react-native-maps';

const Rotas=[{ id: '1', nome: 'Linha 101 - Centro x Industrial', status: 'No Prazo', onibus: 'ABC-1234', lat: -23.55052, lng: -46.633308,motorista:'luiz' },
  { id: '2', nome: 'Linha 202 - Interbairros Norte', status: 'Atrasado', onibus: 'XYZ-5678', lat: -23.55552, lng: -46.639308,motorista:'joana' },
  { id: '3', nome: 'Linha 305 - Distrito Comercial', status: 'No Prazo', onibus: 'MNO-9012', lat: -23.54852, lng: -46.628308,motorista:'joana' },
];
export default function DashboardScreen() {
  const [busca,setBusca]=useState('');

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
     
       <View style={styles.mapContainer}>
          
      
      </View>
          <View style={styles.listContainer}>
          <Text style={styles.listTitle}>Rotas Ativas ({rotasFiltradas.length})
          </Text>
         <FlatList
          data={rotasFiltradas}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <TouchableOpacity style={styles.rotaCard}>
              <View style={styles.rotaInfo}>
                <Text style={styles.rotaNome}>{item.nome}</Text>
                <Text style={styles.rotaOnibus}>Veículo: {item.onibus}</Text>
                <Text style={styles.rotaOnibus}>Motorista: {item.motorista}</Text>
              </View>
              <View style={[
                styles.statusBadge, 
                { backgroundColor: item.status === 'Atrasado' ? '#7F1D1D' : '#064E3B' }
              ]}>
                <Text style={[
                  styles.statusText, 
                  { color: item.status === 'Atrasado' ? '#FCA5A5' : '#6EE7B7' }
                ]}>{item.status}</Text>
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
    backgroundColor: '#1E293B', 
  },
  searchContainer: {
    paddingTop: 50,
    paddingHorizontal: 16,
    paddingBottom: 16,
    backgroundColor: '#0F172A',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFF',
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
    backgroundColor: '#1E293B',
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