import React, { useState } from "react";

import {
  View,
  Text,
  TextInput,
  ScrollView,
  StyleSheet,
  Image
} from "react-native";

import { Button } from "react-native-paper";

import {
  getAIDesign,
  estimateMaterials
} from "../services/aiApi";

export default function AIScreen() {

  const [furnitureType, setFurnitureType] =
    useState("");

  const [woodType, setWoodType] =
    useState("");

  const [color, setColor] =
    useState("");

  const [width, setWidth] =
    useState("");

  const [height, setHeight] =
    useState("");

  const [depth, setDepth] =
    useState("");

  const [result, setResult] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  // ==========================
  // IMAGE PREVIEW LOGIC
  // ==========================

  let previewImage = null;

  // CHAIR
  if (furnitureType.toLowerCase() === "chair") {

    if (Number(width) < 50) {

      previewImage =
        require("../assets/designs/chair-small.jpg");

    } else if (Number(width) < 100) {

      previewImage =
        require("../assets/designs/chair-medium.jpg");

    } else {

      previewImage =
        require("../assets/designs/chair-large.jpg");

    }

  }

  // SOFA
  if (furnitureType.toLowerCase() === "sofa") {

    if (Number(width) < 150) {

      previewImage =
        require("../assets/designs/sofa-small.jpg");

    } else if (Number(width) < 220) {

      previewImage =
        require("../assets/designs/sofa-medium.jpg");

    } else {

      previewImage =
        require("../assets/designs/sofa-large.jpg");

    }

  }

  // BED
  if (furnitureType.toLowerCase() === "bed") {

    if (Number(width) < 120) {

      previewImage =
        require("../assets/designs/bed-single.jpg");

    } else if (Number(width) < 180) {

      previewImage =
        require("../assets/designs/bed-queen.jpg");

    } else {

      previewImage =
        require("../assets/designs/bed-king.jpg");

    }

  }

  // CLOSET
  if (furnitureType.toLowerCase() === "closet") {

    if (Number(width) < 120) {

      previewImage =
        require("../assets/designs/closet2.jpg")
    } else if (Number(width) < 180) {

      previewImage =
        require("../assets/designs/closet3.jpg");

    } else {

      previewImage =
        require("../assets/designs/closet4.jpg");

    }

  }

  // ==========================
  // DESIGN SUGGESTION
  // ==========================

  const getDesignSuggestion =
    async () => {

      try {

        setLoading(true);

        const res =
          await getAIDesign({

            furnitureType:
              furnitureType,

            woodType:
              woodType,

            color:
              color

          });

        console.log(res.data);

        setResult(
          JSON.stringify(res.data)
        );

      } catch (err) {

        console.log(err);

        setResult("AI Error");

      } finally {

        setLoading(false);

      }

    };

  // ==========================
  // MATERIAL ESTIMATION
  // ==========================

  const getEstimation =
    async () => {

      try {

        setLoading(true);

        const res =
          await estimateMaterials({

            furnitureType:
              furnitureType,

            width:
              width,

            height:
              height,

            depth:
              depth

          });

        setResult(

          `Wood Needed: ${res.data.woodNeeded}

Wood Cost: ${res.data.woodCost}

Polish Cost: ${res.data.polishCost}

Labor Cost: ${res.data.laborCost}

Total Estimated Cost: ${res.data.estimatedCost}`

        );

      } catch (err) {

        console.log(err);

        setResult(
          "Estimation Error"
        );

      } finally {

        setLoading(false);

      }

    };

  return (

    <ScrollView style={styles.container}>

      <Text style={styles.title}>
        AI Furniture Assistant
      </Text>

      <TextInput
        placeholder="Furniture Type"
        placeholderTextColor="#aaa"
        style={styles.input}
        value={furnitureType}
        onChangeText={setFurnitureType}
      />

      <TextInput
        placeholder="Wood Type"
        placeholderTextColor="#aaa"
        style={styles.input}
        value={woodType}
        onChangeText={setWoodType}
      />

      <TextInput
        placeholder="Color"
        placeholderTextColor="#aaa"
        style={styles.input}
        value={color}
        onChangeText={setColor}
      />

      <TextInput
        placeholder="Width"
        placeholderTextColor="#aaa"
        style={styles.input}
        keyboardType="numeric"
        value={width}
        onChangeText={setWidth}
      />

      <TextInput
        placeholder="Height"
        placeholderTextColor="#aaa"
        style={styles.input}
        keyboardType="numeric"
        value={height}
        onChangeText={setHeight}
      />

      <TextInput
        placeholder="Depth"
        placeholderTextColor="#aaa"
        style={styles.input}
        keyboardType="numeric"
        value={depth}
        onChangeText={setDepth}
      />

      <Button
        mode="contained"
        style={styles.btn}
        onPress={getDesignSuggestion}
      >
        Get AI Design
      </Button>

      <Button
        mode="contained"
        style={styles.btn}
        onPress={getEstimation}
      >
        Estimate Materials
      </Button>

      {/* IMAGE PREVIEW */}

      {previewImage && (

        <Image
          source={previewImage}
          style={styles.previewImage}
          resizeMode="cover"
        />

      )}

      {/* RESULT BOX */}

      <View style={styles.resultBox}>

        <Text style={styles.result}>

          {loading
            ? "Loading..."
            : result}

        </Text>

      </View>

    </ScrollView>

  );

}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: "#121212",
    padding: 20
  },

  title: {
    color: "#fff",
    fontSize: 26,
    fontWeight: "bold",
    marginBottom: 20
  },

  input: {
    backgroundColor: "#1e1e1e",
    color: "#fff",
    marginBottom: 15,
    padding: 12,
    borderRadius: 10
  },

  btn: {
    marginBottom: 15,
    padding: 5,
    backgroundColor: "#cdb4f6"
  },

  previewImage: {
    width: "100%",
    height: 220,
    borderRadius: 20,
    marginTop: 20
  },

  resultBox: {
    backgroundColor: "#1e1e1e",
    padding: 15,
    borderRadius: 10,
    marginTop: 20,
    marginBottom: 50
  },

  result: {
    color: "#fff",
    fontSize: 16,
    lineHeight: 28
  }

});