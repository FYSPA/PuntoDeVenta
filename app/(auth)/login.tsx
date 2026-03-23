import { Ionicons } from '@expo/vector-icons'; // Importamos los iconos
import { router } from 'expo-router';
import React, { useState } from 'react';
import {
    Alert,
    Keyboard,
    KeyboardAvoidingView,
    Platform,
    StyleSheet,
    TextInput,
    TouchableOpacity,
    TouchableWithoutFeedback,
    View
} from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { Link } from 'expo-router';

export default function LoginScreen() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [focusedInput, setFocusedInput] = useState<string | null>(null); // Para saber qué input está activo

    const colorScheme = useColorScheme();
    const isDark = colorScheme === 'dark';

    const handleLogin = () => {
        if (email && password) {
            console.log('Login con:', email, password);
            router.replace('/(tabs)/home');
        } else {
            Alert.alert('Acceso denegado', 'Por favor rellena todos los campos para continuar.');
        }
    };

    // Colores dinámicos dependiendo del tema (Claro / Oscuro)
    const inputBgColor = isDark ? '#1E1E1E' : '#F5F5F5';
    const textColor = isDark ? '#FFFFFF' : '#000000';
    const iconColor = isDark ? '#888888' : '#A0A0A0';
    const activeBorderColor = '#00e5ff'; // Un cyan tecnológico para cuando escribes

    return (
        <KeyboardAvoidingView
            style={{ flex: 1 }}
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        >
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <ThemedView style={styles.container}>

                    {/* Botón de volver atrás arriba a la izquierda (Más profesional) */}
                    <TouchableOpacity onPress={() => router.back()} style={styles.topBackButton}>
                        <Ionicons name="arrow-back" size={24} color={textColor} />
                    </TouchableOpacity>

                    <View style={styles.header}>
                        <ThemedText type="title" style={styles.title}>¡Hola de nuevo! 👋</ThemedText>
                        <ThemedText style={styles.subtitle}>Inicia sesión para acceder a tu Punto de Venta</ThemedText>
                    </View>

                    <View style={styles.form}>
                        {/* INPUT: CORREO */}
                        <ThemedText style={styles.label}>Correo electrónico</ThemedText>
                        <View style={[
                            styles.inputContainer,
                            { backgroundColor: inputBgColor },
                            focusedInput === 'email' && { borderColor: activeBorderColor, borderWidth: 1 }
                        ]}>
                            <Ionicons name="mail-outline" size={20} color={focusedInput === 'email' ? activeBorderColor : iconColor} style={styles.icon} />
                            <TextInput
                                style={[styles.input, { color: textColor }]}
                                placeholder="ejemplo@correo.com"
                                placeholderTextColor="#888"
                                value={email}
                                onChangeText={setEmail}
                                autoCapitalize="none"
                                keyboardType="email-address"
                                onFocus={() => setFocusedInput('email')}
                                onBlur={() => setFocusedInput(null)}
                            />
                        </View>

                        {/* INPUT: CONTRASEÑA */}
                        <ThemedText style={styles.label}>Contraseña</ThemedText>
                        <View style={[
                            styles.inputContainer,
                            { backgroundColor: inputBgColor },
                            focusedInput === 'password' && { borderColor: activeBorderColor, borderWidth: 1 }
                        ]}>
                            <Ionicons name="lock-closed-outline" size={20} color={focusedInput === 'password' ? activeBorderColor : iconColor} style={styles.icon} />
                            <TextInput
                                style={[styles.input, { color: textColor }]}
                                placeholder="••••••••"
                                placeholderTextColor="#888"
                                value={password}
                                onChangeText={setPassword}
                                secureTextEntry={!showPassword}
                                onFocus={() => setFocusedInput('password')}
                                onBlur={() => setFocusedInput(null)}
                            />
                            {/* Ojito para mostrar/ocultar contraseña */}
                            <TouchableOpacity onPress={() => setShowPassword(!showPassword)} style={styles.eyeIcon}>
                                <Ionicons name={showPassword ? "eye-off-outline" : "eye-outline"} size={20} color={iconColor} />
                            </TouchableOpacity>
                        </View>

                        {/* Link de contraseña olvidada (Opcional pero da buen toque) */}
                        <Link href="/(auth)/register" asChild>
                            <TouchableOpacity style={styles.forgotPassword}>
                                <ThemedText style={styles.forgotPasswordText}>¿No tienes cuenta? Crea una</ThemedText>
                            </TouchableOpacity>
                        </Link>

                        {/* BOTÓN PRINCIPAL */}
                        <TouchableOpacity style={styles.button} activeOpacity={0.8} onPress={handleLogin}>
                            <ThemedText style={styles.buttonText}>Ingresar</ThemedText>
                            <Ionicons name="log-in-outline" size={20} color="#fff" style={{ marginLeft: 8 }} />
                        </TouchableOpacity>
                    </View>

                </ThemedView>
            </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 24,
        justifyContent: 'center',
    },
    topBackButton: {
        position: 'absolute',
        top: Platform.OS === 'ios' ? 60 : 40,
        left: 20,
        zIndex: 1,
        padding: 10,
    },
    header: {
        marginBottom: 40,
        marginTop: 40,
    },
    title: {
        fontSize: 32,
        fontWeight: 'bold',
        marginBottom: 8,
    },
    subtitle: {
        fontSize: 16,
        opacity: 0.7,
        lineHeight: 24,
    },
    form: {
        gap: 16,
    },
    label: {
        fontSize: 14,
        fontWeight: '600',
        marginBottom: -8,
        marginLeft: 4,
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        height: 55,
        borderRadius: 14,
        borderWidth: 1,
        borderColor: 'transparent', // Por defecto es transparente, se pinta al hacer focus
        paddingHorizontal: 15,
    },
    icon: {
        marginRight: 10,
    },
    input: {
        flex: 1,
        fontSize: 16,
        height: '100%',
    },
    eyeIcon: {
        padding: 5,
    },
    forgotPassword: {
        alignSelf: 'flex-end',
        marginTop: -5,
    },
    forgotPasswordText: {
        color: '#00e5ff', // Mismo azul tech para mantener la paleta
        fontSize: 14,
        fontWeight: '600',
    },
    button: {
        backgroundColor: '#1E90FF', // Un azul vibrante tipo DodgerBlue
        flexDirection: 'row',
        height: 55,
        borderRadius: 14,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 20,
        shadowColor: '#1E90FF',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
        elevation: 5, // Sombra para Android
    },
    buttonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },
});