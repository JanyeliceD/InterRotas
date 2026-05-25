import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import LoginScreen from '../screens/auth/LoginScreen';
import { AppDrawer } from './AppDrawer';
import DashboardScreen from '../screens/admin/DashboardSCreen';
import { HomeScreen } from '../screens/motorista/HomeScreen';

export type RootStackParamList = {
    Login: undefined;
    App: undefined;
    AdminHome: undefined; 
    MotoristaHome: undefined; 
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export function RootNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator 
        initialRouteName="Login"
      >
        <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
        <Stack.Screen name="App" component={AppDrawer} options={{ headerShown: false }} />
        <Stack.Screen name="AdminHome" component={DashboardScreen} options={{ title: 'Dashboard Admin' }} />
        <Stack.Screen name="MotoristaHome" component={HomeScreen} options={{ title: 'Home Motorista' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}