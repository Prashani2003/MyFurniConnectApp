import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Alert
} from "react-native";

import {
  Card,
  Avatar,
  Button
} from "react-native-paper";

import API from "../services/api";
import { COLORS } from "../theme/colors";

export default function AdminUsersScreen() {

  const [users, setUsers] = useState([]);

  // 🔥 LOAD USERS
  const loadUsers = async () => {
    try {

      const res = await API.get("/admin/users");

      console.log("USERS:", res.data);

      setUsers(res.data || []);

    } catch (err) {

      console.log(
        "LOAD USERS ERROR:",
        err.response?.data || err.message
      );

      Alert.alert("Error", "Failed to load users");
    }
  };

  useEffect(() => {
    loadUsers();
  }, []);

  // 🔥 DELETE USER
  const handleDelete = async (id) => {

    Alert.alert(
      "Delete User",
      "Are you sure?",
      [
        {
          text: "Cancel"
        },
        {
          text: "Delete",
          onPress: async () => {

            try {

              await API.delete(`/admin/users/${id}`);

              Alert.alert("Success", "User deleted");

              loadUsers();

            } catch (err) {

              console.log(
                "DELETE ERROR:",
                err.response?.data || err.message
              );

              Alert.alert("Error", "Delete failed");
            }
          }
        }
      ]
    );
  };

  return (
    <View style={styles.container}>

      <Text style={styles.title}>
        Manage Users
      </Text>

      <FlatList
        data={users}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={{ paddingBottom: 100 }}
        renderItem={({ item }) => (

          <Card style={styles.card}>

            <Card.Title
              title={item.name}
              subtitle={item.role}
              titleStyle={{ color: "#fff" }}
              subtitleStyle={{ color: "#aaa" }}
              left={(props) => (
                <Avatar.Icon
                  {...props}
                  icon="account"
                />
              )}
            />

            <Card.Content>

              <Text style={styles.email}>
                {item.email}
              </Text>

            </Card.Content>

            <Card.Actions>

              <Button
                mode="contained"
                buttonColor="red"
                onPress={() => handleDelete(item.id)}
              >
                Delete
              </Button>

            </Card.Actions>

          </Card>
        )}
      />

    </View>
  );
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: COLORS.background,
    padding: 15
  },

  title: {
    fontSize: 32,
    fontWeight: "bold",
    color: COLORS.accent,
    marginBottom: 20
  },

  card: {
    backgroundColor: "#2a2a2a",
    marginBottom: 15,
    borderRadius: 15
  },

  email: {
    color: "#fff",
    marginTop: 5
  }

});