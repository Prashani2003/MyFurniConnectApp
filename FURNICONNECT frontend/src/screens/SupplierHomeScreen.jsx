import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Button, Card } from "react-native-paper";
import { COLORS } from "../theme/colors";

export default function SupplierHomeScreen() {
  return (
    <View style={styles.container}>

      <Text style={styles.title}>Supplier Dashboard</Text>

      <Card style={styles.card}>
        <Card.Content>
          <Text style={styles.text}>Add new wood materials</Text>
          <Button mode="contained">Add Material</Button>
        </Card.Content>
      </Card>

      <Card style={styles.card}>
        <Card.Content>
          <Text style={styles.text}>View your materials</Text>
          <Button mode="contained">My Materials</Button>
        </Card.Content>
      </Card>

    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: COLORS.background },
  title: { fontSize: 24, color: COLORS.accent, marginBottom: 20 },
  card: { marginBottom: 15, backgroundColor: "#2a2a2a" },
  text: { color: "#fff", marginBottom: 10 }
});