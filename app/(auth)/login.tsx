import { router } from 'expo-router';
import React, { useState } from 'react';
import { Alert, StyleSheet, TextInput, TouchableOpacity, View } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { useColorScheme } from '@/hooks/use-color-scheme';

export default function LoginScreen() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const colorScheme = useColorScheme();

    const handleLogin = () => {
        if (email && password) {
            // Aquí iría tu lógica de Firebase/Supabase/API
            console.log('Login con:', email, password);

            // .replace es clave para que el usuario no pueda "volver atrás" al login
            router.replace('/(tabs)/home');
        } else {
            Alert.alert('Error', 'Por favor rellena todos los campos');
        }
    };

    return (
        <ThemedView style={styles.container}>
            <View style={styles.header}>
                <ThemedText type="title">Bienvenido</ThemedText>
                <ThemedText style={styles.subtitle}>Inicia sesión para continuar</ThemedText>
            </View>

            <View style={styles.form}>
                <ThemedText style={styles.label}>Correo electrónico</ThemedText>
                <TextInput
                    style={[styles.input, { color: colorScheme === 'dark' ? '#fff' : '#000', borderColor: colorScheme === 'dark' ? '#444' : '#ccc' }]}
                    placeholder="ejemplo@correo.com"
                    placeholderTextColor="#888"
                    value={email}
                    onChangeText={setEmail}
                    autoCapitalize="none"
                    keyboardType="email-address"
                />

                <ThemedText style={styles.label}>Contraseña</ThemedText>
                <TextInput
                    style={[styles.input, { color: colorScheme === 'dark' ? '#fff' : '#000', borderColor: colorScheme === 'dark' ? '#444' : '#ccc' }]}
                    placeholder="********"
                    placeholderTextColor="#888"
                    value={password}
                    onChangeText={setPassword}
                    secureTextEntry
                />

                <TouchableOpacity style={styles.button} onPress={handleLogin}>
                    <ThemedText style={styles.buttonText}>Entrar</ThemedText>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
                    <ThemedText type="link">Volver atrás</ThemedText>
                </TouchableOpacity>
            </View>
        </ThemedView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        justifyContent: 'center',
    },
    header: {
        marginBottom: 40,
    },
    subtitle: {
        fontSize: 16,
        opacity: 0.7,
        marginTop: 5,
    },
    form: {
        gap: 15,
    },
    label: {
        fontSize: 14,
        fontWeight: '600',
        marginBottom: -5,
    },
    input: {
        height: 50,
        borderWidth: 1,
        borderRadius: 10,
        paddingHorizontal: 15,
        fontSize: 16,
    },
    button: {
        backgroundColor: '#007AFF', // Color azul estándar de iOS
        height: 50,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 10,
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
    backButton: {
        marginTop: 20,
        alignItems: 'center',
    },
});