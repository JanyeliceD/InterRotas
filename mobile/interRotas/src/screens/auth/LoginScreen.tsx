import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '../../navigation/RootNavigator';

import { Pressable, Text, View, TextInput, Alert, ActivityIndicator } from 'react-native';
import { styles } from './styles';
import { useState } from 'react';
import api from '../../services/api';

type DadosLogin = {
    usuario: string;
    senha: string;
};

type LoginErrors = Partial<Record<keyof DadosLogin, string>>;

function validarLogin(dados: DadosLogin): LoginErrors {
    const erros: LoginErrors = {};
    if (!dados.usuario.trim()) erros.usuario = 'O campo usuário é obrigatório.';
    if (!dados.senha.trim()) erros.senha = 'O campo senha é obrigatório.';
    return erros;
}

type NavigationProps = NativeStackNavigationProp<RootStackParamList, 'Login'>;

export default function LoginScreen() {
  const navigation = useNavigation<NavigationProps>();

  const [login, setLogin] = useState<DadosLogin>({ usuario: '', senha: '' });
  const [erros, setErros] = useState<LoginErrors>({});
  const [carregando, setCarregando] = useState<boolean>(false); 

  async function entrar() {
    const errosEncontrados = validarLogin(login);
    setErros(errosEncontrados);

    if (Object.keys(errosEncontrados).length > 0) return;

    setCarregando(true);

    try {
      const corpoRequisicao = {
        usuario: login.usuario.trim().toLowerCase(),
        senha: login.senha,
      };

      // 🚀 Chamando a URL oficial do Render configurada no seu axios
      const resposta = await api.post('/auth/login', corpoRequisicao);
      const dados = resposta.data;

      if (dados.role === 'admin') {
         navigation.navigate('AppDrawer'); 
      } else if (dados.role === 'motorista') {
         navigation.navigate('MotoristaHome'); 
      } else {
         Alert.alert('Erro no Login', 'Tipo de usuário não reconhecido.');
      }

    } catch (error: any) {
      const mensagemErro = error.response?.data?.message || 'Falha ao conectar com o servidor.';
      Alert.alert('Erro no Login', mensagemErro);
    } finally {
      setCarregando(false);
    }
  } // <-- Chave da função entrar corrigida!

  return (
    <View style={styles.container}>
        <Text style={styles.titulo}>Login</Text>

        <TextInput
          placeholder="Usuário"
          placeholderTextColor="#94A3B8"
          value={login.usuario}
          onChangeText={(texto) => setLogin({...login, usuario: texto})}
          style={styles.input}
          autoCapitalize="none"
          editable={!carregando} 
        />
        {erros.usuario && <Text style={{ color: 'red', marginBottom: 8, marginLeft: 4 }}>{erros.usuario}</Text>}

        <TextInput
          placeholder="Senha"
          placeholderTextColor="#94A3B8"
          value={login.senha}
          onChangeText={(texto) => setLogin({...login, senha: texto})}
          secureTextEntry
          style={styles.input}
          editable={!carregando} 
        />
        {erros.senha && <Text style={{ color: 'red', marginBottom: 8, marginLeft: 4 }}>{erros.senha}</Text>}  

      <Pressable 
        style={[styles.botao, carregando && { opacity: 0.6 }]} 
        onPress={entrar}
        disabled={carregando}
      >
        {carregando ? (
          <ActivityIndicator color="#FFF" />
        ) : (
          <Text style={styles.botaoTexto}>Entrar</Text>
        )}
      </Pressable>
    </View>
  );
}