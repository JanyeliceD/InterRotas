import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from '../screens/auth/LoginScreen';
import { AppDrawer } from './AppDrawer';
import DashboardScreen from '../screens/admin/DashboardSCreen';
import HomeScreen from '../screens/motorista/HomeScreen';
import RegistrarOcorrenciaScreen from '../screens/motorista/RegistrarOcorrenciaScreen';
import TabNavigator from './TabNavigator';

export type RootStackParamList = {
    Login: undefined;
    App: undefined;
    AdminHome: undefined; 
    MotoristaHome: undefined; 
    Monitoramento: undefined;
    RegistrarOcorrencia: undefined;
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
      </Stack.Navigator>
    </NavigationContainer>
  );
}