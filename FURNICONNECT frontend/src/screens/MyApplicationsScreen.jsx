import React, { useEffect, useState } from "react";
import { View, Text, ScrollView, StyleSheet } from "react-native";
import { Card } from "react-native-paper";
import { getMyApplications } from "../services/api";
import { COLORS } from "../theme/colors";

export default function MyApplicationsScreen() {

  const [applications, setApplications] = useState([]);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const res = await getMyApplications();
      setApplications(res.data);
    } catch (err) {
      console.log("LOAD ERROR:", err);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>My Applications</Text>

      {applications.length === 0 ? (
        <Text style={styles.empty}>No applications yet</Text>
      ) : (
        applications.map(app => (
          <Card key={app.id} style={styles.card}>
            <Card.Content>
              <Text style={styles.text}>Job: {app.title}</Text>
              <Text style={styles.text}>Status: {app.status}</Text>
            </Card.Content>
          </Card>
        ))
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 15, backgroundColor: COLORS.background },
  title: { fontSize: 26, color: COLORS.accent, marginBottom: 15 },
  card: { marginBottom: 15, backgroundColor: "#2a2a2a" },
  text: { color: "#fff" },
  empty: { textAlign: "center", marginTop: 50, color: "gray" }
});