import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Link } from 'expo-router';
import { StyleSheet, TouchableOpacity } from 'react-native';

export default function WelcomeScreen() {
  return (
    <ThemedView style={styles.container}>
      <ThemedText type="title">Bienvenido a la App</ThemedText>

      {/* Este link lleva al flujo de autenticación */}
      <Link href="/(auth)/login" asChild style={styles.link}>
        <TouchableOpacity>
          <ThemedText type="link">Ir a Iniciar Sesión</ThemedText>
        </TouchableOpacity>
      </Link>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: 20 },
  link: { marginTop: 15, paddingVertical: 15 },
});