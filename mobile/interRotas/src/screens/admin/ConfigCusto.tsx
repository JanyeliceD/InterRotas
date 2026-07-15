import { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, Pressable, FlatList, Alert, ActivityIndicator } from 'react-native';
import { salvarPrecoDieselBackend, buscarPrecoDieselBackend, buscarRelatorioConsumoBackend } from '../../services/configService';

interface RotaConsumo {
  id: string;
  nome: string;
  viagensNoMes: number;
  kmPorViagem: number;
  kmTotal: number;
  litrosConsumidos: number;
  custoTotal: number;
}

export default function ConfigScreen() {
  const [precoDiesel, setPrecoDiesel] = useState('5.90');
  const [listaConsumo, setListaConsumo] = useState<RotaConsumo[]>([]);
  const [carregando, setCarregando] = useState(false);

  
  async function carregarDadosIniciais() {
    try {
      setCarregando(true);
      
      const [dadosPreco, dadosConsumo] = await Promise.all([
        buscarPrecoDieselBackend(),
        buscarRelatorioConsumoBackend()
      ]);

      if (dadosPreco && typeof dadosPreco.precoDiesel !== 'undefined') {
        setPrecoDiesel(dadosPreco.precoDiesel.toString());
      }
      
      if (dadosConsumo) {
        setListaConsumo(dadosConsumo);
      }
    } catch (error) {
      console.log('Erro ao sincronizar com o Servidor:', error);
      setPrecoDiesel('5.90'); 
    } finally {
      setCarregando(false);
    }
  }

  useEffect(() => {
    carregarDadosIniciais();
  }, []);

  async function salvarPreco() {
    const precoFormatado = Number(precoDiesel.replace(',', '.'));

    if (!precoDiesel || isNaN(precoFormatado)) {
      Alert.alert('Erro', 'Por favor, digite um valor numérico válido.');
      return;
    }

    try {
      setCarregando(true);
      await salvarPrecoDieselBackend(precoFormatado);
      Alert.alert('Sucesso', `Preço atualizado para R$ ${precoFormatado.toFixed(2)}!`);
      
           await carregarDadosIniciais();
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível salvar o preço no servidor.');
      setCarregando(false);
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.mainTitle}>Painel de Configurações</Text>
      </View>

      <FlatList
        data={listaConsumo}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
        
        ListEmptyComponent={
          carregando ? null : <Text style={styles.vazioText}>Nenhuma rota cadastrada para calcular consumo.</Text>
        }
        
           renderItem={({ item }) => (
          <View style={styles.consumoCard}>
            <Text style={styles.rotaNome}>{item.nome}</Text>
            
            <View style={styles.divider} />
            
            <View style={styles.rowDados}>
              <Text style={styles.detalheLabel}>Viagens (Mês):</Text>
              <Text style={styles.detalheValor}>{item.viagensNoMes}x</Text>
            </View>
            
            <View style={styles.rowDados}>
              <Text style={styles.detalheLabel}>Distância Acumulada:</Text>
              <Text style={styles.detalheValor}>{item.kmTotal} Km</Text>
            </View>

            <View style={styles.rowDados}>
              <Text style={styles.detalheLabel}>Combustível Estimado:</Text>
              <Text style={styles.detalheValor}>{item.litrosConsumidos} L</Text>
            </View>

            <View style={[styles.rowDados, { marginTop: 6 }]}>
              <Text style={styles.custoLabel}>Gasto Financeiro:</Text>
              <Text style={styles.custoValor}>R$ {item.custoTotal.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</Text>
            </View>
          </View>
        )}
        
        ListHeaderComponent={
          <>
            <View style={styles.cardSecao}>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
                <Text style={styles.secaoTitle}>Controle de Combustível</Text>
                {carregando && <ActivityIndicator size="small" color="#1E40AF" />}
              </View>
              
              <Text style={styles.descricao}>
                Defina o valor do Diesel para recalcular o custo operacional total estimado das rotas nos últimos 30 dias.
              </Text>
              
              <View style={styles.inputGroup}>
                <Text style={styles.label}>Preço do Diesel (R$):</Text>
                <TextInput
                  style={styles.input}
                  keyboardType="numeric"
                  value={precoDiesel}
                  onChangeText={setPrecoDiesel}
                  placeholder="Ex: 5.90"
                  placeholderTextColor="#94A3B8"
                  editable={!carregando}
                />
              </View>

              <Pressable 
                style={[styles.botaoSalvar, carregando && { backgroundColor: '#94A3B8' }]} 
                onPress={salvarPreco}
                disabled={carregando}
              >
                <Text style={styles.textoBotao}>{carregando ? 'Calculando...' : 'Atualizar Preço & Recalcular'}</Text>
              </Pressable>
            </View>

            <Text style={styles.secaoTitleLista}>Estimativa de Despesa Mensal por Rota</Text>
          </>
        }
        ListFooterComponent={<View style={{ height: 30 }} />}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F8FAFC' },
  headerContainer: { paddingTop: 50, paddingHorizontal: 16, paddingBottom: 16, backgroundColor: '#FFFFFF', borderBottomWidth: 1, borderColor: '#E2E8F0' },
  mainTitle: { fontSize: 22, fontWeight: '700', color: '#1E40AF', textAlign: 'center' },
  listContainer: { paddingHorizontal: 16, paddingTop: 16 },
  cardSecao: { backgroundColor: '#FFFFFF', borderRadius: 12, padding: 16, borderWidth: 1, borderColor: '#E2E8F0', marginBottom: 8 },
  secaoTitle: { fontSize: 16, fontWeight: '700', color: '#1E40AF' },
  secaoTitleLista: { fontSize: 16, fontWeight: '700', color: '#1E40AF', marginTop: 24, marginBottom: 12 },
  descricao: { fontSize: 13, color: '#64748B', lineHeight: 18, marginBottom: 16 },
  inputGroup: { marginBottom: 16 },
  label: { fontSize: 14, fontWeight: '600', color: '#334155', marginBottom: 6 },
  input: { backgroundColor: '#F1F5F9', color: '#1E293B', paddingHorizontal: 12, paddingVertical: 10, borderRadius: 8, fontSize: 15, borderWidth: 1, borderColor: '#CBD5E1' },
  botaoSalvar: { backgroundColor: '#1E40AF', paddingVertical: 12, borderRadius: 8, alignItems: 'center', justifyContent: 'center' },
  textoBotao: { color: '#FFFFFF', fontSize: 14, fontWeight: '600' },
  vazioText: { textAlign: 'center', color: '#64748B', marginTop: 20, fontSize: 14 },
   consumoCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    shadowColor: '#0F172A',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  rotaNome: { fontSize: 15, fontWeight: '700', color: '#0F172A' },
  divider: { height: 1, backgroundColor: '#F1F5F9', marginVertical: 10 },
  rowDados: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 4 },
  detalheLabel: { fontSize: 13, color: '#64748B' },
  detalheValor: { fontSize: 13, fontWeight: '600', color: '#334155' },
  custoLabel: { fontSize: 14, fontWeight: '700', color: '#1E40AF' },
  custoValor: { fontSize: 15, fontWeight: '800', color: '#16A34A' }, 
});