import Ionicons from '@expo/vector-icons/Ionicons';
import { createDrawerNavigator } from '@react-navigation/drawer';
import TabNavigator from './TabNavigator';
import ConfigScreen from '../screens/admin/ConfigCusto';
import TabStack from './TabStack';

export type RootDrawerParamList = {
  PainelPrincipal: undefined;
  Config: undefined;
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
                : focused ? 'settings' : 'settings-outline'
            }
            color={color}
            size={size}
          />
        ),
      })}
    >
      <Drawer.Screen
        name="PainelPrincipal"
        component={TabStack}
        options={{ title: 'Painel', headerShown: false }}
      />

      <Drawer.Screen
        name="Config"
        component={ConfigScreen}
        options={{ title: 'Configurações' }}
      />
    </Drawer.Navigator>
  );
}