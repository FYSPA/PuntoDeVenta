import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';

import { useColorScheme } from '@/hooks/use-color-scheme';

export default function RootLayout() {
  const colorScheme = useColorScheme();

  return (
    <ThemeProvider value={colorScheme === 'light' ? DefaultTheme : DarkTheme}>
      <Stack screenOptions={{ headerShown: false }}>
        {/* 1. Pantalla de Bienvenida (lo que era tu modal) */}
        <Stack.Screen name="index" />

        {/* 2. Grupo de Autenticación (Deberías crear una carpeta (auth)) */}
        <Stack.Screen name="(auth)" options={{ presentation: 'modal' }} />

        {/* 3. La aplicación principal una vez logueado */}
        <Stack.Screen name="(tabs)" />
      </Stack>
      <StatusBar style="auto" />
    </ThemeProvider>
  );
}