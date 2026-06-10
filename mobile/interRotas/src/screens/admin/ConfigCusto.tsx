import { useState } from 'react';
import { View, Text, StyleSheet, TextInput, Pressable, FlatList, Alert } from 'react-native';

// Dados simulados de ônibus que estão estragados ou em revisão na oficina
const OnibusNaOficina = [
  { id: '1', onibus: 'ABC-1234', problema: 'Pneu Furado na Linha 101', entrada: 'Hoje, 14:30' },
  { id: '2', onibus: 'VWX-2345', problema: 'Troca de Óleo Agendada', entrada: 'Ontem, 17:00' },
];

export default function ConfigScreen() {
  const [precoDiesel, setPrecoDiesel] = useState('5.90');

  function salvarPreco() {
    if (!precoDiesel || isNaN(Number(precoDiesel.replace(',', '.')))) {
      Alert.alert('Erro', 'Por favor, digite um valor numérico válido.');
      return;
    }
    Alert.alert(
      'Sucesso', 
      `Preço do diesel atualizado para R$ ${precoDiesel} no sistema!`
    );
  }

  return (
    <View style={styles.container}>
      {/* CABEÇALHO */}
      <View style={styles.headerContainer}>
        <Text style={styles.mainTitle}>Painel de Configurações</Text>
      </View>

      <FlatList
        data={OnibusNaOficina}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
        
        // PARTE SUPERIOR DA TELA: Ajuste do Combustível
        ListHeaderComponent={
          <View style={styles.cardSecao}>
            <Text style={styles.secaoTitle}>⛽ Controle de Combustível</Text>
            <Text style={styles.descricao}>
              Defina o valor do litro do Diesel para atualizar o custo financeiro estimado das rotas em tempo real.
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
              />
            </View>

            <Pressable style={styles.botaoSalvar} onPress={salvarPreco}>
              <Text style={styles.textoBotao}>Atualizar Preço</Text>
            </Pressable>
          </View>
        }
        
        // PARTE DO MEIO: Título da área de manutenção
        ListEmptyComponent={
          <Text style={styles.vazioText}>Nenhum veículo na oficina no momento.</Text>
        }
        renderItem={({ item }) => (
          <View style={styles.oficinaCard}>
            <View style={styles.oficinaHeader}>
              <Text style={styles.oficinaPlaca}>🚌 Veículo: {item.onibus}</Text>
              <View style={styles.statusBadge}>
                <Text style={styles.statusText}>OFICINA</Text>
              </View>
            </View>
            <Text style={styles.oficinaDetalhe}>
              <Text style={styles.boldText}>Motivo: </Text>{item.problema}
            </Text>
            <Text style={styles.oficinaDetalhe}>
              <Text style={styles.boldText}>Entrada: </Text>{item.entrada}
            </Text>
          </View>
        )}
        
        // Título que fica entre a seção de combustível e a lista da oficina
        ListHeaderComponentStyle={{ marginBottom: 20 }}
        ListFooterComponent={
          <View style={{ height: 20 }} />
        }
        // Título inserido manualmente usando a lógica do FlatList para a lista abaixo
        ListHeaderComponent={
          <>
            <View style={styles.cardSecao}>
              <Text style={styles.secaoTitle}>⛽ Controle de Combustível</Text>
              <Text style={styles.descricao}>
                Defina o valor do litro do Diesel para atualizar o custo financeiro estimado das rotas em tempo real.
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
                />
              </View>

              <Pressable style={styles.botaoSalvar} onPress={salvarPreco}>
                <Text style={styles.textoBotao}>Atualizar Preço</Text>
              </Pressable>
            </View>

            <Text style={styles.secaoTitleLista}>🛠️ Gestão de Oficina ({OnibusNaOficina.length})</Text>
          </>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  headerContainer: {
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
    textAlign: 'center',
  },
  listContainer: {
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  cardSecao: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    marginBottom: 8,
  },
  secaoTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1E40AF',
    marginBottom: 8,
  },
  secaoTitleLista: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1E40AF',
    marginTop: 16,
    marginBottom: 12,
  },
  descricao: {
    fontSize: 13,
    color: '#64748B',
    lineHeight: 18,
    marginBottom: 16,
  },
  inputGroup: {
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#334155',
    marginBottom: 6,
  },
  input: {
    backgroundColor: '#F1F5F9',
    color: '#1E293B',
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderRadius: 8,
    fontSize: 15,
    borderWidth: 1,
    borderColor: '#CBD5E1',
  },
  botaoSalvar: {
    backgroundColor: '#1E40AF',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  textoBotao: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600',
  },
  oficinaCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 14,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#FFE4E6', // Borda levemente vermelha indicando oficina
  },
  oficinaHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  oficinaPlaca: {
    fontSize: 15,
    fontWeight: '700',
    color: '#1E293B',
  },
  statusBadge: {
    backgroundColor: '#FEF2F2',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: '#FCA5A5',
  },
  statusText: {
    color: '#991B1B',
    fontSize: 10,
    fontWeight: '700',
  },
  oficinaDetalhe: {
    fontSize: 13,
    color: '#475569',
    marginBottom: 3,
  },
  boldText: {
    fontWeight: '600',
    color: '#1E293B',
  },
  vazioText: {
    textAlign: 'center',
    color: '#64748B',
    marginTop: 20,
    fontSize: 14,
  }
});