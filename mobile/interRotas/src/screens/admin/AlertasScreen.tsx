import { Alert,View, Text,StyleSheet,TextInput,FlatList,TouchableOpacity,Dimensions,Pressable } from 'react-native';
import { useState } from 'react';


interface Alerta {
    id: string,
    titulo: string,
    descricao: string,
    data: string,
    status: 'Atrasado'| 'Ação Tomada';
    ciente?:boolean;
}
const AlertasIniciais:Alerta[]=[{
    id:'1',
    titulo:'Rota 101 atrasada',
    descricao:'A rota 101 - Centro x Industrial está com atraso de 15 minutos devido ao trânsito intenso.',
    data:'2024-06-15 14:30',
    status:'Atrasado'
},

{id:'3',
    titulo:'Rota 305 atrasada',
    descricao:'A rota 305 - Distrito Comercial está com atraso de 10 minutos devido a um acidente na via.',
    data:'2024-06-15 14:30',
    status:'Atrasado'
},
];
export default function AlertasScreen() {
    
    const [Alertas,setAlertas] = useState<Alerta[]>(AlertasIniciais)


    function Ciente(id: string) {
        setAlertas(prevState => prevState.map(alerta =>
            alerta.id === id ? {...alerta, ciente: true}: alerta
        ));
        Alert.alert('Alerta Ciente', `Você marcou o alerta como ciente.`, [
         
        ]);
      }
      function ProvidenciarAção(id: string, titulo:string) {
        setAlertas (prevState => prevState.map(alerta =>
            alerta.id === id ? { ... alerta, status:'Ação Tomada'}: alerta
        )) 
        
        Alert.alert('Ação Providenciada', 'A equipe de manutenção foi acionada para resolver o problema.', [
          
        ]);
      }
    return (
         <View style={styles.listContainer}>
                  <Text style={styles.listTitle}>Alertas ({Alertas.length})
                  </Text>
                 <FlatList  
                  data={Alertas}
                  keyExtractor={(item) => item.id}
                  renderItem={({ item }) => (
                    <TouchableOpacity style={styles.rotaCard}>
                      <View style={[
                        styles.statusBadge, 
                        { backgroundColor: item.status === 'Atrasado' ? '#7F1D1D' : '#064E3B' }
                      ]}>
                        <Text style={styles.rotaNome}>{item.titulo}</Text>
                        <Text style={styles.rotaOnibus}>Descrição: {item.descricao}</Text>
                        <Text style={styles.rotaOnibus}>Data: {item.data}</Text>
                        <Text style={styles.rotaOnibus}>Status: {item.status}</Text>
                      </View>
                      <View  style={styles.botoes}>
                          <Pressable style={styles.botoes}  onPress={() => Ciente(item.id)}
                            disabled= {item.ciente}>
                            <Text >Ciente</Text>
                          </Pressable>
                          
                          <Pressable style={styles.botoes} onPress={() => ProvidenciarAção(item.id, item.titulo)}
                            >
                            <Text >Providenciar Ação</Text>
                          </Pressable>
                        
                        </View>
                    </TouchableOpacity>
                  )}
                />
              </View>
    )
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
  
  botoes: {
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 6,
    marginLeft: 8,
    alignItems: 'center',
    justifyContent: 'center',
    color: '#FFF',
    borderColor: '#94A3B8',
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