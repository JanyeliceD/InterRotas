import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from '../screens/auth/LoginScreen';
import { AppDrawer } from './AppDrawer';
import DashboardScreen from '../screens/admin/DashboardSCreen';
import HomeScreen from '../screens/motorista/HomeScreen';
import RegistrarOcorrenciaScreen from '../screens/motorista/RegistrarOcorrenciaScreen';
import CadastrarOnibusScreen from '../screens/admin/CadastrarOnibusScreen'; '../screens/admin/CadastrarOnibusScreen';
import CadastrarRotaScreen from '../screens/admin/CadastrarRotaScreen';
import CadastrarMotoristaScreen from '../screens/admin/CadastrarMotoristaScreen';
import CadastrosScreen from '../screens/admin/CadastrosScreen';
import TabNavigator from './TabNavigator';

export type RootStackParamList = {
    Login: undefined;
    App: undefined;
    AdminHome: undefined; 
    MotoristaHome: undefined; 
    Monitoramento: undefined;
    RegistrarOcorrencia: undefined;
    CadastrarOnibus: undefined;
    CadastrarRota: undefined;
    CadastrarMotorista: undefined;
    Cadastros: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export function RootNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login"
      >
        <Stack.Screen 
          name="Login" 
          component={LoginScreen} 
          options={{ headerShown: false }} 
        />
        <Stack.Screen 
          name="Monitoramento" 
          component={TabNavigator} 
          options={{ headerShown: false }} 
        />
        <Stack.Screen 
          name="App" 
          component={AppDrawer} 
          options={{ headerShown: false }} 
        />
        <Stack.Screen 
          name="AdminHome" 
          component={DashboardScreen} 
          options={{ title: 'Dashboard Admin' }} 
        />
        <Stack.Screen 
          name="MotoristaHome" 
          component={HomeScreen} 
          options={{ title: 'Home Motorista' }} 
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
          name="Cadastros" 
          component={CadastrosScreen} 
          options={{ title: 'Cadastros' }} 
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}