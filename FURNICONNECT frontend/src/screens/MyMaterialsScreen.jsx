// 📁 src/screens/MyMaterialsScreen.jsx

import React, {
  useEffect,
  useState
} from "react";

import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Alert
} from "react-native";

import {
  Card,
  Button
} from "react-native-paper";

import {
  getMyMaterials,
  deleteMaterial
} from "../services/api";

import {
  COLORS
} from "../theme/colors";

export default function MyMaterialsScreen() {

  const [materials, setMaterials] = useState([]);

  useEffect(() => {
    loadMaterials();
  }, []);

  const loadMaterials = async () => {

    try {

      const res = await getMyMaterials();

      console.log(
        "MATERIALS:",
        res.data
      );

      setMaterials(res.data || []);

    } catch (err) {

      console.log(
        "LOAD MATERIAL ERROR:",
        err
      );

    }

  };

  const handleDelete = async (id) => {

    try {

      await deleteMaterial(id);

      Alert.alert(
        "Deleted",
        "Material deleted successfully"
      );

      loadMaterials();

    } catch (err) {

      console.log(
        "DELETE ERROR:",
        err
      );

    }

  };

  return (
    <View style={styles.container}>

      <Text style={styles.title}>
        My Materials
      </Text>

      {materials.length === 0 ? (

        <Text style={styles.empty}>
          No materials found
        </Text>

      ) : (

        <FlatList
          data={materials}
          keyExtractor={(item) =>
            item.material_id.toString()
          }
          renderItem={({ item }) => (

            <Card style={styles.card}>

              <Card.Content>

                <Text style={styles.name}>
                  {item.name}
                </Text>

                <Text style={styles.text}>
                  Price: Rs. {item.price}
                </Text>

                <Text style={styles.text}>
                  Stock: {item.quantity}
                </Text>

                <Button
                  mode="contained"
                  buttonColor="red"
                  onPress={() =>
                    handleDelete(item.material_id)
                  }
                >
                  Delete
                </Button>

              </Card.Content>

            </Card>

          )}
        />

      )}

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
    fontSize: 40,
    fontWeight: "bold",
    color: COLORS.accent,
    marginBottom: 20
  },

  card: {
    backgroundColor: "#2a2a2a",
    marginBottom: 20,
    borderRadius: 20
  },

  name: {
    color: "#fff",
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 10
  },

  text: {
    color: "#ddd",
    fontSize: 18,
    marginBottom: 10
  },

  empty: {
    color: "#999",
    fontSize: 18,
    marginTop: 30
  }

});