import React, {
  useEffect,
  useState
} from "react";

import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity
} from "react-native";

import {
  Card
} from "react-native-paper";

import {
  useNavigation
} from "@react-navigation/native";

import {
  getMyJobs
} from "../services/api";

import {
  COLORS
} from "../theme/colors";

export default function MyJobsScreen() {

  const [jobs, setJobs] =
    useState([]);

  const navigation =
    useNavigation();

  useEffect(() => {
    loadMyJobs();
  }, []);

  const loadMyJobs =
    async () => {

      try {

        const res =
          await getMyJobs();

        setJobs(res.data);

      } catch (err) {

        console.log(
          "MY JOBS ERROR:",
          err
        );

      }

    };

  return (

    <ScrollView style={styles.container}>

      <Text style={styles.title}>
        My Jobs
      </Text>

      {jobs.length === 0 ? (

        <Text style={styles.empty}>
          No jobs yet
        </Text>

      ) : (

        jobs.map((job) => (

          <TouchableOpacity
            key={job.job_id}
            onPress={() =>
              navigation.navigate(
                "Applications"
              )
            }
          >

            <Card style={styles.card}>

              <Card.Title
                title={job.title}
                titleStyle={styles.cardTitle}
              />

              <Card.Content>

                <Text style={styles.text}>
                  {job.description}
                </Text>

                <Text style={styles.text}>
                  Rs. {job.budget}
                </Text>

              </Card.Content>

            </Card>

          </TouchableOpacity>

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
        COLORS.background
    },

    title: {
      fontSize: 26,
      fontWeight: "bold",
      color: COLORS.accent
    },

    empty: {
      color: "gray",
      marginTop: 20
    },

    card: {
      marginTop: 15,
      backgroundColor:
        "#2a2a2a"
    },

    cardTitle: {
      color: "#fff"
    },

    text: {
      color: "#fff"
    }

  });