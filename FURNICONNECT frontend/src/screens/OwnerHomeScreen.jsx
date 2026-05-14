import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Button, Card } from "react-native-paper";
import { COLORS } from "../theme/colors";

export default function OwnerHomeScreen() {
  return (
    <View style={styles.container}>

      <Text style={styles.title}>Furniture Owner Dashboard</Text>

      <Card style={styles.card}>
        <Card.Content>
          <Text style={styles.text}>Post a job</Text>
          <Button mode="contained">Create Job</Button>
        </Card.Content>
      </Card>

      <Card style={styles.card}>
        <Card.Content>
          <Text style={styles.text}>Find workers</Text>
          <Button mode="contained">Browse Workers</Button>
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