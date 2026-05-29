import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from 'react-native';

const ocorrencias = [
  {
    id: '1',
    placa: 'ABC-1234',
    tipo: 'Pneu furado',
    status: 'Pendente',
    horario: '14:32',
  },

  {
    id: '2',
    placa: 'XYZ-5678',
    tipo: 'Atraso',
    status: 'Resolvido',
    horario: '13:10',
  },

  {
    id: '3',
    placa: 'KLM-9090',
    tipo: 'Falha mecânica',
    status: 'Em análise',
    horario: '12:45',
  },
];

export default function OcorrenciasScreen() {
  function obterCorStatus(status: string) {
    if (status === 'Pendente') {
      return '#F59E0B';
    }

    if (status === 'Resolvido') {
      return '#22C55E';
    }

    return '#3B82F6';
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        Ocorrências da Frota
      </Text>

      <FlatList
        data={ocorrencias}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <View style={styles.header}>
              <Text style={styles.placa}>
                {item.placa}
              </Text>

              <View
                style={[
                  styles.statusBadge,
                  {
                    backgroundColor:
                      obterCorStatus(item.status),
                  },
                ]}
              >
                <Text style={styles.statusText}>
                  {item.status}
                </Text>
              </View>
            </View>

            <Text style={styles.tipo}>
              {item.tipo}
            </Text>

            <Text style={styles.horario}>
              Horário: {item.horario}
            </Text>

            <TouchableOpacity
              style={styles.button}
            >
              <Text style={styles.buttonText}>
                Marcar como resolvido
              </Text>
            </TouchableOpacity>
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
    padding: 16,
  },

  title: {
    color: '#1E40AF',
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20,
  },

  card: {
    backgroundColor: '#F1F5F9',
    borderRadius: 10,
    padding: 16,
    marginBottom: 14,
  },

  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  placa: {
    color: '#1E40AF',
    fontSize: 18,
    fontWeight: 'bold',
  },

  statusBadge: {
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 8,
  },

  statusText: {
    color: '#FFF',
    fontWeight: 'bold',
    fontSize: 12,
  },

  tipo: {
    color: '#1E293B',
    marginTop: 12,
    fontSize: 16,
  },

  horario: {
    color: '#64748B',
    marginTop: 8,
    fontSize: 13,
  },

  button: {
    backgroundColor: '#1E40AF',
    padding: 12,
    borderRadius: 8,
    marginTop: 16,
    alignItems: 'center',
  },

  buttonText: {
    color: '#FFF',
    fontWeight: 'bold',
  },
});