import { 
  View, 
  Text, 
  StyleSheet, 
  TextInput, 
  FlatList, 
  TouchableOpacity, 
  ActivityIndicator,
  Alert 
} from 'react-native';
import { useState, useEffect } from 'react';
import Mapa from '../../components/Mapa'; 
import { listarLocalizacoes, Localizacao } from '../../services/localizacaoService';
import { listarRotas, Rotas } from '../../services/rotaService'; 

export default function DashboardScreen() {
  const [busca, setBusca] = useState('');
  
  const [rotas, setRotas] = useState<Rotas[]>([]);
  const [carregando, setCarregando] = useState(true);

  const [todosOsOnibus, setTodosOsOnibus] = useState<Localizacao[]>([]);

  const buscarRotasDoBackend = async () => {
  try {
    setCarregando(true);
    const dados = await listarRotas();
    
    if (Array.isArray(dados)) {
      setRotas(dados);
    } else if (dados && typeof dados === 'object' && 'data' in dados && Array.isArray(dados.data)) {
      
      setRotas(dados.data);
    } else {
      setRotas([]); 
    }

  } catch (error) {
    console.error(error);
    Alert.alert('Erro', 'Não foi possível sincronizar as rotas com o servidor.');
  } finally {
    setCarregando(false);
  }
};
  useEffect(() => {
    buscarRotasDoBackend();
  }, []);

   const rotasFiltradas = rotas.filter((rota) =>  
    rota.nome?.toLowerCase().includes(busca.toLowerCase()) ||
    rota.idMotorista?.toLowerCase().includes(busca.toLowerCase())
  );

 
  useEffect(() => {
    carregarMapa();

    const intervalo = setInterval(() => {
      carregarMapa();
    }, 10000); 

    return () => clearInterval(intervalo);
  }, []);

  async function carregarMapa() {
    const dados = await listarLocalizacoes();

    setTodosOsOnibus(dados);
}

   if (carregando && rotas.length === 0) {
    return (
      <View style={[styles.container, { justifyContent: 'center', alignItems: 'center' }]}>
        <ActivityIndicator size="large" color="#1E40AF" />
        <Text style={{ marginTop: 12, color: '#475569', fontWeight: '500' }}>
          Conectando ao banco de dados...
        </Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      
      <View style={styles.searchContainer}>
        <Text style={styles.title}>Painel de Controle</Text>
        <TextInput
          style={styles.searchInput}
          placeholder='Buscar rota ou linha...'
          placeholderTextColor='#94A3B8'
          value={busca}
          onChangeText={setBusca}
        />
      </View>

      <View style={styles.mapContainer}>
         <Mapa 
          localizacoes={todosOsOnibus}
          mostrarOnibus={true}
          mostrarParadas={false}
          mostrarRota={false}
         />
      </View>
     
      <View style={styles.listSection}>
        <Text style={styles.listTitle}>Rotas Ativas ({rotasFiltradas.length})</Text>
        
        <FlatList
          data={rotasFiltradas}
          keyExtractor={(item, index) => item?._id?.toString() || item?.id?.toString() || index.toString()}
          contentContainerStyle={styles.listContainer}
          showsVerticalScrollIndicator={false}
          
           refreshing={carregando}
          onRefresh={buscarRotasDoBackend}
          
          renderItem={({ item }) => (
            <TouchableOpacity style={styles.rotaCard} activeOpacity={0.7}>
              
              <View style={styles.rotaInfo}>
                <Text style={styles.rotaNome} numberOfLines={1}>{item.nome}</Text>
                
                <Text style={styles.rotaDetalhe}>
                  <Text style={styles.boldText}>Veículo: </Text>{item.idOnibus}
                </Text>
                
                <Text style={styles.rotaDetalhe}>
                  <Text style={styles.boldText}>Motorista: </Text>{item.idMotorista}
                </Text>

                <Text style={styles.rotaDetalhe}>
                  <Text style={styles.boldText}>Odômetro: </Text>{item.quilometragem || 0} km
                </Text>

                {(item.quilometragem || 0) >= 5000 && (
                  <View style={styles.manutencaoBadge}>
                    <Text style={styles.manutencaoText}>REQUER TROCA DE ÓLEO</Text>
                  </View>
                )}
              </View>

              <View style={[
                styles.statusBadge, 
                { backgroundColor: item.status === 'Atrasado' ? '#FEE2E2' : '#D1FAE5' }
              ]}>
                <Text style={[
                  styles.statusText, 
                  { color: item.status === 'Atrasado' ? '#991B1B' : '#065F46' }
                ]}>
                  {item.status || 'Andamento'}
                </Text>
              </View>

            </TouchableOpacity>
          )}
        />
      </View>
    </View>
  );
} 

const styles = StyleSheet.create({
  mapContainer: {
    height: 200,
    width: '100%',
    flex: 1,
  },
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  searchContainer: {
    paddingTop: 44,
    paddingHorizontal: 16,
    paddingBottom: 16,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderColor: '#E2E8F0',
  },
  title: {
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
  listSection: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  listTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1E40AF',
    marginBottom: 12,
  },
  listContainer: {
    paddingBottom: 20,
  },
  rotaCard: {
    backgroundColor: '#FFFFFF',
    padding: 14,
    borderRadius: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  rotaInfo: {
    flex: 1,
    paddingRight: 8,
  },
  rotaNome: {
    color: '#1E293B',
    fontSize: 15,
    fontWeight: '700',
    marginBottom: 6,
  },
  rotaDetalhe: {
    color: '#475569',
    fontSize: 13,
    marginBottom: 2,
  },
  boldText: {
    fontWeight: '600',
    color: '#1E293B',
  },
  statusBadge: {
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 6,
    minWidth: 85, 
    alignItems: 'center',
    justifyContent: 'center',
  },
  statusText: {
    fontSize: 11,
    fontWeight: '700',
  },
  manutencaoBadge: {
    backgroundColor: '#FFF1F2',
    borderWidth: 1,
    borderColor: '#FFE4E6',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
    marginTop: 6,
    alignSelf: 'flex-start',
  },
  manutencaoText: {
    color: '#E11D48',
    fontSize: 10,
    fontWeight: '700',
  }
});