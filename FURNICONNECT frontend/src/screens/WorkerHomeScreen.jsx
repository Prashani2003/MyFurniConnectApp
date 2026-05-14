import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Button, Card } from "react-native-paper";
import { COLORS } from "../theme/colors";

export default function WorkerHomeScreen() {
  return (
    <View style={styles.container}>

      <Text style={styles.title}>Service Provider Dashboard</Text>

      <Card style={styles.card}>
        <Card.Content>
          <Text style={styles.text}>View available jobs</Text>
          <Button mode="contained">Browse Jobs</Button>
        </Card.Content>
      </Card>

      <Card style={styles.card}>
        <Card.Content>
          <Text style={styles.text}>Check messages</Text>
          <Button mode="contained">Messages</Button>
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