import { ThemedText } from '@/components/themed-text';
import { Link } from 'expo-router';
import { ImageBackground, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function WelcomeScreen() {
  return (
    <ImageBackground
      // He puesto una imagen de Unsplash de una GPU / interior de PC iluminado.
      // Si tienes tu propia foto, usa: source={require('@/assets/images/tu-gpu.jpg')}
      source={{ uri: 'https://images.unsplash.com/photo-1591488320449-011701bb6704?q=80&w=800&auto=format&fit=crop' }}
      style={styles.background}
      resizeMode="cover"
    >
      {/* Overlay oscuro para que el texto resalte sobre las luces de la GPU */}
      <View style={styles.overlay}>

        <View style={styles.titleContainer}>
          <ThemedText type="title" style={styles.title}>
            Punto de Venta
          </ThemedText>
          <ThemedText style={styles.subtitle}>
            Hardware & Tech
          </ThemedText>
        </View>

        <Link href="/(auth)/login" asChild style={styles.linkText}>
          <TouchableOpacity activeOpacity={0.8}>
            <Text style={styles.text}>Logearse</Text>
          </TouchableOpacity>
        </Link>

      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  overlay: {
    flex: 1,
    // Un negro con un ligero toque azul oscuro/morado para dar estilo "tech"
    backgroundColor: 'rgba(10, 15, 30, 0.75)',
    padding: 20,
    paddingBottom: 50,
  },
  titleContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    color: '#ffffff',
    fontSize: 42,
    fontWeight: 'bold',
    textAlign: 'center',
    textShadowColor: 'rgba(0, 0, 0, 0.9)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 10,
    marginBottom: 5,
  },
  subtitle: {
    color: '#00e5ff', // Un color cyan/neón sutil para el subtítulo
    fontSize: 18,
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: 2,
  },
  linkText: {
    backgroundColor: '#373737', // Puedes cambiarlo a un azul tech como '#007AFF' si prefieres
    borderRadius: 10,
    paddingVertical: 15,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#555',
  },
  text: {
    color: '#00e5ff',
    fontSize: 20,
    fontWeight: '600',
  }
});