import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, ScrollView, Alert } from "react-native";
import { Card, Avatar, IconButton, Drawer, Button } from "react-native-paper";

import ProfileScreen from "./ProfileScreen";
import MyPostsScreen from "./MyPostsScreen";
import MessagesScreen from "./MessagesScreen";
import SettingsScreen from "./SettingsScreen";
import ApplicationsScreen from "./ApplicationsScreen";
import CreateJobScreen from "./CreateJobScreen";
import MyJobsScreen from "./MyJobsScreen";
import MyApplicationsScreen from "./MyApplicationsScreen";
import MyReviewsScreen from "./MyReviewsScreen";
import AdminHomeScreen from "./AdminHomeScreen";

// ✅ STEP 6 IMPORTS
import AddMaterialScreen from "./AddMaterialScreen";
import MyMaterialsScreen from "./MyMaterialsScreen";

import AdminDrawer from "../navigation/AdminDrawer";

import { getJobs, applyJob } from "../services/api";
import { COLORS } from "../theme/colors";

export default function HomeScreen({ user, setUser }) {

  // 🔥 ADMIN NAVIGATION
  if (user?.role === "admin") {
    return <AdminDrawer setUser={setUser} />;
  }

  const [drawerOpen, setDrawerOpen] = useState(false);
  const [currentScreen, setCurrentScreen] = useState("home");
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    loadJobs();
  }, []);

  const loadJobs = async () => {
    try {
      const res = await getJobs();
      setJobs(res.data || []);
    } catch (err) {
      console.log("JOB LOAD ERROR:", err);
    }
  };

  const handleApply = async (jobId) => {
    try {
      await applyJob(jobId);

      Alert.alert(
        "Success",
        "Applied successfully"
      );

      loadJobs();

    } catch (err) {

      Alert.alert(
        "Error",
        err?.response?.data?.error || "Something went wrong"
      );

    }
  };

  // 🔥 SCREEN SWITCH
  const renderScreen = () => {

    switch (currentScreen) {

      case "profile":
        return <ProfileScreen user={user} />;

      case "posts":
        return <MyPostsScreen user={user} />;

      case "messages":
        return <MessagesScreen user={user} />;

      case "settings":
        return <SettingsScreen user={user} />;

      case "applications":
        return <ApplicationsScreen user={user} />;

      case "myApplications":
        return <MyApplicationsScreen />;

      case "createJob":
        return (
          <CreateJobScreen
            navigation={{
              goBack: () => setCurrentScreen("home"),
            }}
          />
        );

      case "myJobs":
        return <MyJobsScreen />;

      case "reviews":
        return <MyReviewsScreen />;

      // ✅ STEP 7
      case "addMaterial":
        return <AddMaterialScreen />;

      case "myMaterials":
        return <MyMaterialsScreen />;

      default:
        return renderHome();
    }
  };

  const renderHome = () => (
    <ScrollView style={styles.feed}>

      <Text style={styles.title}>
        Available Jobs
      </Text>

      {jobs.length === 0 ? (

        <Text style={styles.text}>
          No jobs available
        </Text>

      ) : (

        jobs.map((job) => (

          <Card
            key={job.job_id}
            style={styles.card}
          >

            <Card.Title
              title={job.title}
              subtitle={job.name}
              left={(props) => (
                <Avatar.Icon
                  {...props}
                  icon="briefcase"
                />
              )}
            />

            <Card.Content>

              <Text style={styles.text}>
                {job.description}
              </Text>

              <Text style={styles.text}>
                Budget: Rs. {job.budget}
              </Text>

            </Card.Content>

            {user?.role === "ServiceProvider" && (

              <Card.Actions>

                <Button
                  mode="contained"
                  onPress={() =>
                    handleApply(job.job_id)
                  }
                >
                  Apply
                </Button>

              </Card.Actions>

            )}

          </Card>

        ))
      )}

    </ScrollView>
  );

  return (
    <View style={styles.container}>

      {/* HEADER */}
      <View style={styles.header}>

        <IconButton
          icon="menu"
          size={28}
          iconColor="#fff"
          onPress={() =>
            setDrawerOpen(!drawerOpen)
          }
        />

        <Text style={styles.headerTitle}>
          FurniConnect
        </Text>

      </View>

      {/* DRAWER */}
      {drawerOpen && (

        <View style={styles.drawer}>

          <View style={styles.drawerHeader}>

            <Avatar.Icon
              size={60}
              icon="account"
            />

            <Text style={styles.drawerName}>
              {user?.name || "User"}
            </Text>

            <Text style={styles.drawerRole}>
              {user?.role || "Role"}
            </Text>

          </View>

          <Drawer.Section>

            <Drawer.Item
              label="Home"
              icon="home"
              onPress={() => {
                setCurrentScreen("home");
                setDrawerOpen(false);
              }}
            />

            <Drawer.Item
              label="My Profile"
              icon="account"
              onPress={() => {
                setCurrentScreen("profile");
                setDrawerOpen(false);
              }}
            />

            {/* 🔥 OWNER FEATURES */}
            {user?.role === "FurnitureOwner" && (
              <>

                <Drawer.Item
                  label="My Jobs"
                  icon="briefcase"
                  onPress={() => {
                    setCurrentScreen("myJobs");
                    setDrawerOpen(false);
                  }}
                />

                <Drawer.Item
                  label="Applications"
                  icon="clipboard-list"
                  onPress={() => {
                    setCurrentScreen("applications");
                    setDrawerOpen(false);
                  }}
                />

                <Drawer.Item
                  label="Create Job"
                  icon="plus"
                  onPress={() => {
                    setCurrentScreen("createJob");
                    setDrawerOpen(false);
                  }}
                />

              </>
            )}

            {/* 🔥 WORKER FEATURES */}
            {user?.role === "ServiceProvider" && (
              <>

                <Drawer.Item
                  label="My Applications"
                  icon="clipboard-list"
                  onPress={() => {
                    setCurrentScreen("myApplications");
                    setDrawerOpen(false);
                  }}
                />

                <Drawer.Item
                  label="Messages"
                  icon="message-text"
                  onPress={() => {
                    setCurrentScreen("messages");
                    setDrawerOpen(false);
                  }}
                />

              </>
            )}

            {/* ✅ STEP 8 SUPPLIER FEATURES */}
            {user?.role === "Supplier" && (
              <>

                <Drawer.Item
                  label="Add Material"
                  icon="plus-box"
                  onPress={() => {
                    setCurrentScreen("addMaterial");
                    setDrawerOpen(false);
                  }}
                />

                <Drawer.Item
                  label="My Materials"
                  icon="cube"
                  onPress={() => {
                    setCurrentScreen("myMaterials");
                    setDrawerOpen(false);
                  }}
                />

              </>
            )}

            {/* ⭐ REVIEWS */}
            <Drawer.Item
              label="My Reviews"
              icon="star"
              onPress={() => {
                setCurrentScreen("reviews");
                setDrawerOpen(false);
              }}
            />

            {/* 🔥 LOGOUT */}
            <Drawer.Item
              label="Logout"
              icon="logout"
              onPress={() => setUser(null)}
            />

          </Drawer.Section>

        </View>
      )}

      {renderScreen()}

    </View>
  );
}


// 🎨 STYLES
const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: COLORS.background
  },

  header: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    backgroundColor: "#1f1f1f"
  },

  headerTitle: {
    color: "#fff",
    fontSize: 20
  },

  drawer: {
    position: "absolute",
    top: 60,
    left: 0,
    width: 250,
    backgroundColor: "#1e1e1e",
    height: "100%",
    zIndex: 10
  },

  drawerHeader: {
    alignItems: "center",
    padding: 20
  },

  drawerName: {
    color: "#fff",
    marginTop: 10,
    fontSize: 16,
    fontWeight: "bold"
  },

  drawerRole: {
    color: "gray"
  },

  feed: {
    padding: 15
  },

  title: {
    fontSize: 26,
    fontWeight: "bold",
    color: COLORS.accent,
    marginBottom: 15
  },

  card: {
    marginBottom: 15,
    backgroundColor: "#2a2a2a"
  },

  text: {
    color: "#fff"
  }

});