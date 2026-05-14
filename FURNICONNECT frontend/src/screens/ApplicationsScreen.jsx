import React, {
  useEffect,
  useState
} from "react";

import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Alert,
  TouchableOpacity
} from "react-native";

import {
  Card,
  Button
} from "react-native-paper";

import {
  useNavigation
} from "@react-navigation/native";

import {
  getApplications,
  updateApplicationStatus
} from "../services/api";

import {
  COLORS
} from "../theme/colors";

export default function ApplicationsScreen() {

  const [
    applications,
    setApplications
  ] = useState([]);

  const navigation =
    useNavigation();

  // 🔥 LOAD DATA
  useEffect(() => {
    fetchApplications();
  }, []);

  // 🔥 FETCH APPLICATIONS
  const fetchApplications =
    async () => {

      try {

        const res =
          await getApplications();

        setApplications(
          res.data || []
        );

      } catch (error) {

        console.log(
          "APPLICATION LOAD ERROR:",
          error
        );

        Alert.alert(
          "Error",
          "Failed to load applications"
        );

      }

    };

  // 🔥 UPDATE STATUS
  const handleStatusUpdate =
    async (
      id,
      status
    ) => {

      try {

        await updateApplicationStatus(
          id,
          status
        );

        Alert.alert(
          "Success",
          `Application ${status}`
        );

        // 🔥 AUTO REFRESH
        fetchApplications();

      } catch (error) {

        console.log(
          "STATUS UPDATE ERROR:",
          error
        );

        Alert.alert(
          "Error",
          "Failed to update status"
        );

      }

    };

  return (

    <ScrollView style={styles.container}>

      <Text style={styles.title}>
        Job Applications
      </Text>

      {applications.length === 0 ? (

        <Text style={styles.empty}>
          No applications yet
        </Text>

      ) : (

        applications.map((app) => (

          <Card
            key={app.id}
            style={styles.card}
          >

            <Card.Content>

              <Text style={styles.text}>
                Job: {app.title}
              </Text>

              {/* 🔥 CLICKABLE WORKER PROFILE */}

              <TouchableOpacity
                onPress={() =>
                  navigation.navigate(
                    "UserProfile",
                    {
                      userId:
                        app.worker_id
                    }
                  )
                }
              >

                <Text
                  style={[

                    styles.text,

                    app.status === "accepted" && {
                      color: "lime"
                    },

                    app.status === "rejected" && {
                      color: "red"
                    },

                    app.status === "pending" && {
                      color: "yellow"
                    },

                  ]}
                >

                  Status: {app.status}

                </Text>

              </TouchableOpacity>

              <Text style={styles.text}>
                Status: {app.status}
              </Text>

            </Card.Content>

            {/* 🔥 PENDING */}

            {app.status === "pending" && (

              <Card.Actions
                style={styles.actions}
              >

                <Button
                  mode="contained"
                  onPress={() =>
                    handleStatusUpdate(
                      app.id,
                      "accepted"
                    )
                  }
                >
                  Accept
                </Button>

                <Button
                  mode="outlined"
                  onPress={() =>
                    handleStatusUpdate(
                      app.id,
                      "rejected"
                    )
                  }
                >
                  Reject
                </Button>

              </Card.Actions>

            )}

            {/* 🔥 ACCEPTED */}

            {app.status === "accepted" && (

              <Card.Actions
                style={styles.actions}
              >

                {/* 💬 CHAT */}

                <Button
                  mode="contained"
                  onPress={() => {

                    navigation.navigate(
                      "Chat",
                      {
                        receiverId:
                          app.worker_id,

                        jobId:
                          app.job_id
                      }
                    );

                  }}
                >
                  Chat
                </Button>

                {/* ⭐ REVIEW */}

                <Button
                  mode="outlined"
                  onPress={() => {

                    console.log(
                      "WORKER ID:",
                      app.worker_id
                    );

                    if (!app.worker_id) {
                      Alert.alert(
                        "Error",
                        "User ID not found"
                      );
                      return;
                    }

                    navigation.navigate(
                      "Review",
                      {
                        revieweeId:
                          app.worker_id
                      }
                    );

                  }}
                >
                  Review
                </Button>

              </Card.Actions>

            )}

          </Card>

        ))

      )}

    </ScrollView>

  );

}

// 🎨 STYLES

const styles =
  StyleSheet.create({

    container: {
      flex: 1,
      padding: 15,
      backgroundColor:
        COLORS.background,
    },

    title: {
      fontSize: 26,
      fontWeight: "bold",
      color: COLORS.accent,
      marginBottom: 15,
    },

    card: {
      marginBottom: 15,
      backgroundColor:
        "#2a2a2a",
    },

    text: {
      color: "#fff",
      marginBottom: 5,
    },

    actions: {
      justifyContent:
        "space-between",
      paddingHorizontal: 10,
    },

    empty: {
      textAlign: "center",
      marginTop: 50,
      color: "gray",
    },

  });