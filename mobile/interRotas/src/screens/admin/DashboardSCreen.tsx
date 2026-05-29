import {Image, View, Text, StyleSheet, TextInput, FlatList, TouchableOpacity, Dimensions } from 'react-native';
import { useState } from 'react';

const Rotas = [
  { id: '1', nome: 'Linha 101 - Centro x Industrial', status: 'Andamento', onibus: 'ABC-1234', lat: -23.55052, lng: -46.633308, motorista: 'luiz' },
  { id: '2', nome: 'Linha 202 - Interbairros Norte', status: 'Atrasado', onibus: 'XYZ-5678', lat: -23.55552, lng: -46.639308, motorista: 'joana' },
  { id: '3', nome: 'Linha 305 - Distrito Comercial', status: 'Andamento', onibus: 'MNO-9012', lat: -23.54852, lng: -46.628308, motorista: 'joana' },
  { id: '4', nome: 'Linha 404 - Bairro Novo', status: 'Atrasado', onibus: 'PQR-3456', lat: -23.55252, lng: -46.630308, motorista: 'carlos' },
  { id: '5', nome: 'Linha 505 - Terminal Rodoviário', status: 'Andamento', onibus: 'STU-7890', lat: -23.54952, lng: -46.632308, motorista: 'ana' },
  { id: '6', nome: 'Linha 606 - Zona Sul', status: 'Atrasado', onibus: 'VWX-2345', lat: -23.55152, lng: -46.635308, motorista: 'maria' },
  { id: '7', nome: 'Linha 707 - Aeroporto', status: 'Andamento', onibus: 'YZA-6789', lat: -23.55352, lng: -46.631308, motorista: 'pedro' },


];

export default function DashboardScreen() {
  const [busca, setBusca] = useState('');

  const rotasFiltradas = Rotas.filter((rota) =>  
    rota.nome.toLowerCase().includes(busca.toLowerCase()) ||
    rota.motorista.toLowerCase().includes(busca.toLowerCase())
  );

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
 
</View>
     
      <View style={styles.listSection}>
        <Text style={styles.listTitle}>Rotas Ativas ({rotasFiltradas.length})</Text>
        
        <FlatList
          data={rotasFiltradas}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.listContainer}
          showsVerticalScrollIndicator={false}
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
              </View>

          
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
});