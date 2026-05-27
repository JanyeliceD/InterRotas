import Ionicons from '@expo/vector-icons/Ionicons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { TouchableOpacity } from 'react-native';
import { DrawerActions } from '@react-navigation/native';

import DashboardScreen from '../screens/admin/DashboardSCreen';
import MonitoramentoScreen from '../screens/admin/MonitoramentoScreen';
import { VeiculosScreen } from '../screens/admin/VeiculosScreen';
import { AlertasScreen } from '../screens/admin/AlertasScreen';
import { CadastrosScreen } from '../screens/admin/CadastrosScreen';

export type RootTabParamList = {
    Dashboard: undefined;
    Monitoramento: undefined;
    Cadastros: undefined;
    Veiculos: undefined;
    Alertas: undefined;
};

const Tab = createBottomTabNavigator<RootTabParamList>();

function obterIcone(nomeRota: keyof RootTabParamList, focused: boolean) {
    if (nomeRota === 'Dashboard') return focused ? 'home' : 'home-outline';
    if (nomeRota === 'Monitoramento') return focused ? 'map' : 'map-outline';
    if (nomeRota === 'Cadastros') return focused ? 'add-circle' : 'add-circle-outline'
    if (nomeRota === 'Veiculos') return focused ? 'bus' : 'bus-outline';
    return focused ? 'alert-circle' : 'alert-circle-outline';
}

export function AppTabs() {
    return (
        <Tab.Navigator
            initialRouteName="Dashboard"
            screenOptions={({ route, navigation }) => ({
                headerStyle: { backgroundColor: '#1D2A62' },
                headerTintColor: '#ededed',
                tabBarActiveTintColor: '#1D2A62',
                tabBarInactiveTintColor: '#64748b',
                tabBarStyle: { height: 62, paddingBottom: 8, paddingTop: 6 },
                headerLeft: () => (
                    <TouchableOpacity 
                        onPress={() => 
                            navigation.dispatch(
                                DrawerActions.openDrawer()
                            )
                    }
                    style={{ marginLeft: 12 }}
                    >
                    <Ionicons name='menu' size={28} color="#ededed"
                    />
                    </TouchableOpacity>
                ),

                tabBarIcon: ({ focused, color, size }) => (
                <Ionicons
                    name={obterIcone(route.name as keyof RootTabParamList, focused)}
                    color={color}
                    size={size}
                />
                ),
            })}
        >
            <Tab.Screen name="Dashboard" component={DashboardScreen} options={{ title: 'Painel' }}/>
            <Tab.Screen name="Monitoramento" component={MonitoramentoScreen} options={{ title: 'Monitoramento' }}/>
            <Tab.Screen name='Cadastros' component={CadastrosScreen} options={{ title: 'Cadastrar' }}/>
            <Tab.Screen name="Veiculos" component={VeiculosScreen} options={{ title: 'Frota' }}/>
            <Tab.Screen name="Alertas" component={AlertasScreen} options={{ title: 'Alertas' }}/>

        </Tab.Navigator>
    )
}