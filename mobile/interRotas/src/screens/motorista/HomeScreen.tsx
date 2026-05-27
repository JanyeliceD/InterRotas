import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';

export default function HomeScreen({
  navigation,
}: any) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        Área do Motorista
      </Text>

      <View style={styles.statusCard}>
        <Text style={styles.statusLabel}>
          Status Atual
        </Text>

        <Text style={styles.status}>
          Em operação
        </Text>
      </View>

      <View style={styles.ocorrenciaCard}>
        <Text style={styles.ocorrenciaTitle}>
          Última ocorrência
        </Text>

        <Text style={styles.ocorrenciaText}>
          Nenhuma ocorrência registrada.
        </Text>
      </View>

      <TouchableOpacity
        style={styles.button}
        onPress={() =>
          navigation.navigate('RegistrarOcorrencia')
        }
      >
        <Text style={styles.buttonText}>
          Registrar ocorrência
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1E293B',
    padding: 16,
    justifyContent: 'center',
  },

  title: {
    color: '#FFF',
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 30,
    textAlign: 'center',
  },

  statusCard: {
    backgroundColor: '#0F172A',
    padding: 20,
    borderRadius: 10,
    marginBottom: 16,
  },

  statusLabel: {
    color: '#94A3B8',
    fontSize: 14,
  },

  status: {
    color: '#22C55E',
    fontSize: 22,
    fontWeight: 'bold',
    marginTop: 8,
  },

  ocorrenciaCard: {
    backgroundColor: '#0F172A',
    padding: 20,
    borderRadius: 10,
    marginBottom: 30,
  },

  ocorrenciaTitle: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
  },

  ocorrenciaText: {
    color: '#CBD5E1',
  },

  button: {
    backgroundColor: '#2563EB',
    padding: 16,
    borderRadius: 10,
    alignItems: 'center',
  },

  buttonText: {
    color: '#FFF',
    fontWeight: 'bold',
    fontSize: 16,
  },
});