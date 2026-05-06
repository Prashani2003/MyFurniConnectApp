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

export default function AdminReviewsScreen() {

  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    loadReviews();
  }, []);

  // ========================
  // LOAD REVIEWS
  // ========================
  const loadReviews = async () => {

    try {

      const res = await API.get(
        "/admin/reviews"
      );

      setReviews(res.data || []);

    } catch (err) {

      console.log(
        "LOAD REVIEWS ERROR:",
        err.response?.data || err.message
      );

    }

  };

  // ========================
  // DELETE REVIEW
  // ========================
  const handleDelete = async (id) => {

    try {

      await API.delete(
        `/admin/reviews/${id}`
      );

      Alert.alert(
        "Success",
        "Review deleted"
      );

      loadReviews();

    } catch (err) {

      console.log(
        "DELETE REVIEW ERROR:",
        err.response?.data || err.message
      );

    }

  };

  // ========================
  // UI
  // ========================
  return (

    <View style={styles.container}>

      <Text style={styles.title}>
        Manage Reviews
      </Text>

      <FlatList
        data={reviews}
        keyExtractor={(item) =>
          item.review_id.toString()
        }
        renderItem={({ item }) => (

          <Card style={styles.card}>

            <Card.Content>

              <Text style={styles.rating}>
                ⭐ {item.rating}
              </Text>

              <Text style={styles.comment}>
                {item.comment}
              </Text>

              <Text style={styles.info}>
                Reviewer ID:
                {" "}
                {item.reviewer_id}
              </Text>

              <Text style={styles.info}>
                Reviewee ID:
                {" "}
                {item.reviewee_id}
              </Text>

            </Card.Content>

            <Card.Actions>

              <Button
                mode="contained"
                buttonColor="red"
                onPress={() =>
                  handleDelete(
                    item.review_id
                  )
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

  rating: {
    color: "#FFD700",
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 10
  },

  comment: {
    color: "#fff",
    fontSize: 16,
    marginBottom: 10
  },

  info: {
    color: "#aaa"
  }

});