import { StyleSheet } from "react-native";

import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";

export default function EntradasScreen() {
  return (
    <ThemedView>
      <ThemedText style={styles.texto}>Entradas</ThemedText>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  texto: {
    color: "#ffffffff",
  },
});
