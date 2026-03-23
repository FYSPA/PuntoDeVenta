import { Stack } from 'expo-router';

export default function AuthLayout() {
    return (
        <Stack
            screenOptions={{
                headerShown: false, // Ocultamos el header para un look más limpio
                contentStyle: { backgroundColor: 'transparent' },
            }}
        />
    );
}