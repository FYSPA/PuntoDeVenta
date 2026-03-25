import { useColorScheme } from '@/hooks/use-color-scheme';
import { Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';
import { Alert, FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

// 1. Inventario simulado (Datos de prueba para tu proyecto escolar)
const INVENTARIO = [
  { id: '1', nombre: 'Tarjeta Gráfica RTX 4060', precio: 6500 },
  { id: '2', nombre: 'Teclado Mecánico RGB', precio: 1200 },
  { id: '3', nombre: 'Mouse Logitech G502', precio: 900 },
  { id: '4', nombre: 'Monitor Gaming 144Hz', precio: 4500 },
  { id: '5', nombre: 'Memoria RAM 16GB', precio: 850 },
];

export default function EntradasScreen() {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';

  // 2. Estado del carrito (Ticket)
  const [carrito, setCarrito] = useState<{ id: string; nombre: string; precio: number; idTicket: string }[]>([]);

  // 3. Función para agregar al ticket (le ponemos un idTicket único por si agregas 2 del mismo)
  const agregarAlTicket = (producto: any) => {
    setCarrito([...carrito, { ...producto, idTicket: Math.random().toString() }]);
  };

  // 4. Eliminar del ticket si te equivocas
  const quitarDelTicket = (idTicket: string) => {
    setCarrito(carrito.filter(item => item.idTicket !== idTicket));
  };

  // 5. Calcular Total
  const total = carrito.reduce((suma, item) => suma + item.precio, 0);

  // 6. Finalizar la venta
  const cobrar = () => {
    if (carrito.length === 0) {
      Alert.alert('Aviso', 'No hay productos en el ticket para cobrar.');
      return;
    }

    Alert.alert(
      '¡Venta Exitosa!',
      `Se han cobrado $${total} MXN.\n(Esta es una entrada de dinero a caja)`, [{ text: 'Aceptar', onPress: () => setCarrito([]) }] // Vaciamos el carrito al aceptar
    );
  };

  // Colores dinámicos
  const bgColor = isDark ? '#121212' : '#F5F5F5';
  const cardColor = isDark ? '#1E1E1E' : '#FFFFFF';
  const textColor = isDark ? '#FFFFFF' : '#000000';

  return (
    <View style={[styles.container, { backgroundColor: bgColor }]}>

      {/* SECCIÓN SUPERIOR: LISTA DE PRODUCTOS */}
      <View style={styles.productosContainer}>
        <Text style={[styles.sectionTitle, { color: textColor }]}>Inventario (Toca para agregar)</Text>
        <FlatList
          data={INVENTARIO}
          keyExtractor={(item) => item.id}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={[styles.productoCard, { backgroundColor: cardColor }]}
              onPress={() => agregarAlTicket(item)}
            >
              <Text style={[styles.productoNombre, { color: textColor }]}>{item.nombre}</Text>
              <Text style={styles.productoPrecio}>${item.precio}</Text>
              <Ionicons name="add-circle" size={24} color="#00e5ff" />
            </TouchableOpacity>
          )}
        />
      </View>

      {/* SECCIÓN INFERIOR: EL TICKET DE COMPRA */}
      <View style={[styles.ticketContainer, { backgroundColor: isDark ? '#2A2A2A' : '#E0E0E0' }]}>
        <Text style={[styles.sectionTitle, { color: textColor }]}>Ticket Actual: {carrito.length} items</Text>

        <FlatList
          data={carrito}
          keyExtractor={(item) => item.idTicket}
          style={styles.listaTicket}
          showsVerticalScrollIndicator={true}
          renderItem={({ item }) => (
            <View style={styles.ticketItem}>
              <Text style={[styles.ticketItemText, { color: textColor, flex: 1 }]}>{item.nombre}</Text>
              <Text style={[styles.ticketItemText, { color: textColor, fontWeight: 'bold' }]}>${item.precio}</Text>
              <TouchableOpacity onPress={() => quitarDelTicket(item.idTicket)} style={{ marginLeft: 10 }}>
                <Ionicons name="trash-outline" size={20} color="#ff4444" />
              </TouchableOpacity>
            </View>
          )}
        />

        <View style={styles.totalRow}>
          <Text style={[styles.totalText, { color: textColor }]}>Total:</Text>
          <Text style={styles.totalAmount}>${total} MXN</Text>
        </View>

        <TouchableOpacity style={styles.btnCobrar} onPress={cobrar}>
          <Text style={styles.btnCobrarText}>Cobrar y Registrar Entrada</Text>
          <Ionicons name="cash-outline" size={20} color="#fff" style={{ marginLeft: 8 }} />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  productosContainer: { flex: 1, padding: 15 },
  sectionTitle: { fontSize: 18, fontWeight: 'bold', marginBottom: 10 },
  productoCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    borderRadius: 12,
    marginBottom: 10,
    elevation: 2, // Sombra Android
    shadowColor: '#000', // Sombra iOS
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  productoNombre: { flex: 1, fontSize: 16, fontWeight: '600' },
  productoPrecio: { fontSize: 16, color: '#00e5ff', fontWeight: 'bold', marginRight: 15 },

  ticketContainer: { flex: 1, padding: 15, borderTopLeftRadius: 20, borderTopRightRadius: 20 },
  listaTicket: { marginBottom: 10 },
  ticketItem: { flexDirection: 'row', alignItems: 'center', marginBottom: 8, paddingBottom: 8, borderBottomWidth: 1, borderBottomColor: '#555' },
  ticketItemText: { fontSize: 14 },

  totalRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 15 },
  totalText: { fontSize: 20, fontWeight: 'bold' },
  totalAmount: { fontSize: 24, fontWeight: 'bold', color: '#00e5ff' },

  btnCobrar: {
    backgroundColor: '#1E90FF',
    flexDirection: 'row',
    height: 55,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnCobrarText: { color: '#fff', fontSize: 18, fontWeight: 'bold' }
});