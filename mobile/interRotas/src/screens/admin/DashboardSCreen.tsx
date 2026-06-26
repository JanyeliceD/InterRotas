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

// 1. Importa a função do serviço que criamos e a interface de tipagem
import { listarRotas, Rotas } from '../../services/rotaService'; // Ajuste o caminho da pasta se necessário

export default function DashboardScreen() {
  const [busca, setBusca] = useState('');
  
  // 2. Estados para armazenar as rotas vindas do BD e gerenciar o carregamento
  const [rotas, setRotas] = useState<Rotas[]>([]);
  const [carregando, setCarregando] = useState(true);

  // 3. Função que chama o serviço Axios
  const buscarRotasDoBackend = async () => {
  try {
    setCarregando(true);
    const dados = await listarRotas();
    
    // Altere esta linha para garantir que seja sempre um Array:
    if (Array.isArray(dados)) {
      setRotas(dados);
    } else if (dados && typeof dados === 'object' && 'data' in dados && Array.isArray(dados.data)) {
      // Caso o NestJS devolva algo como { data: [...] }
      setRotas(dados.data);
    } else {
      setRotas([]); // Evita que o app quebre se o banco vier vazio
    }

  } catch (error) {
    console.error(error);
    Alert.alert('Erro', 'Não foi possível sincronizar as rotas com o servidor.');
  } finally {
    setCarregando(false);
  }
};
  // 4. Executa a busca automaticamente ao montar a tela
  useEffect(() => {
    buscarRotasDoBackend();
  }, []);

  // O filtro agora varre a lista 'rotas' dinâmica preenchida pelo backend
  const rotasFiltradas = rotas.filter((rota) =>  
    rota.nome?.toLowerCase().includes(busca.toLowerCase()) ||
    rota.motorista?.toLowerCase().includes(busca.toLowerCase())
  );

  // Exibe tela de carregamento inicial enquanto o backend responde
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

      <View style={styles.mapContainer}></View>
     
      <View style={styles.listSection}>
        <Text style={styles.listTitle}>Rotas Ativas ({rotasFiltradas.length})</Text>
        
        <FlatList
          data={rotasFiltradas}
          keyExtractor={(item, index) => item?._id?.toString() || item?.id?.toString() || index.toString()}
          contentContainerStyle={styles.listContainer}
          showsVerticalScrollIndicator={false}
          
          // Recurso Pull-to-Refresh: arrastar para baixo atualiza os dados
          refreshing={carregando}
          onRefresh={buscarRotasDoBackend}
          
          renderItem={({ item }) => (
            <TouchableOpacity style={styles.rotaCard} activeOpacity={0.7}>
              
              <View style={styles.rotaInfo}>
                <Text style={styles.rotaNome} numberOfLines={1}>{item.nome}</Text>
                
                <Text style={styles.rotaDetalhe}>
                  <Text style={styles.boldText}>Veículo: </Text>{item.onibus}
                </Text>
                
                <Text style={styles.rotaDetalhe}>
                  <Text style={styles.boldText}>Motorista: </Text>{item.motorista}
                </Text>

                <Text style={styles.rotaDetalhe}>
                  <Text style={styles.boldText}>Odômetro: </Text>{item.quilometragem || 0} km
                </Text>

                {/* Validação baseada no dado numérico dinâmico */}
                {(item.quilometragem || 0) >= 5000 && (
                  <View style={styles.manutencaoBadge}>
                    <Text style={styles.manutencaoText}>⚠️ REQUER TROCA DE ÓLEO</Text>
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
    height: 120,
    width: '100%',
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