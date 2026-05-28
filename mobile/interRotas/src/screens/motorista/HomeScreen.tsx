import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';

import { RouteProp, useRoute } from '@react-navigation/native';

type Ocorrencia = {
  placa: string;
  tipo: string;
  observacao: string;
  horario: string;
};

type HomeRouteProp = RouteProp<
  { params: { ultimaOcorrencia?: Ocorrencia } },
  'params'
>;

export default function HomeScreen({
  navigation,
}: any) {

  const route = useRoute<HomeRouteProp>();

const ultimaOcorrencia = route.params?.ultimaOcorrencia;

  return (
    <View style={styles.container}>

      <Text style={styles.title}>
        Área do Motorista
      </Text>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>
          Última ocorrência
        </Text>

        {ultimaOcorrencia ? (
          <>
            <Text style={styles.text}>
              Tipo: {ultimaOcorrencia.tipo}
            </Text>

            <Text style={styles.text}>
              Ônibus: {ultimaOcorrencia.placa}
            </Text>

            <Text style={styles.text}>
              Observação:
              {' '}
              {ultimaOcorrencia.observacao || 'Nenhuma'}
            </Text>

            <Text style={styles.text}>
              Horário:
              {' '}
              {ultimaOcorrencia.horario}
            </Text>
          </>
        ) : (
          <Text style={styles.text}>
            Nenhuma ocorrência registrada.
          </Text>
        )}
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

  card: {
    backgroundColor: '#0F172A',
    padding: 20,
    borderRadius: 10,
    marginBottom: 30,
  },

  cardTitle: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 12,
  },

  text: {
    color: '#CBD5E1',
    marginBottom: 6,
    fontSize: 15,
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