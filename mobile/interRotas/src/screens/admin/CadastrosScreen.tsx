import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';

export default function CadastrosScreen({
  navigation,
}: any) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        Área de Cadastros
      </Text>

      <TouchableOpacity
        style={styles.card}
        onPress={() =>
          navigation.navigate('CadastrarOnibus')
        }
      >
        <Text style={styles.cardTitle}>
          Cadastrar Ônibus
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.card}
        onPress={() =>
          navigation.navigate('CadastrarRota')
        }
      >
        <Text style={styles.cardTitle}>
          Cadastrar Rota
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.card}
        onPress={() =>
          navigation.navigate(
            'CadastrarMotorista'
          )
        }
      >
        <Text style={styles.cardTitle}>
          Cadastrar Motorista
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
  },

  title: {
    color: '#FFF',
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 30,
  },

  card: {
    backgroundColor: '#0F172A',
    padding: 20,
    borderRadius: 10,
    marginBottom: 16,
  },

  cardTitle: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: '600',
  },
});