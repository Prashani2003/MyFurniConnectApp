import React, { useState } from "react";
import { View, Text, TextInput, StyleSheet, Alert } from "react-native";
import { Button } from "react-native-paper";

import { createJob } from "../services/api";
import { COLORS } from "../theme/colors";

export default function CreateJobScreen({ navigation }) {

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [budget, setBudget] = useState("");

  const handleCreate = async () => {
    try {

      if (!title || !description || !budget) {
        return Alert.alert("Error", "All fields required");
      }

      await createJob({
        title,
        description,
        budget: Number(budget),
      });

      Alert.alert("Success", "Job created!");

      navigation.goBack();

    } catch (err) {
      console.log(err.response?.data);
      Alert.alert("Error", err.response?.data?.error || "Failed");
    }
  };

  return (
    <View style={styles.container}>

      <Text style={styles.title}>Create Job</Text>

      <TextInput
        placeholder="Job Title"
        placeholderTextColor="#aaa"
        style={styles.input}
        value={title}
        onChangeText={setTitle}
      />

      <TextInput
        placeholder="Description"
        placeholderTextColor="#aaa"
        style={styles.input}
        value={description}
        onChangeText={setDescription}
      />

      <TextInput
        placeholder="Budget"
        placeholderTextColor="#aaa"
        style={styles.input}
        value={budget}
        onChangeText={setBudget}
        keyboardType="numeric"
      />

      <Button mode="contained" onPress={handleCreate}>
        Create Job
      </Button>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: COLORS.background,
  },
  title: {
    fontSize: 24,
    color: COLORS.accent,
    marginBottom: 20,
  },
  input: {
    backgroundColor: "#2a2a2a",
    color: "#fff",
    padding: 10,
    marginBottom: 15,
    borderRadius: 5,
  },
});