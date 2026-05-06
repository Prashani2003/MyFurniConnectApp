import React, {
  useState
} from "react";

import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Alert,
  Image
} from "react-native";

import {
  Button
} from "react-native-paper";

import {
  addMaterial
} from "../services/api";

import { launchImageLibrary } from "react-native-image-picker";

import {
  COLORS
} from "../theme/colors";

export default function AddMaterialScreen() {

  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [stock, setStock] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);

  // PICK IMAGE
  const pickImage = async () => {

    const result = await launchImageLibrary({
      mediaType: "photo"
    });

    if (!result.didCancel) {

      setImage(result.assets[0]);

    }

  };

  // ADD MATERIAL
  const handleAdd = async () => {

    try {

      const formData = new FormData();

      formData.append("name", name);
      formData.append("price", price);
      formData.append("quantity", stock);
      formData.append("description", description);

      if (image) {

        formData.append("image", {
          uri: image.uri,
          type: image.type,
          name: image.fileName
        });

      }

      await addMaterial(formData);

      Alert.alert(
        "Success",
        "Material added successfully"
      );

      setName("");
      setPrice("");
      setStock("");
      setDescription("");
      setImage(null);

    } catch (err) {

      console.log(err);

      Alert.alert(
        "Error",
        "Failed to add material"
      );

    }

  };

  return (
    <View style={styles.container}>

      <Text style={styles.title}>
        Add Material
      </Text>

      <TextInput
        placeholder="Material Name"
        placeholderTextColor="#999"
        style={styles.input}
        value={name}
        onChangeText={setName}
      />

      <TextInput
        placeholder="Price"
        placeholderTextColor="#999"
        style={styles.input}
        value={price}
        onChangeText={setPrice}
        keyboardType="numeric"
      />

      <TextInput
        placeholder="Stock"
        placeholderTextColor="#999"
        style={styles.input}
        value={stock}
        onChangeText={setStock}
        keyboardType="numeric"
      />

      <TextInput
        placeholder="Description"
        placeholderTextColor="#999"
        style={styles.input}
        value={description}
        onChangeText={setDescription}
      />

      {/* IMAGE PREVIEW */}
      {image && (
        <Image
          source={{ uri: image.uri }}
          style={styles.preview}
        />
      )}

      {/* SELECT IMAGE */}
      <Button
        mode="outlined"
        onPress={pickImage}
        style={styles.imageBtn}
      >
        Select Photo
      </Button>

      {/* ADD MATERIAL */}
      <Button
        mode="contained"
        onPress={handleAdd}
      >
        Add Material
      </Button>

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
    marginBottom: 30
  },

  input: {
    backgroundColor: "#2a2a2a",
    color: "#fff",
    marginBottom: 15,
    borderRadius: 10,
    padding: 15
  },

  imageBtn: {
    marginBottom: 20
  },

  preview: {
    width: "100%",
    height: 200,
    borderRadius: 15,
    marginBottom: 20
  }

});