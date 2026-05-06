import React, { useEffect, useState } from "react";
import {
  View,
 Text,
  StyleSheet,
  ScrollView
} from "react-native";

import {
  Card,
  Avatar
} from "react-native-paper";

import API from "../services/api";
import { COLORS } from "../theme/colors";

export default function AdminHomeScreen({ user }) {

  const [stats, setStats] = useState({
    totalUsers: 0,
    totalJobs: 0,
    totalReviews: 0,
    totalMaterials: 0
  });

  // ========================
  // LOAD DASHBOARD DATA
  // ========================
  const loadDashboard = async () => {
    try {

      const res = await API.get("/admin/dashboard");

      console.log("ADMIN STATS:", res.data);

      setStats(res.data);

    } catch (err) {
      console.log("ADMIN ERROR:", err.response?.data || err.message);
    }
  };

  useEffect(() => {
    loadDashboard();
  }, []);

  return (
    <ScrollView style={styles.container}>

      {/* HEADER */}
      <View style={styles.header}>
        <Text style={styles.title}>
          Admin Dashboard
        </Text>

        <Text style={styles.subtitle}>
          Welcome {user?.name}
        </Text>
      </View>

      {/* STATS */}
      <View style={styles.cardContainer}>

        <Card style={styles.card}>
          <Card.Content style={styles.cardContent}>
            <Avatar.Icon
              size={50}
              icon="account-group"
              style={styles.icon}
            />

            <Text style={styles.cardNumber}>
              {stats.totalUsers}
            </Text>

            <Text style={styles.cardText}>
              Total Users
            </Text>
          </Card.Content>
        </Card>

        <Card style={styles.card}>
          <Card.Content style={styles.cardContent}>
            <Avatar.Icon
              size={50}
              icon="briefcase"
              style={styles.icon}
            />

            <Text style={styles.cardNumber}>
              {stats.totalJobs}
            </Text>

            <Text style={styles.cardText}>
              Total Jobs
            </Text>
          </Card.Content>
        </Card>

        <Card style={styles.card}>
          <Card.Content style={styles.cardContent}>
            <Avatar.Icon
              size={50}
              icon="star"
              style={styles.icon}
            />

            <Text style={styles.cardNumber}>
              {stats.totalReviews}
            </Text>

            <Text style={styles.cardText}>
              Reviews
            </Text>
          </Card.Content>
        </Card>

        <Card style={styles.card}>
          <Card.Content style={styles.cardContent}>
            <Avatar.Icon
              size={50}
              icon="cube"
              style={styles.icon}
            />

            <Text style={styles.cardNumber}>
              {stats.totalMaterials}
            </Text>

            <Text style={styles.cardText}>
              Materials
            </Text>
          </Card.Content>
        </Card>

      </View>

    </ScrollView>
  );
}

// ========================
// STYLES
// ========================
const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: COLORS.background,
    padding: 15
  },

  header: {
    marginBottom: 25
  },

  title: {
    fontSize: 30,
    fontWeight: "bold",
    color: COLORS.accent
  },

  subtitle: {
    color: "#aaa",
    fontSize: 16,
    marginTop: 5
  },

  cardContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between"
  },

  card: {
    width: "48%",
    marginBottom: 15,
    backgroundColor: "#2a2a2a",
    borderRadius: 15
  },

  cardContent: {
    alignItems: "center",
    paddingVertical: 20
  },

  icon: {
    backgroundColor: COLORS.accent,
    marginBottom: 10
  },

  cardNumber: {
    color: "#fff",
    fontSize: 28,
    fontWeight: "bold"
  },

  cardText: {
    color: "#aaa",
    marginTop: 5,
    fontSize: 15
  }

});