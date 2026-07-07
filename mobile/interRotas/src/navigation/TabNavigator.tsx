import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Ionicons from '@expo/vector-icons/Ionicons';
import { DrawerActions } from "@react-navigation/routers";
import { TouchableOpacity, View, Text } from 'react-native';

import DashboardScreen from "../screens/admin/DashboardSCreen";
import MonitoramentoScreen  from "../screens/admin/MonitoramentoScreen";
import CadastrosScreen from "../screens/admin/CadastrosScreen";
import AlertasScreen from "../screens/admin/AlertasScreen";
import OcorrenciasScreen from "../screens/admin/OcorrenciasScreen";

export type RootTabParamList = {
    Dashboard: undefined;
    Monitoramento: undefined;
    Cadastros: undefined;
    Alertas: undefined;
    Ocorrencias: undefined;
};

const Tab = createBottomTabNavigator<RootTabParamList>();

function obterIcone(nomeRota: keyof RootTabParamList, focused: boolean) {
    if (nomeRota === 'Dashboard') return focused ? 'home' : 'home-outline';
    if (nomeRota === 'Monitoramento') return focused ? 'map' : 'map-outline';
    if (nomeRota === 'Cadastros') return focused ? 'add-circle' : 'add-circle-outline'
    return focused ? 'alert-circle' : 'alert-circle-outline';
}

export default function TabNavigator() {
    return (
        <Tab.Navigator
            initialRouteName="Dashboard"
            screenOptions={({ route, navigation }) => ({
              headerStyle: { backgroundColor: '#1E40AF' },
              headerTintColor: '#F1F5F9',
              tabBarActiveTintColor: '#1E40AF',
              tabBarInactiveTintColor: '#64748b',
              tabBarStyle: { height: 100, paddingBottom: 8, paddingTop: 6 },
              headerLeft: () => (
                <TouchableOpacity 
                        onPress={() => 
                            navigation.dispatch(
                                DrawerActions.openDrawer()
                            )
                    }
                    style={{ marginLeft: 12 }}
                    >
                    <Ionicons name='menu' size={28} color="#F1F5F9"
                    />
                    </TouchableOpacity>
                ),

                headerRight: () => (
                <TouchableOpacity
                    onPress={() => navigation.navigate('Ocorrencias')}
                    style={{ marginRight: 15 }}
                >
                    <View>
                    <Ionicons
                        name="notifications"
                        size={24}
                        color="#F1F5F9"
                    />

                    <View
                        style={{
                        position: 'absolute',
                        right: -4,
                        top: -2,
                        backgroundColor: '#EF4444',
                        borderRadius: 8,
                        minWidth: 16,
                        height: 16,
                        justifyContent: 'center',
                        alignItems: 'center',
                        }}
                    >
                        <Text
                        style={{
                            color: '#fff',
                            fontSize: 10,
                            fontWeight: 'bold',
                        }}
                        >
                        3
                        </Text>
                    </View>
                    </View>
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
            <Tab.Screen name="Alertas" component={AlertasScreen} options={{ title: 'Alertas' }}/>
        </Tab.Navigator>
    )
}

