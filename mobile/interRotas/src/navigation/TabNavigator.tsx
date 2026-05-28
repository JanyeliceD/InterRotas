import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import {View, Text} from 'react-native';

import CadastrosScreen from "../screens/admin/CadastrosScreen";
import MonitoramentoScreen  from "../screens/admin/MonitoramentoScreen";
import  DashboardScreen  from "../screens/admin/DashboardSCreen";
import AlertasScreen from "../screens/admin/AlertasScreen";


const Tab = createBottomTabNavigator();

export default function TabNavigator() {
    return (
        <Tab.Navigator
        screenOptions={{
            headerShown:false,
            tabBarActiveTintColor: '#38BDF8',
            tabBarInactiveTintColor:'#94A3B8',
            tabBarStyle: {
          backgroundColor: '#0F172A', 
          borderTopWidth: 1,
          borderTopColor: '#334155',
          paddingBottom: 4,
          height: 60,
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: 'bold',
        },
        }}
>
            <Tab.Screen name="Frota" component={DashboardScreen}
            options={{ tabBarLabel: 'Frota', tabBarIcon: ({ color }) => <Text style={{ color, fontSize: 20 }}>🚌</Text>,
        }} />

      <Tab.Screen
      name = "Monitoramento"
      component={MonitoramentoScreen}
        options={{
          tabBarLabel: 'Monitoramento',
          tabBarIcon: ({ color }) => <Text style={{ color, fontSize: 20 }}>📍</Text>,
        }}
      />
      <Tab.Screen
      name = "Cadastros"
      component={CadastrosScreen}
        options={{
          tabBarLabel: 'Cadastros',
          tabBarIcon: ({ color }) => <Text style={{ color, fontSize: 20 }}>📝</Text>,
        }}
      />
      <Tab.Screen 
        name="Alertas" 
        component={AlertasScreen} 
        options={{
          tabBarLabel: 'Alertas',
          tabBarIcon: ({ color }) => <Text style={{ color, fontSize: 20 }}>⚠️</Text>,
        }}
      />
        </Tab.Navigator>
    )
}

