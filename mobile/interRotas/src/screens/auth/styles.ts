import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    container: {
        backgroundColor: '#ededed',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
        gap: 10,
    },
    titulo: {
        fontSize: 24,
        backgroundColor: '#1D2A62',
        color: '#ededed',
        paddingHorizontal: 32,
        borderRadius: 8,
        marginBottom: 12,
    },
    input: {
        backgroundColor: '#B3B3B3',
        color: '#334155',
        paddingHorizontal: 8,
        paddingVertical: 12,
        borderRadius: 8,
    },
    textoSenha: {
        color: '#334155',
        textDecorationLine: 'underline',
        marginTop: 8,
        marginBottom: 8,
        fontSize: 12,
    },
    botao: {
        backgroundColor: '#1D2A62',
        paddingHorizontal: 32,
        paddingVertical: 4,
        borderRadius: 8,
        marginBottom: 8,
    },
    botaoTexto: {
        color: '#ededed',
        fontWeight: 'bold',
    },
    cadastro: {
        color: '#334155',
    },
    cadastrar: {
        textDecorationLine: 'underline',
        color: '#1D2A62',
    }
});