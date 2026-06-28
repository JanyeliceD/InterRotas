import {
  Alert,
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';

import { useEffect, useState } from 'react';

import {
  Alerta,
  listarAlertas,
  atualizarStatus
} from '../../services/alertaService';

export default function AlertasScreen() {
  const [alertas, setAlertas] = useState<Alerta[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    carregarAlertas();
  }, []);

  async function carregarAlertas() {
    try {
      const dados = await listarAlertas();
      setAlertas(dados);
    } catch (error) {
      console.error(error);

      Alert.alert(
        'Erro',
        'Não foi possível carregar os alertas.'
      );
    } finally {
      setLoading(false);
    }
  }

    async function alterarStatus(
    id: string,
    status: 'CIENTE' | 'ATENDIDO'
    ) {
    try {
        await atualizarStatus(id, status);

        await carregarAlertas();
    } catch (error) {
        Alert.alert(
        'Erro',
        'Não foi possível atualizar o alerta.'
        );
    }
    }

    function obterCorStatus(status: string) {
    switch (status) {
        case 'NOVO':
        return {
            fundo: '#FEE2E2',
            texto: '#991B1B',
        };

        case 'CIENTE':
        return {
            fundo: '#FEF3C7',
            texto: '#92400E',
        };

        case 'ATENDIDO':
        return {
            fundo: '#DCFCE7',
            texto: '#166534',
        };

        default:
        return {
            fundo: '#E2E8F0',
            texto: '#475569',
        };
    }
    }

    function formatarStatus(status: string) {
    switch (status) {
        case 'NOVO':
        return 'Novo';

        case 'CIENTE':
        return 'Ciente';

        case 'ATENDIDO':
        return 'Atendido';

        default:
        return status;
    }
    }

    const coresTipo = {
        fundo: '#FEE2E2',
        texto: '#991B1B',
    };

  function formatarTipo(tipo: string) {
    switch (tipo) {
      case 'ATRASO':
        return 'Atraso';

      case 'DESVIO_ROTA':
        return 'Desvio de rota';

      case 'LOTACAO':
        return 'Lotação';

      default:
        return 'Outro';
    }
  }

  if (loading) {
    return (
      <View style={styles.loading}>
        <ActivityIndicator
          size="large"
          color="#1E40AF"
        />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        Alertas ({alertas.length})
      </Text>

      <FlatList
        data={alertas}
        keyExtractor={(item) => item._id}
        ListEmptyComponent={
          <Text style={styles.empty}>
            Nenhum alerta encontrado.
          </Text>
        }
        renderItem={({ item }) => {
          return (
            <View style={styles.rotaCard}>
            <View style={styles.badgesContainer}>
                <View
                    style={[
                    styles.statusBadge,
                    {
                        backgroundColor: coresTipo.fundo,
                    },
                    ]}
                >
                    <Text
                    style={[
                        styles.statusText,
                        {
                        color: coresTipo.texto,
                        },
                    ]}
                    >
                    {formatarTipo(item.tipo)}
                    </Text>
                </View>

                <View
                    style={[
                    styles.statusBadge,
                    {
                        backgroundColor:
                        obterCorStatus(item.status).fundo,
                    },
                    ]}
                >
                    <Text
                    style={[
                        styles.statusText,
                        {
                        color:
                            obterCorStatus(item.status).texto,
                        },
                    ]}
                    >
                    {formatarStatus(item.status)}
                    </Text>
                </View>
                </View>
              <View style={styles.cardHeader}>
                <Text style={styles.codigo}>
                  {item.codigo}
                </Text>
                </View>

                <Text style={styles.idOnibus}>
                  {item.idOnibus.codigo} -{' '}
                  {item.idOnibus.placa}
                </Text>

                {item.descricao && (
                  <Text style={styles.rotaTexto}>
                    <Text
                      style={styles.boldText}
                    >
                      Descrição:
                    </Text>{' '}
                    {item.descricao}
                  </Text>
                )}

                <Text style={styles.rotaTexto}>
                  <Text style={styles.boldText}>
                  </Text>
                  {new Date(
                    item.dataCriacao
                  ).toLocaleString('pt-BR')}
                </Text>

              <View
                style={styles.botoesContainer}
              >
                {item.status === 'NOVO' && (
                <TouchableOpacity
                    style={styles.botaoSecundario}
                    onPress={() =>
                    alterarStatus(item._id, 'CIENTE')
                    }
                >
                    <Text style={styles.textBotaoSecundario}>
                    Ciente
                    </Text>
                </TouchableOpacity>
                )}

                {item.status !== 'ATENDIDO' && (
                <TouchableOpacity
                    style={styles.botaoPrincipal}
                    onPress={() =>
                    alterarStatus(item._id, 'ATENDIDO')
                    }
                >
                    <Text style={styles.textBotaoPrincipal}>
                    Providenciar ação
                    </Text>
                </TouchableOpacity>
                )}
              </View>
            </View>
          );
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F8FAFC', 
        paddingHorizontal: 16,
        paddingTop: 24,
    },
    listContainer: {
        paddingBottom: 24,
    },
    title: {
        fontSize: 22,
        fontWeight: '700',
        color: '#1E40AF', 
        marginBottom: 16,
        textAlign: 'center',
    },
    rotaCard: {
        backgroundColor: '#FFFFFF', 
        borderRadius: 12,
        padding: 16,
        marginBottom: 14,
        
       
        shadowColor: '#0F172A',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.04,
        shadowRadius: 6,
        elevation: 2,
    },
    cardHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    rotaNome: {
        fontSize: 17,
        fontWeight: '700',
        color: '#1E293B',
        marginBottom: 8,
    },
    rotaTexto: {
        fontSize: 14,
        color: '#475569',
        marginBottom: 4,
        lineHeight: 18,
        marginTop: 4,
    },
    boldText: {
        fontWeight: '600',
        color: '#1E293B',
    },
    badgesContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 8,
    marginBottom: 12,
    },
    statusBadge: {
        paddingHorizontal: 12,
        paddingVertical: 8,
        borderRadius: 6,
        alignSelf: 'flex-start',
        minWidth: 95,
        alignItems: 'center',
        justifyContent: 'center',
    },
    statusText: {
        fontSize: 12,
        fontWeight: '700',
    },
    botoesContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 4,
    },
    botaoSecundario: {
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
    textBotaoSecundario: {
        color: '#475569',
        fontWeight: '600',
        fontSize: 14,
    },
    botaoPrincipal: {
        flex: 1,
        backgroundColor: '#1E40AF', 
        paddingVertical: 11,
        borderRadius: 8,
        alignItems: 'center',
        justifyContent: 'center',
        marginLeft: 6,
    },
    textBotaoPrincipal: {
        color: '#FFFFFF',
        fontWeight: '600',
        fontSize: 14,
    },
    botaoDesabilitado: {
        backgroundColor: '#F8FAFC',
        borderColor: '#E2E8F0',
    },
    textDesabilitado: {
        color: '#94A3B8',
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
});