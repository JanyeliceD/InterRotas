import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '../../navigation/RootNavigator';

import { Pressable, Text, View, TextInput, Alert } from 'react-native';
import { styles } from './styles'; 
import { useState } from 'react';

type DadosLogin = {
    usuario: string;
    senha: string;
};

type LoginErrors = Partial<Record<keyof DadosLogin, string>>;

function validarLogin(dados: DadosLogin): LoginErrors {
    const erros: LoginErrors = {};

    if (!dados.usuario.trim()) {
        erros.usuario = 'O campo usuário é obrigatório.';
    }
    if (!dados.senha.trim()) {
        erros.senha = 'O campo senha é obrigatório.';
    }
    return erros;
}

// ⚠️ IMPORTANTE: Certifique-se de que 'AdminHome' e 'MotoristaHome' (ou os nomes que escolher) 
// estejam cadastrados dentro do seu RootStackParamList no arquivo RootNavigator!
type NavigationProps = NativeStackNavigationProp<RootStackParamList, 'Login'>;

interface LoginScreenProps {
    onLoginSuccess: (role: 'admin' | 'motorista') => void;
}

export default function LoginScreen({ onLoginSuccess }: LoginScreenProps) {
  const navigation = useNavigation<NavigationProps>();

  const [login, setLogin] = useState<DadosLogin>({
    usuario: '',
    senha: '',
  });
  
  const [erros, setErros] = useState<LoginErrors>({});

  function entrar() {
    const errosEncontrados = validarLogin(login);
    setErros(errosEncontrados);

    if (Object.keys(errosEncontrados).length > 0) {
        Alert.alert('Erro', 'Por favor, preencha todos os campos.');
        return;
    }

    const emailLimpo = login.usuario.trim().toLowerCase();

    // LÓGICA DE DIRECIONAMENTO POR PERFIL:
    if (emailLimpo === 'admin@.com' && login.senha === '123456') {
         navigation.navigate('AdminHome'); 
        onLoginSuccess('admin');

    } else if (emailLimpo === 'motorista@.com' && login.senha === '123456') {
       
        navigation.navigate('MotoristaHome'); 
         onLoginSuccess('motorista');
        
    } else {
        Alert.alert('Dados incorretos', 'Informe as credenciais corretamente.');
    }
  }

  return (
    <View style={styles.container}>
        <View>
            <Text style={styles.titulo}>InterRotas</Text>
            <Text style={styles.titulo}>Login</Text>
            <Text>Painel corporativo de Telemetria</Text>
        </View>

        <Text>E-mail:</Text>
        <TextInput
        placeholder="Digite seu email..."
        value={login.usuario}
        onChangeText={(texto) => setLogin({...login, usuario: texto})}
        keyboardType="email-address"
        style={styles.input}
        />
        {erros.usuario && <Text style={{ color: 'red' }}>{erros.usuario}</Text>}

        <Text>Senha:</Text>
        <TextInput
        placeholder="*********"
        value={login.senha}
        onChangeText={(texto) => setLogin({...login, senha: texto})}
        secureTextEntry
        style={styles.input}
        />
        {erros.senha && <Text style={{ color: 'red' }}>{erros.senha}</Text>}

        <Text style={styles.textoSenha}>Esqueceu a senha?</Text>

      <Pressable style={styles.botao} onPress={entrar}>
        <Text style={styles.botaoTexto}>Entrar</Text>
      </Pressable>

      <Text style={styles.cadastro}>
        Não possui cadastro? <Text style={styles.cadastrar}>Cadastrar</Text>
      </Text>
    </View>
  );
}