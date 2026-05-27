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
    backgroundColor: '#1E293B',
    padding: 16,
  },

  title: {
    color: '#FFF',
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20,
  },

  card: {
    backgroundColor: '#0F172A',
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
    color: '#FFF',
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
    color: '#CBD5E1',
    marginTop: 12,
    fontSize: 16,
  },

  horario: {
    color: '#94A3B8',
    marginTop: 8,
    fontSize: 13,
  },

  button: {
    backgroundColor: '#2563EB',
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