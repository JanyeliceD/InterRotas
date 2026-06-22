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
      <Text style={styles.titulo}>
        Área de Cadastros
      </Text>

      <TouchableOpacity
        style={styles.card}
        onPress={() => navigation.navigate('CadastrarOnibus')}
      >
        <Text style={styles.cardTitulo}>
          Cadastrar Ônibus
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.card}
        onPress={() => navigation.navigate('CadastrarParada')}
      >
        <Text style={styles.cardTitulo}>
          Cadastrar Parada
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.card}
        onPress={() => navigation.navigate('CadastrarRota')}
      >
        <Text style={styles.cardTitulo}>
          Cadastrar Rota
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.card}
        onPress={() => navigation.navigate('CadastrarMotorista')}
      >
        <Text style={styles.cardTitulo}>
          Cadastrar Motorista
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
    padding: 16,
  },

  titulo: {
    color: '#1E40AF',
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 30,
  },

  card: {
    backgroundColor: '#F1F5F9',
    padding: 20,
    borderRadius: 10,
    marginBottom: 16,
    borderColor: '#E2E8F0',
    borderWidth: 1,
  },

  cardTitulo: {
    color: '#1E40AF',
    fontSize: 18,
    fontWeight: '600',
  },
});