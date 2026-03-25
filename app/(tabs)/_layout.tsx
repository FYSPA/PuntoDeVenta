import { useColorScheme } from '@/hooks/use-color-scheme';
import { Ionicons } from '@expo/vector-icons';
import { Tabs } from 'expo-router';

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: '#00e5ff', // Nuestro color cyan tecnológico
        tabBarInactiveTintColor: 'gray',
        tabBarStyle: {
          backgroundColor: isDark ? '#1E1E1E' : '#FFFFFF',
          borderTopColor: isDark ? '#333' : '#E0E0E0',
        },
        headerStyle: {
          backgroundColor: isDark ? '#1E1E1E' : '#FFFFFF',
        },
        headerTintColor: isDark ? '#FFFFFF' : '#000000',
      }}>

      {/* Pestaña de Ventas (Entradas de dinero) */}
      <Tabs.Screen
        name="entradas"
        options={{
          title: 'Cobrar (Entradas)',
          tabBarIcon: ({ color }) => <Ionicons name="cash-outline" size={24} color={color} />,
        }}
      />

      {/* Pestaña de Gastos (Salidas de dinero) */}
      <Tabs.Screen
        name="salidas"
        options={{
          title: 'Gastos (Salidas)',
          tabBarIcon: ({ color }) => <Ionicons name="trending-down-outline" size={24} color={color} />,
        }}
      />
    </Tabs>
  );
}