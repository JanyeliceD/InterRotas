import { createNativeStackNavigator } from '@react-navigation/native-stack';

import TabNavigator from './TabNavigator';
import OcorrenciasScreen from '../screens/admin/OcorrenciasScreen';

export type TabStackParamList = {
  Tabs: undefined;
  Ocorrencias: undefined;
};

const Stack = createNativeStackNavigator<TabStackParamList>();

export default function TabStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Tabs"
        component={TabNavigator}
        options={{ headerShown: false }}
      />

      <Stack.Screen
        name="Ocorrencias"
        component={OcorrenciasScreen}
        options={{
          title: 'Ocorrências',
          headerStyle: {
            backgroundColor: '#1E40AF',
          },
          headerTintColor: '#fff',
        }}
      />
    </Stack.Navigator>
  );
}