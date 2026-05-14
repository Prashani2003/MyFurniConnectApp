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

import {
  getAllJobs,
  deleteJob
} from "../services/api";

import { COLORS } from "../theme/colors";

export default function AdminJobsScreen() {

  const [jobs, setJobs] = useState([]);

  // ===============================
  // LOAD JOBS
  // ===============================
  const loadJobs = async () => {

    try {

      const res = await getAllJobs();

      setJobs(res.data || []);

    } catch (err) {

      console.log("LOAD JOBS ERROR:", err);

      Alert.alert(
        "Error",
        "Failed to load jobs"
      );

    }
  };

  useEffect(() => {
    loadJobs();
  }, []);


  // ===============================
  // DELETE JOB
  // ===============================
  const handleDelete = async (id) => {

    Alert.alert(
      "Delete Job",
      "Are you sure?",
      [
        {
          text: "Cancel"
        },
        {
          text: "Delete",
          onPress: async () => {

            try {

              await deleteJob(id);

              Alert.alert(
                "Success",
                "Job deleted"
              );

              loadJobs();

            } catch (err) {

              console.log("DELETE ERROR:", err);

              Alert.alert(
                "Error",
                "Delete failed"
              );

            }

          }
        }
      ]
    );
  };


  return (
    <View style={styles.container}>

      <Text style={styles.title}>
        Manage Jobs
      </Text>

      <FlatList
        data={jobs}
        keyExtractor={(item) =>
          item.job_id.toString()
        }

        renderItem={({ item }) => (

          <Card style={styles.card}>

            <Card.Content>

              <Text style={styles.jobTitle}>
                {item.title}
              </Text>

              <Text style={styles.text}>
                {item.description}
              </Text>

              <Text style={styles.text}>
                Owner: {item.name}
              </Text>

              <Text style={styles.text}>
                Budget: Rs. {item.budget}
              </Text>

            </Card.Content>

            <Card.Actions>

              <Button
                mode="contained"
                buttonColor="red"
                onPress={() =>
                  handleDelete(item.job_id)
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
    padding: 15
  },

  title: {
    fontSize: 30,
    fontWeight: "bold",
    color: COLORS.accent,
    marginBottom: 20
  },

  card: {
    marginBottom: 15,
    backgroundColor: "#2a2a2a"
  },

  jobTitle: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10
  },

  text: {
    color: "#ccc",
    marginBottom: 5
  }

});