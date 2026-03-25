import { useColorScheme } from '@/hooks/use-color-scheme';
import { Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';
import { Alert, FlatList, KeyboardAvoidingView, Platform, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

export default function SalidasScreen() {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';

  // Estados para el formulario de gastos
  const [concepto, setConcepto] = useState('');
  const [monto, setMonto] = useState('');

  // Lista de salidas (gastos) registrados en el día
  const [gastos, setGastos] = useState<{ id: string; concepto: string; monto: number }[]>([]);

  const registrarGasto = () => {
    if (!concepto || !monto) {
      Alert.alert('Error', 'Debes escribir el concepto y el monto del gasto.');
      return;
    }

    const nuevoGasto = {
      id: Math.random().toString(),
      concepto: concepto,
      monto: parseFloat(monto)
    };

    // Guardamos el gasto en la lista y limpiamos el formulario
    setGastos([nuevoGasto, ...gastos]);
    setConcepto('');
    setMonto('');

    Alert.alert('Registrado', 'La salida de dinero se ha guardado correctamente.');
  };

  const bgColor = isDark ? '#121212' : '#F5F5F5';
  const cardColor = isDark ? '#1E1E1E' : '#FFFFFF';
  const textColor = isDark ? '#FFFFFF' : '#000000';
  const inputBgColor = isDark ? '#2A2A2A' : '#EAEAEA';

  return (
    <KeyboardAvoidingView style={[styles.container, { backgroundColor: bgColor }]} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>

      {/* SECCIÓN SUPERIOR: FORMULARIO DE GASTOS */}
      <View style={[styles.formContainer, { backgroundColor: cardColor }]}>
        <Text style={[styles.title, { color: textColor }]}>Registrar Salida de Dinero</Text>

        <Text style={[styles.label, { color: textColor }]}>Concepto (¿En qué se gastó?)</Text>
        <TextInput
          style={[styles.input, { backgroundColor: inputBgColor, color: textColor }]}
          placeholder="Ej. Pago de luz, Papelería..."
          placeholderTextColor="#888"
          value={concepto}
          onChangeText={setConcepto}
        />

        <Text style={[styles.label, { color: textColor }]}>Monto ($)</Text>
        <TextInput
          style={[styles.input, { backgroundColor: inputBgColor, color: textColor }]}
          placeholder="Ej. 500"
          placeholderTextColor="#888"
          keyboardType="numeric"
          value={monto}
          onChangeText={setMonto}
        />

        <TouchableOpacity style={styles.btnRegistrar} onPress={registrarGasto}>
          <Text style={styles.btnText}>Registrar Salida</Text>
          <Ionicons name="trending-down" size={20} color="#fff" style={{ marginLeft: 8 }} />
        </TouchableOpacity>
      </View>

      {/* SECCIÓN INFERIOR: HISTORIAL DE GASTOS */}
      <View style={styles.historialContainer}>
        <Text style={[styles.historialTitle, { color: textColor }]}>Historial de Salidas Hoy</Text>

        {gastos.length === 0 ? (
          <Text style={{ color: '#888', textAlign: 'center', marginTop: 20 }}>No hay gastos registrados hoy.</Text>
        ) : (
          <FlatList
            data={gastos}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <View style={[styles.gastoItem, { backgroundColor: cardColor }]}>
                <View style={styles.iconContainer}>
                  <Ionicons name="receipt-outline" size={20} color="#ff4444" />
                </View>
                <Text style={[styles.gastoConcepto, { color: textColor }]}>{item.concepto}</Text>
                <Text style={styles.gastoMonto}>- ${item.monto.toFixed(2)}</Text>
              </View>
            )}
          />
        )}
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  formContainer: { padding: 20, margin: 15, borderRadius: 15, elevation: 3, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.1, shadowRadius: 4 },
  title: { fontSize: 20, fontWeight: 'bold', marginBottom: 20, textAlign: 'center' },
  label: { fontSize: 14, fontWeight: '600', marginBottom: 5, marginTop: 10 },
  input: { height: 50, borderRadius: 10, paddingHorizontal: 15, fontSize: 16, marginBottom: 10 },
  btnRegistrar: { backgroundColor: '#ff4444', flexDirection: 'row', height: 50, borderRadius: 10, justifyContent: 'center', alignItems: 'center', marginTop: 15 },
  btnText: { color: '#fff', fontSize: 16, fontWeight: 'bold' },

  historialContainer: { flex: 1, paddingHorizontal: 15 },
  historialTitle: { fontSize: 18, fontWeight: 'bold', marginBottom: 15 },
  gastoItem: { flexDirection: 'row', alignItems: 'center', padding: 15, borderRadius: 12, marginBottom: 10 },
  iconContainer: { backgroundColor: 'rgba(255, 68, 68, 0.1)', padding: 10, borderRadius: 8, marginRight: 15 },
  gastoConcepto: { flex: 1, fontSize: 16, fontWeight: '500' },
  gastoMonto: { fontSize: 16, fontWeight: 'bold', color: '#ff4444' }
});