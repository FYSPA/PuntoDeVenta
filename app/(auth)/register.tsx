import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import React, { useState } from 'react';
import {
    Alert,
    Keyboard,
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    StyleSheet,
    TextInput,
    TouchableOpacity,
    TouchableWithoutFeedback,
    View
} from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { useColorScheme } from '@/hooks/use-color-scheme';

export default function RegisterScreen() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [focusedInput, setFocusedInput] = useState<string | null>(null);

    const colorScheme = useColorScheme();
    const isDark = colorScheme === 'dark';

    const handleRegister = () => {
        if (!name || !email || !password || !confirmPassword) {
            Alert.alert('Campos incompletos', 'Por favor rellena todos los campos para crear tu cuenta.');
            return;
        }

        if (password !== confirmPassword) {
            Alert.alert('Error', 'Las contraseñas no coinciden. Inténtalo de nuevo.');
            return;
        }

        console.log('Registro con:', name, email, password);
        // Aquí iría tu lógica de registro en base de datos
        // Una vez registrado correctamente, lo mandamos a la app
        router.replace('/(tabs)/home');
    };

    // Colores dinámicos
    const inputBgColor = isDark ? '#1E1E1E' : '#F5F5F5';
    const textColor = isDark ? '#FFFFFF' : '#000000';
    const iconColor = isDark ? '#888888' : '#A0A0A0';
    const activeBorderColor = '#00e5ff'; // El cyan tech

    return (
        <KeyboardAvoidingView
            style={{ flex: 1 }}
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        >
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <ThemedView style={styles.container}>

                    {/* Botón de volver atrás */}
                    <TouchableOpacity onPress={() => router.back()} style={styles.topBackButton}>
                        <Ionicons name="arrow-back" size={24} color={textColor} />
                    </TouchableOpacity>

                    <ScrollView
                        showsVerticalScrollIndicator={false}
                        contentContainerStyle={styles.scrollContent}
                    >
                        <View style={styles.header}>
                            <ThemedText type="title" style={styles.title}>Crear Cuenta 🚀</ThemedText>
                            <ThemedText style={styles.subtitle}>Únete y comienza a gestionar tu Punto de Venta</ThemedText>
                        </View>

                        <View style={styles.form}>
                            {/* INPUT: NOMBRE */}
                            <ThemedText style={styles.label}>Nombre completo</ThemedText>
                            <View style={[
                                styles.inputContainer,
                                { backgroundColor: inputBgColor },
                                focusedInput === 'name' && { borderColor: activeBorderColor, borderWidth: 1 }
                            ]}>
                                <Ionicons name="person-outline" size={20} color={focusedInput === 'name' ? activeBorderColor : iconColor} style={styles.icon} />
                                <TextInput
                                    style={[styles.input, { color: textColor }]}
                                    placeholder="Ej. Juan Pérez"
                                    placeholderTextColor="#888"
                                    value={name}
                                    onChangeText={setName}
                                    onFocus={() => setFocusedInput('name')}
                                    onBlur={() => setFocusedInput(null)}
                                />
                            </View>

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
                                <TouchableOpacity onPress={() => setShowPassword(!showPassword)} style={styles.eyeIcon}>
                                    <Ionicons name={showPassword ? "eye-off-outline" : "eye-outline"} size={20} color={iconColor} />
                                </TouchableOpacity>
                            </View>

                            {/* INPUT: CONFIRMAR CONTRASEÑA */}
                            <ThemedText style={styles.label}>Confirmar Contraseña</ThemedText>
                            <View style={[
                                styles.inputContainer,
                                { backgroundColor: inputBgColor },
                                focusedInput === 'confirmPassword' && { borderColor: activeBorderColor, borderWidth: 1 }
                            ]}>
                                <Ionicons name="shield-checkmark-outline" size={20} color={focusedInput === 'confirmPassword' ? activeBorderColor : iconColor} style={styles.icon} />
                                <TextInput
                                    style={[styles.input, { color: textColor }]}
                                    placeholder="••••••••"
                                    placeholderTextColor="#888"
                                    value={confirmPassword}
                                    onChangeText={setConfirmPassword}
                                    secureTextEntry={!showConfirmPassword}
                                    onFocus={() => setFocusedInput('confirmPassword')}
                                    onBlur={() => setFocusedInput(null)}
                                />
                                <TouchableOpacity onPress={() => setShowConfirmPassword(!showConfirmPassword)} style={styles.eyeIcon}>
                                    <Ionicons name={showConfirmPassword ? "eye-off-outline" : "eye-outline"} size={20} color={iconColor} />
                                </TouchableOpacity>
                            </View>

                            {/* BOTÓN DE REGISTRO */}
                            <TouchableOpacity style={styles.button} activeOpacity={0.8} onPress={handleRegister}>
                                <ThemedText style={styles.buttonText}>Registrarse</ThemedText>
                                <Ionicons name="person-add-outline" size={20} color="#fff" style={{ marginLeft: 8 }} />
                            </TouchableOpacity>

                            {/* LINK HACIA LOGIN */}
                            <View style={styles.loginPrompt}>
                                <ThemedText style={styles.loginPromptText}>¿Ya tienes una cuenta? </ThemedText>
                                <TouchableOpacity onPress={() => router.back()}>
                                    <ThemedText style={styles.loginLink}>Inicia Sesión</ThemedText>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </ScrollView>
                </ThemedView>
            </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    scrollContent: {
        flexGrow: 1,
        padding: 24,
        justifyContent: 'center',
    },
    topBackButton: {
        position: 'absolute',
        top: Platform.OS === 'ios' ? 60 : 40,
        left: 20,
        zIndex: 10, // Un poco más alto para asegurar que se pueda clickear por encima del scroll
        padding: 10,
    },
    header: {
        marginBottom: 35,
        marginTop: 60, // Margen extra por el botón de atrás
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
        borderColor: 'transparent',
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
    button: {
        backgroundColor: '#1E90FF',
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
        elevation: 5,
    },
    buttonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },
    loginPrompt: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 25,
        marginBottom: 20,
    },
    loginPromptText: {
        fontSize: 15,
        opacity: 0.8,
    },
    loginLink: {
        color: '#00e5ff',
        fontSize: 15,
        fontWeight: 'bold',
    }
});