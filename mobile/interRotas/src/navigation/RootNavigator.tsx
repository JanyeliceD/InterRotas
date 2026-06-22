import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { AppDrawer } from './AppDrawer';

import LoginScreen from '../screens/auth/LoginScreen';
import HomeScreen from '../screens/motorista/HomeScreen';
import RegistrarOcorrenciaScreen from '../screens/motorista/RegistrarOcorrenciaScreen';
import CadastrarOnibusScreen from '../screens/admin/CadastrarOnibusScreen';
import CadastrarRotaScreen from '../screens/admin/CadastrarRotaScreen';
import CadastrarMotoristaScreen from '../screens/admin/CadastrarMotoristaScreen';
import CadastrarParadaScreen from '../screens/admin/CadastrarParadaScreen';

export type RootStackParamList = {
  Login: undefined;
  AppDrawer: undefined;
  MotoristaHome: undefined;
  RegistrarOcorrencia: undefined;
  CadastrarOnibus: undefined;
  CadastrarRota: undefined;
  CadastrarMotorista: undefined;
  CadastrarParada: undefined;
};

const Stack = createNativeStackNavigator();

export function RootNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Login"
      >
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="AppDrawer"
          component={AppDrawer}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="MotoristaHome"
          component={HomeScreen}
          options={{ title: 'Área do Motorista' }}
        />
        <Stack.Screen
          name="RegistrarOcorrencia"
          component={RegistrarOcorrenciaScreen}
          options={{ title: 'Registrar Ocorrência' }}
        />
        <Stack.Screen
          name="CadastrarOnibus"
          component={CadastrarOnibusScreen}
          options={{ title: 'Cadastrar Ônibus' }}
        />
        <Stack.Screen
          name="CadastrarRota"
          component={CadastrarRotaScreen}
          options={{ title: 'Cadastrar Rota' }}
        />
        <Stack.Screen
          name="CadastrarMotorista"
          component={CadastrarMotoristaScreen}
          options={{ title: 'Cadastrar Motorista' }}
        />
        <Stack.Screen
          name="CadastrarParada"
          component={CadastrarParadaScreen}
          options={{ title: 'Cadastrar Parada' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}