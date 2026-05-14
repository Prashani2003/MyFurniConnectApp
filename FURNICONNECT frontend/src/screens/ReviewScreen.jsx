import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Alert,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform
} from "react-native";

import { Button } from "react-native-paper";
import { addReview } from "../services/api";
import { COLORS } from "../theme/colors";

export default function ReviewScreen({ route, navigation }) {

  // 🔥 GET PARAM
  const { revieweeId } = route.params || {};

  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

  // ⭐ RENDER STARS
  const renderStars = () => {
    return [1, 2, 3, 4, 5].map((num) => (
      <TouchableOpacity key={num} onPress={() => setRating(num)}>
        <Text style={styles.star}>
          {num <= rating ? "⭐" : "☆"}
        </Text>
      </TouchableOpacity>
    ));
  };

  // 🔥 SUBMIT REVIEW
  const handleSubmit = async () => {

    console.log("REVIEWEE ID:", revieweeId);
    console.log("RATING:", rating);
    console.log("COMMENT:", comment);

    // ❗ VALIDATION
    if (!revieweeId) {
      Alert.alert("Error", "User not found for review");
      return;
    }

    if (!rating) {
      Alert.alert("Error", "Please select a rating");
      return;
    }

    try {

      const payload = {
        reviewee_id: revieweeId,   // 🔥 IMPORTANT
        rating: Number(rating),
        comment: comment || ""
      };

      console.log("SENDING:", payload);

      const res = await addReview(payload);

      console.log("SUCCESS:", res.data);

      Alert.alert("Success", "Review submitted");

      navigation.goBack();

    } catch (err) {

      console.log("ERROR:", err.response?.data || err.message);

      Alert.alert(
        "Error",
        err.response?.data?.error || "Failed to submit review"
      );
    }
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <View style={styles.container}>

        <Text style={styles.title}>Rate User</Text>

        {/* ⭐ STARS */}
        <View style={styles.starRow}>
          {renderStars()}
        </View>

        {/* 📝 COMMENT */}
        <TextInput
          style={styles.input}
          placeholder="Write a comment..."
          placeholderTextColor="#aaa"
          value={comment}
          onChangeText={setComment}
          multiline
        />

        {/* 🔘 SUBMIT */}
        <Button
          mode="contained"
          onPress={handleSubmit}
        >
          Submit Review
        </Button>

      </View>
    </KeyboardAvoidingView>
  );
}

// 🎨 STYLES
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: COLORS.background,
    justifyContent: "center"
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    color: COLORS.accent,
    marginBottom: 25,
    textAlign: "center"
  },
  starRow: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 20
  },
  star: {
    fontSize: 35,
    marginHorizontal: 6,
    color: "gold"
  },
  input: {
    backgroundColor: "#2a2a2a",
    color: "#fff",
    padding: 12,
    borderRadius: 10,
    marginBottom: 20,
    minHeight: 100,
    textAlignVertical: "top"
  }
});