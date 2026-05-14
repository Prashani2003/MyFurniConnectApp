import React, { useState } from "react";

import AsyncStorage from
  "@react-native-async-storage/async-storage";

import {
  View,
  TextInput,
  StyleSheet,
  Image,
  Alert,
  ScrollView
} from "react-native";

import {
  Button,
  Text
} from "react-native-paper";

import {
  launchImageLibrary
} from "react-native-image-picker";

export default function AddWorkPostScreen({
  onSuccess
}) {

  const [title, setTitle] =
    useState("");

  const [
    description,
    setDescription
  ] = useState("");

  const [images, setImages] =
    useState([]);

  // ======================
  // PICK IMAGE
  // ======================

  const pickImage = () => {

    const options = {

      mediaType: "photo",

      quality: 1

    };

    launchImageLibrary(

      options,

      (response) => {

        if (
          response.didCancel
        ) {

          console.log(
            "Cancelled"
          );

        } else if (
          response.errorCode
        ) {

          console.log(
            response.errorMessage
          );

        } else {

          const selectedImage =
            response.assets[0];

          setImages([
            ...images,
            selectedImage
          ]);

        }

      }

    );

  };

  // ======================
  // HANDLE POST
  // ======================

  const handlePost =
    async () => {

      try {

        const token =
          await AsyncStorage.getItem(
            "token"
          );

        const formData =
          new FormData();

        formData.append(
          "title",
          title
        );

        formData.append(
          "description",
          description
        );

        formData.append(
          "category",
          "Furniture"
        );

        images.forEach((img) => {

          formData.append(
            "images",
            {

              uri: img.uri,

              type:
                img.type ||
                "image/jpeg",

              name:
                img.fileName ||
                "photo.jpg"

            }
          );

        });

        const response =
          await fetch(

            "http://192.168.1.3:5000/api/works",

            {

              method: "POST",

              headers: {

                Authorization:
                  `Bearer ${token}`

              },

              body: formData

            }

          );

        const data =
          await response.json();

        console.log(data);

        if (response.ok) {

          Alert.alert(
            "Success",
            "Work post added"
          );

          setTitle("");

          setDescription("");

          setImages([]);

          // 🔥 REFRESH HOME
          if (onSuccess) {
  await onSuccess();
}

        } else {

          Alert.alert(
            "Error",
            data.message
          );

        }

      } catch (err) {

       console.log(
  "FULL ERROR:",
  err.message
);

        Alert.alert(
          "Error",
          "Failed to add work"
        );

      }

    };

  return (

    <ScrollView
      style={styles.container}
      showsVerticalScrollIndicator={false}
    >

      <Text style={styles.title}>
        Add Work Post
      </Text>

      {/* TITLE */}

      <TextInput
        placeholder="Work Title"
        placeholderTextColor="#999"
        style={styles.input}
        value={title}
        onChangeText={setTitle}
      />

      {/* DESCRIPTION */}

      <TextInput
        placeholder="Description"
        placeholderTextColor="#999"
        style={[
          styles.input,
          styles.textArea
        ]}
        multiline
        value={description}
        onChangeText={
          setDescription
        }
      />

      {/* ADD PHOTO */}

      <Button
        mode="outlined"
        textColor="#C19A6B"
        style={styles.imageButton}
        onPress={pickImage}
      >
        Add Photo
      </Button>

      {/* IMAGE PREVIEW */}

      <View style={styles.imageContainer}>

        {images.map(
          (img, index) => (

            <Image
              key={index}
              source={{
                uri: img.uri
              }}
              style={styles.preview}
            />

          )
        )}

      </View>

      {/* POST BUTTON */}

      <Button
        mode="contained"
        buttonColor="#C19A6B"
        textColor="#000"
        style={styles.postButton}
        onPress={handlePost}
      >
        Post Work
      </Button>

    </ScrollView>

  );

}

const styles =
  StyleSheet.create({

    container: {
      flex: 1,
      backgroundColor:
        "#121212",
      padding: 20
    },

    title: {
      color: "#C19A6B",
      fontSize: 26,
      marginBottom: 20,
      fontWeight: "bold"
    },

    input: {
      backgroundColor:
        "#1e1e1e",
      color: "#fff",
      padding: 15,
      borderRadius: 12,
      marginBottom: 15,
      fontSize: 16
    },

    textArea: {
      height: 120,
      textAlignVertical: "top"
    },

    imageButton: {
      marginBottom: 20,
      borderColor: "#C19A6B",
      borderRadius: 10
    },

    imageContainer: {
      flexDirection: "row",
      flexWrap: "wrap",
      justifyContent:
        "space-between",
      marginBottom: 20
    },

    preview: {
      width: "48%",
      height: 150,
      borderRadius: 15,
      marginBottom: 15
    },

    postButton: {
      borderRadius: 10,
      paddingVertical: 5,
      marginBottom: 30
    }

  });