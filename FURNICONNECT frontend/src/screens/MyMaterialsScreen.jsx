import React, {
  useEffect,
  useState
} from "react";

import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image
} from "react-native";

import {
  Card
} from "react-native-paper";

import {
  getMaterials
} from "../services/api";

import { COLORS } from "../theme/colors";

export default function MyMaterialsScreen() {

  const [materials, setMaterials] = useState([]);

  useEffect(() => {

    fetchMaterials();

  }, []);

  const fetchMaterials = async () => {

    try {

      const res = await getMaterials();

      setMaterials(res.data);

    } catch (err) {

      console.log(err);

    }

  };

  const renderItem = ({ item }) => {

    return (

      <Card style={styles.card}>

        {
          item.image && (
            <Image
              source={{
                uri:
                  `http://192.168.1.3:5000/uploads/${item.image}`
              }}
              style={styles.image}
            />
          )
        }

        <View style={styles.content}>

          <Text style={styles.name}>
            {item.name}
          </Text>

          <Text style={styles.text}>
            Price: Rs. {item.price}
          </Text>

          <Text style={styles.text}>
            Quantity: {item.quantity}
          </Text>

        </View>

      </Card>

    );

  };

  return (

    <View style={styles.container}>

      <Text style={styles.title}>
        My Materials
      </Text>

      <FlatList
        data={materials}
        keyExtractor={(item) =>
          item.material_id.toString()
        }
        renderItem={renderItem}
        ListEmptyComponent={
          <Text style={styles.empty}>
            No materials found
          </Text>
        }
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
    fontSize: 40,
    fontWeight: "bold",
    color: COLORS.accent,
    marginBottom: 20
  },

  card: {
    backgroundColor: "#2a2a2a",
    marginBottom: 20,
    borderRadius: 20,
    overflow: "hidden"
  },

  image: {
    width: "100%",
    height: 200
  },

  content: {
    padding: 15
  },

  name: {
    color: "#fff",
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10
  },

  text: {
    color: "#ccc",
    fontSize: 16,
    marginBottom: 5
  },

  empty: {
    color: "#aaa",
    fontSize: 18,
    marginTop: 30
  }

});