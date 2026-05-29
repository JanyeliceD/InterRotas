import { Alert, View, Text, StyleSheet, FlatList, TouchableOpacity, Pressable } from 'react-native';
import { useState } from 'react';

interface Alerta {
    id: string;
    titulo: string;
    descricao: string;
    data: string;
    status: 'Atrasado' | 'Ação Tomada' | 'Ciente';
    ciente?: boolean;
}

const AlertasIniciais: Alerta[] = [
    {
        id: '1',
        titulo: 'Rota 101 atrasada',
        descricao: 'A rota 101 - Centro x Industrial está com atraso de 15 minutos devido ao trânsito intenso.',
        data: '2024-06-15 14:30',
        status: 'Atrasado'
    },
    {
        id: '3',
        titulo: 'Rota 305 atrasada',
        descricao: 'A rota 305 - Distrito Comercial está com atraso de 10 minutos devido a um acidente na via.',
        data: '2024-06-15 14:30',
        status: 'Atrasado'
    },
];

export default function AlertasScreen() {
     const [Alertas, setAlertas] = useState<Alerta[]>(AlertasIniciais);

    function Ciente(id: string) {
        setAlertas(prevState => prevState.map(alerta =>
            alerta.id === id ? { ...alerta, ciente: true, status: 'Ciente' } : alerta
        ));
        Alert.alert('Alerta Ciente', 'Você marcou o alerta como ciente.');
    }
    function ProvidenciarAção(id: string, titulo: string) {
        setAlertas(prevState => prevState.map(alerta =>
            alerta.id === id ? { ...alerta, status: 'Ação Tomada' } : alerta
        ));
        Alert.alert('Ação Providenciada', 'A equipe de manutenção foi acionada para resolver o problema.');
    }

    function obterCoresStatus(status: Alerta['status']) {
        switch (status) {
            case 'Atrasado':
                return { fundo: '#FEE2E2', texto: '#991B1B' }; 
            case 'Ciente':
                return { fundo: '#FEF3C7', texto: '#92400E' }; 
            case 'Ação Tomada':
            default:
                return { fundo: '#D1FAE5', texto: '#065F46' }; 
        }
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Alertas ({Alertas.length})</Text>
            
            <FlatList  
                data={Alertas}
                keyExtractor={(item) => item.id}
                contentContainerStyle={styles.listContainer}
                showsVerticalScrollIndicator={false}
                renderItem={({ item }) => {
                    const cores = obterCoresStatus(item.status);

                    return (
                        <TouchableOpacity style={styles.rotaCard} activeOpacity={0.9}>
                            <View style={styles.cardHeader}>
                                <Text style={styles.rotaNome}>{item.titulo}</Text>
                                
                                <Text style={styles.rotaTexto}>
                                    <Text style={styles.boldText}>Descrição: </Text>{item.descricao}
                                </Text>
                                
                                <Text style={styles.rotaTexto}>
                                    <Text style={styles.boldText}>Data: </Text>{item.data}
                                </Text>

                              
                                <View style={[styles.statusBadge, { backgroundColor: cores.fundo }]}>
                                    <Text style={[styles.statusText, { color: cores.texto }]}>
                                        {item.status}
                                    </Text>
                                </View>
                            </View>

                           
                            <View style={styles.botoesContainer}>
                                <Pressable 
                                    style={[styles.botaoSecundario, item.ciente && styles.botaoDesabilitado]}  
                                    onPress={() => Ciente(item.id)}
                                    disabled={item.ciente}
                                >
                                    <Text style={[styles.textBotaoSecundario, item.ciente && styles.textDesabilitado]}>
                                        {item.ciente ? 'Ciente ✓' : 'Ciente'}
                                    </Text>
                                </Pressable>
                                
                                <Pressable 
                                    style={styles.botaoPrincipal} 
                                    onPress={() => ProvidenciarAção(item.id, item.titulo)}
                                >
                                    <Text style={styles.textBotaoPrincipal}>Providenciar Ação</Text>
                                </Pressable>
                            </View>
                        </TouchableOpacity>
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
        flexDirection: 'column',
        marginBottom: 12,
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
    },
    boldText: {
        fontWeight: '600',
        color: '#1E293B',
    },
    statusBadge: {
        paddingHorizontal: 10,
        paddingVertical: 4,
        borderRadius: 6,
        alignSelf: 'flex-start',
        marginTop: 8,
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
    }
});