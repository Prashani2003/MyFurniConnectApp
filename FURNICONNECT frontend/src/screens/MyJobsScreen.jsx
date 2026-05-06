import React, { useEffect, useState } from "react";
import { View, Text, ScrollView, StyleSheet } from "react-native";
import { Card } from "react-native-paper";

import { getMyJobs } from "../services/api";
import { COLORS } from "../theme/colors";

export default function MyJobsScreen() {

  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    loadMyJobs();
  }, []);

  const loadMyJobs = async () => {
    try {
      const res = await getMyJobs();
      setJobs(res.data);
    } catch (err) {
      console.log("MY JOBS ERROR:", err);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>My Jobs</Text>

      {jobs.length === 0 ? (
        <Text style={styles.empty}>No jobs yet</Text>
      ) : (
        jobs.map((job) => (
          <Card key={job.job_id} style={styles.card}>
            <Card.Title title={job.title} />
            <Card.Content>
              <Text style={styles.text}>{job.description}</Text>
              <Text style={styles.text}>Rs. {job.budget}</Text>
            </Card.Content>
          </Card>
        ))
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 15, backgroundColor: COLORS.background },
  title: { fontSize: 26, fontWeight: "bold", color: COLORS.accent },
  empty: { color: "gray", marginTop: 20 },
  card: { marginTop: 15, backgroundColor: "#2a2a2a" },
  text: { color: "#fff" }
});