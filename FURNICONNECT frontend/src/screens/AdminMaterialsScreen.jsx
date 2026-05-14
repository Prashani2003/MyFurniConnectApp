import React, {
  useEffect,
  useState
} from "react";

import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Alert
} from "react-native";

import {
  Card,
  Button
} from "react-native-paper";

import API from "../services/api";

import { COLORS } from "../theme/colors";

export default function AdminMaterialsScreen() {

  const [materials, setMaterials] =
    useState([]);

  useEffect(() => {
    loadMaterials();
  }, []);

  // ========================
  // LOAD MATERIALS
  // ========================
  const loadMaterials = async () => {

    try {

     const res = await API.get(
  "/materials"
);

      setMaterials(res.data || []);

    } catch (err) {

      console.log(
        "LOAD MATERIALS ERROR:",
        err.response?.data || err.message
      );

    }

  };

  // ========================
  // DELETE MATERIAL
  // ========================
  const handleDelete = async (id) => {

    try {

   await API.delete(
  `/materials/${id}`
);
      Alert.alert(
        "Success",
        "Material deleted"
      );

      loadMaterials();

    } catch (err) {

      console.log(
        "DELETE MATERIAL ERROR:",
        err.response?.data || err.message
      );

    }

  };

  return (

    <View style={styles.container}>

      <Text style={styles.title}>
        Manage Materials
      </Text>

      <FlatList
        data={materials}
        keyExtractor={(item) =>
          item.id.toString()
        }
        renderItem={({ item }) => (

          <Card style={styles.card}>

            <Card.Content>

              <Text style={styles.name}>
                {item.name}
              </Text>

              <Text style={styles.info}>
                Price:
                {" "}
                Rs. {item.price}
              </Text>

              <Text style={styles.info}>
                Stock:
                {" "}
                {item.stock}
              </Text>

            </Card.Content>

            <Card.Actions>

              <Button
                mode="contained"
                buttonColor="red"
                onPress={() =>
                  handleDelete(item.id)
                }
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
    padding: 20
  },

  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: COLORS.accent,
    marginBottom: 20
  },

  card: {
    backgroundColor: "#2a2a2a",
    marginBottom: 15,
    borderRadius: 20
  },

  name: {
    color: "#fff",
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 10
  },

  info: {
    color: "#ddd",
    fontSize: 16,
    marginBottom: 5
  }

});