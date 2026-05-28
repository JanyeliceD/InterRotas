import Ionicons from '@expo/vector-icons/Ionicons';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { AppTabs } from './AppTabs';
import OcorrenciasScreen from '../screens/admin/OcorrenciasScreen';

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
        headerStyle: { backgroundColor: '#1D2A62' },
        headerTintColor: '#ededed',
        drawerActiveTintColor: '#1D2A62',
        drawerInactiveTintColor: '#334155',
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
        component={AppTabs}
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