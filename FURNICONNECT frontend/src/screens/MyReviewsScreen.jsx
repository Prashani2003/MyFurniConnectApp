import React, { useEffect, useState } from "react";
import { View, Text, ScrollView, StyleSheet } from "react-native";
import { Card } from "react-native-paper";
import { getReviews } from "../services/api";
import { COLORS } from "../theme/colors";

export default function MyReviewsScreen() {

  const [reviews, setReviews] = useState([]);

  const loadReviews = async () => {
    try {
      const res = await getReviews();
      setReviews(res.data || []);
    } catch (err) {
      console.log("REVIEW LOAD ERROR:", err);
    }
  };

  useEffect(() => {
    loadReviews();
  }, []);

  return (
    <ScrollView style={styles.container}>

      <Text style={styles.title}>My Reviews</Text>

      {reviews.length === 0 ? (
        <Text style={styles.empty}>No reviews yet</Text>
      ) : (

        reviews.map((r) => (

          <Card key={r.review_id} style={styles.card}>
            <Card.Content>

              <Text style={styles.text}>
                From: {r.reviewer_name}
              </Text>

              <Text style={styles.text}>
                Rating: ⭐ {r.rating}
              </Text>

              <Text style={styles.text}>
                {r.comment}
              </Text>

            </Card.Content>
          </Card>

        ))

      )}

    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
    backgroundColor: COLORS.background,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: COLORS.accent,
    marginBottom: 15,
  },
  card: {
    marginBottom: 10,
    backgroundColor: "#2a2a2a",
  },
  text: {
    color: "#fff",
    marginBottom: 5,
  },
  empty: {
    textAlign: "center",
    marginTop: 50,
    color: "gray",
  },
});