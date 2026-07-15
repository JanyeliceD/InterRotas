import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
} from 'react-native';

import { useEffect, useState } from 'react';

import {
  listarOcorrencias,
  Ocorrencia,
  atualizarStatus,
} from '../../services/ocorrenciaService';

export default function OcorrenciasScreen() {
  const [ocorrencias, setOcorrencias] = useState<Ocorrencia[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    carregarOcorrencias();
  }, []);

  async function carregarOcorrencias() {
    try {
      const dados = await listarOcorrencias();
      setOcorrencias(dados);
    } catch (error) {
      console.error(error);

      Alert.alert(
        'Erro',
        'Não foi possível carregar as ocorrências.'
      );
    } finally {
      setLoading(false);
    }
  }

  async function alteararStatus(
    id: string,
    status: 'EM_ANDAMENTO' | 'RESOLVIDA'
  ) {
    try {
      await atualizarStatus(id, status);

      carregarOcorrencias();
    } catch (error) {
      Alert.alert(
        'Erro',
        'Não foi possível atualizar a ocorrência'
      );
    }
  }

  function obterCorStatus(status: string) {
    switch (status) {
      case 'ABERTA':
        return '#F59E0B';

      case 'EM_ANDAMENTO':
        return '#3B82F6';

      case 'RESOLVIDA':
        return '#22C55E';

      default:
        return '#64748B';
    }
  }

  function formatarStatus(status: string) {
    switch (status) {
      case 'ABERTA':
        return 'Aberta';

      case 'EM_ANDAMENTO':
        return 'Em andamento';

      case 'RESOLVIDA':
        return 'Resolvida';

      default:
        return status;
    }
  }

  function formatarTipo(tipo: string) {
    switch (tipo) {
      case 'FALHA_MECANICA':
        return 'Falha mecânica';

      case 'PNEU_FURADO':
        return 'Pneu furado';

      case 'ACIDENTE':
        return 'Acidente';

      case 'TRANSITO':
        return 'Trânsito';

      case 'OUTRO':
        return 'Outro';

      default:
        return tipo;
    }
  }

  if (loading) {
    return (
      <View style={styles.loading}>
        <ActivityIndicator size="large" color="#1E40AF" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        Ocorrências da Frota
      </Text>

      <FlatList
        data={ocorrencias}
        keyExtractor={(item) => item._id}
        ListEmptyComponent={
          <Text style={styles.empty}>
            Nenhuma ocorrência encontrada.
          </Text>
        }
        renderItem={({ item }) => (
          <View style={styles.card}>
            <View style={styles.header}>
              <Text style={styles.codigo}>
                {item.codigo}
              </Text>

              <View
                style={[
                  styles.statusBadge,
                  {
                    backgroundColor: obterCorStatus(
                      item.status
                    ),
                  },
                ]}
              >
                <Text style={styles.statusText}>
                  {formatarStatus(item.status)}
                </Text>
              </View>
            </View>

            <Text style={styles.idOnibus}>
              {item.idOnibus?.codigo && item.idOnibus?.placa
                ? `${item.idOnibus.codigo} - ${item.idOnibus.placa}`
                : 'Ônibus não encontrado'}
            </Text>

            <Text style={styles.tipo}>
              {formatarTipo(item.tipo)}
            </Text>

            {item.descricao && (
              <Text style={styles.descricao}>
                <Text
                  style={styles.descricaoTitulo}
                >
                  Descrição:
                </Text>{' '}
                  {item.descricao}
                </Text>
            )}

            <Text style={styles.horario}>
              {new Date(
                item.dataCriacao
              ).toLocaleString('pt-BR')}
            </Text>

            <View style={styles.buttonContainer}>
              {item.status === 'ABERTA' && (
                <TouchableOpacity 
                style={styles.buttonAnalise}
                onPress={() => 
                  alteararStatus(item._id, 'EM_ANDAMENTO')
                }
                >
                  <Text style={styles.buttonAnaliseText}>
                    Em análise
                  </Text>
                </TouchableOpacity>
              )}

              {item.status !== 'RESOLVIDA' && (
                <TouchableOpacity
                style={styles.buttonResolvida}
                onPress={() =>
                  alteararStatus(item._id, 'RESOLVIDA')
                }
                >
                  <Text style={styles.buttonText}>
                    Resolver
                  </Text>
                </TouchableOpacity>
              )}
            </View>
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
    backgroundColor: '#FFF',
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
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 6,
  },

  statusText: {
    color: '#FFF',
    fontWeight: 'bold',
    fontSize: 12,
  },

  tipo: {
    color: '#1E293B',
    marginTop: 4,
    fontSize: 16,
  },

  horario: {
    color: '#64748B',
    marginTop: 6,
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

  loading: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  empty: {
    textAlign: 'center',
    color: '#64748B',
    marginTop: 40,
  },

  codigo: {
    color: '#1E40AF',
    fontSize: 18,
    fontWeight: 'bold',
  },

  idOnibus: {
    color: '#1E293B',
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 4,
  },

  descricao: {
    color: '#475569',
    marginTop: 6,
  },
  descricaoTitulo: {
    fontWeight: '600',
    color: '#1E293B',
  },
  buttonContainer: {
  flexDirection: 'row',
  marginTop: 16,
  gap: 10,
},

buttonAnalise: {
  flex: 1,
  backgroundColor: '#F1F5F9',
  paddingVertical: 11,
  borderRadius: 8,
  alignItems: 'center',
  justifyContent: 'center',
  borderWidth: 1,
  borderColor: '#E2E8F0',
  marginRight: 6, 
},

buttonAnaliseText: {
  color: '#475569',
  fontWeight: '600',
  fontSize: 14,
},

buttonResolvida: {
  flex: 1,
  backgroundColor: '#1E40AF', 
  paddingVertical: 11,
  borderRadius: 8,
  alignItems: 'center',
  justifyContent: 'center',
  marginLeft: 6,
},
});