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

type NavigationProps  = NativeStackNavigationProp<RootStackParamList, 'Login'>;

export default function LoginScreen() {
  const navigation = useNavigation<NavigationProps>();

  const [login, setLogin] = useState<DadosLogin>({
    usuario: '',
    senha: '',
  });
  
  const [erros, setErros] = useState<LoginErrors>({});

  function entrar() {
    const errosEncontrados = validarLogin(login);
    setErros(errosEncontrados);

    if (Object.keys(errosEncontrados).length > 0) return;

    if (login.usuario === 'admin' && login.senha === 'admin321') {
        navigation.navigate('App');
    } else {
        Alert.alert('Credenciais inválidas!');
    }
  }

  return (
    <View style={styles.container}>
        <Text style={styles.titulo}>Login</Text>

        <TextInput
        placeholder="Usuário"
        value={login.usuario}
        onChangeText={(texto) => setLogin({...login, usuario: texto})}
        style={styles.input}
        />
        {erros.usuario && <Text style={{ color: 'red' }}>{erros.usuario}</Text>}

        <TextInput
        placeholder="Senha"
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