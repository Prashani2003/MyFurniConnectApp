import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  ScrollView,
  StyleSheet
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
  // DESIGN SUGGESTION
  // ==========================

  const getDesignSuggestion =
    async () => {

      try {

        setLoading(true);

        const res =
          await getAIDesign({

            furniture_type:
              furnitureType,

            wood_type:
              woodType,

            color:
              color,

            width:
              width,

            height:
              height,

            depth:
              depth

          });

        setResult(
          res.data.design
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

            furniture_type:
              furnitureType,

            width:
              width,

            height:
              height,

            depth:
              depth

          });

        setResult(
          JSON.stringify(
            res.data,
            null,
            2
          )
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
    padding: 5
  },

  resultBox: {
    backgroundColor: "#1e1e1e",
    padding: 15,
    borderRadius: 10,
    marginTop: 20
  },

  result: {
    color: "#fff",
    fontSize: 16,
    lineHeight: 24
  }

});