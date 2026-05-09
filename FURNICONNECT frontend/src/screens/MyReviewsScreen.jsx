import React, {
  useEffect,
  useState
} from "react";

import {
  View,
  Text,
 ScrollView,
  StyleSheet
} from "react-native";

import {
  Card
} from "react-native-paper";

import {
  getMyReviews
} from "../services/api";

import {
  COLORS
} from "../theme/colors";

export default function MyReviewsScreen() {

  const [
    reviews,
    setReviews
  ] = useState([]);

  useEffect(() => {
    loadReviews();
  }, []);

  const loadReviews =
    async () => {

      try {

        const res =
          await getMyReviews();

        setReviews(
          res.data || []
        );

      } catch (error) {

        console.log(
          "MY REVIEWS ERROR:",
          error
        );

      }

    };

  return (

    <ScrollView style={styles.container}>

      <Text style={styles.title}>
        My Reviews
      </Text>

      {reviews.length === 0 ? (

        <Text style={styles.empty}>
          No reviews yet
        </Text>

      ) : (

        reviews.map((review) => (

          <Card
            key={review.review_id}
            style={styles.card}
          >

            <Card.Content>

              <Text style={styles.rating}>
                ⭐ {review.rating}/5
              </Text>

              <Text style={styles.comment}>
                {review.comment}
              </Text>

              <Text style={styles.reviewer}>
                By: {review.reviewer_name}
              </Text>

            </Card.Content>

          </Card>

        ))

      )}

    </ScrollView>

  );

}

const styles =
  StyleSheet.create({

    container: {
      flex: 1,
      padding: 15,
      backgroundColor:
        COLORS.background,
    },

    title: {
      fontSize: 28,
      fontWeight: "bold",
      color: COLORS.accent,
      marginBottom: 20,
    },

    empty: {
      color: "gray",
      textAlign: "center",
      marginTop: 50,
      fontSize: 16,
    },

    card: {
      marginBottom: 15,
      backgroundColor:
        "#2a2a2a",
    },

    rating: {
      color: "gold",
      fontSize: 20,
      fontWeight: "bold",
      marginBottom: 10,
    },

    comment: {
      color: "#fff",
      fontSize: 16,
      marginBottom: 10,
    },

    reviewer: {
      color: "#aaa",
      fontSize: 14,
    },

  });