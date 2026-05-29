import Ionicons from '@expo/vector-icons/Ionicons';
import { createDrawerNavigator } from '@react-navigation/drawer';
import OcorrenciasScreen from '../screens/admin/OcorrenciasScreen';
import TabNavigator from './TabNavigator';

export type RootDrawerParamList = {
  PainelPrincipal: undefined;
  Ocorrencias: undefined;
};

const Drawer = createDrawerNavigator<RootDrawerParamList>();

export function AppDrawer() {
  return (
    <Drawer.Navigator
      initialRouteName="PainelPrincipal"
      screenOptions={({ route }) => ({
        headerStyle: { backgroundColor: '#1E40AF' },
        headerTintColor: '#F1F5F9',
        drawerActiveTintColor: '#1E40AF',
        drawerInactiveTintColor: '#64748b',
        drawerIcon: ({ focused, color, size }) => (
          <Ionicons
            name={
              route.name === 'PainelPrincipal'
                ? focused ? 'grid' : 'grid-outline'
                : focused ? 'notifications' : 'notifications-outline'
            }
            color={color}
            size={size}
          />
        ),
      })}
    >
      <Drawer.Screen
        name="PainelPrincipal"
        component={TabNavigator}
        options={{ title: 'Painel', headerShown: false }}
      />
      <Drawer.Screen
        name="Ocorrencias"
        component={OcorrenciasScreen}
        options={{ title: 'Ocorrências' }}
      />
    </Drawer.Navigator>
  );
}