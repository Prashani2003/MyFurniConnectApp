import React, {
  useState,
  useEffect
} from "react";

import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Alert,
  TouchableOpacity
} from "react-native";

import {
  Card,
  Avatar,
  IconButton,
  Drawer,
  Button
} from "react-native-paper";

import MaterialCommunityIcons from
  "react-native-vector-icons/MaterialCommunityIcons";

import ProfileScreen from "./UserProfileScreen";
import MyPostsScreen from "./MyPostsScreen";
import SettingsScreen from "./SettingsScreen";
import ApplicationsScreen from "./ApplicationsScreen";
import CreateJobScreen from "./CreateJobScreen";
import MyJobsScreen from "./MyJobsScreen";
import MyApplicationsScreen from "./MyApplicationsScreen";
import MyReviewsScreen from "./MyReviewsScreen";

import AddMaterialScreen from "./AddMaterialScreen";
import MyMaterialsScreen from "./MyMaterialsScreen";
import AddWorkPostScreen from "./AddWorkPostScreen";

import AIScreen from "./AIScreen";

import AdminDrawer from "../navigation/AdminDrawer";

import {
  getJobs,
  applyJob,
  getMaterials,
  getServicePosts
} from "../services/api";

import { COLORS } from "../theme/colors";

const BASE_URL =
  "http://192.168.1.3:5000";

export default function HomeScreen({
  navigation,
  user,
  setUser
}) {

  const [drawerOpen,
    setDrawerOpen] =
    useState(false);

  const [currentScreen,
    setCurrentScreen] =
    useState("home");

  const [jobs, setJobs] =
    useState([]);

  const [materials,
    setMaterials] =
    useState([]);

  const [servicePosts,
    setServicePosts] =
    useState([]);

  const [selectedTab,
    setSelectedTab] =
    useState("jobs");

  // LOAD DATA

const loadAllData =
  async () => {

    try {

      const jobsRes =
        await getJobs();

      setJobs(
        jobsRes.data || []
      );

      const materialsRes =
        await getMaterials();

      setMaterials(
        materialsRes.data || []
      );

      const serviceRes =
        await getServicePosts();

      setServicePosts(
        serviceRes.data || []
      );

    } catch (err) {

      console.log(
        "LOAD ERROR:",
        err.response?.data ||
        err.message
      );

    }

  };

// ======================
// USE EFFECT
// ======================

useEffect(() => {

  loadAllData();

}, []);

// ======================
// ADMIN
// ======================

if (user?.role === "admin") {

  return (
    <AdminDrawer
      setUser={setUser}
    />
  );

}

  

  // APPLY JOB

  const handleApply =
    async (jobId) => {

      try {

        await applyJob(jobId);

        Alert.alert(
          "Success",
          "Applied successfully"
        );

        loadAllData();

      } catch (err) {

        Alert.alert(
          "Error",
          err?.response?.data?.error ||
          "Something went wrong"
        );

      }

    };

  // SCREEN SWITCH

  const renderScreen = () => {

    switch (currentScreen) {

      case "profile":
        return (
          <ProfileScreen
            user={user}
          />
        );

      case "posts":
        return (
          <MyPostsScreen
            user={user}
          />
        );

      case "settings":
        return (
          <SettingsScreen
            user={user}
          />
        );

      case "applications":
        return (
          <ApplicationsScreen
            user={user}
          />
        );

      case "myApplications":
        return (
          <MyApplicationsScreen />
        );

      case "createJob":
        return (

          <CreateJobScreen
            navigation={{
              goBack: () =>
                setCurrentScreen(
                  "home"
                )
            }}
          />

        );

      case "myJobs":
        return <MyJobsScreen />;

      case "reviews":
        return <MyReviewsScreen />;

      case "addMaterial":
        return (
          <AddMaterialScreen />
        );

      case "myMaterials":
        return (
          <MyMaterialsScreen />
        );

      case "addWork":
        return (
          <AddWorkPostScreen />
        );

      case "ai":
        return (
          <AIScreen />
        );

      default:
        return renderHome();

    }

  };

  // HOME

  const renderHome = () => (

    <ScrollView
      style={styles.feed}
      showsVerticalScrollIndicator={false}
    >

      {/* LOGO */}

      <View
        style={styles.logoContainer}
      >

        <MaterialCommunityIcons
          name="sofa"
          size={50}
          color="#C19A6B"
        />

        <Text style={styles.mainTitle}>
          Welcome to FurniConnect
        </Text>

        <Text style={styles.subTitle}>
          Your Smart Wood Industry Marketplace
        </Text>

      </View>

      {/* TABS */}

      <View style={styles.tabContainer}>

        <Button
          mode="text"
          textColor={
            selectedTab === "jobs"
              ? "#C19A6B"
              : "#888"
          }
          style={styles.tabButton}
          labelStyle={[
            styles.tabLabel,

            selectedTab === "jobs" &&
            styles.activeTabLabel
          ]}
          onPress={() =>
            setSelectedTab("jobs")
          }
        >
          Jobs
        </Button>

        <Button
          mode="text"
          textColor={
            selectedTab === "works"
              ? "#C19A6B"
              : "#888"
          }
          style={styles.tabButton}
          labelStyle={[
            styles.tabLabel,

            selectedTab === "works" &&
            styles.activeTabLabel
          ]}
          onPress={() =>
            setSelectedTab("works")
          }
        >
          Works
        </Button>

        <Button
          mode="text"
          textColor={
            selectedTab === "materials"
              ? "#C19A6B"
              : "#888"
          }
          style={styles.tabButton}
          labelStyle={[
            styles.tabLabel,

            selectedTab ===
            "materials" &&
            styles.activeTabLabel
          ]}
          onPress={() =>
            setSelectedTab(
              "materials"
            )
          }
        >
          Materials
        </Button>

      </View>

      {/* JOBS */}

      {selectedTab === "jobs" && (

        <>

          <Text
            style={styles.sectionTitle}
          >
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
                style={styles.modernCard}
              >

                <Card.Content>

                  <View
                    style={styles.cardHeader}
                  >

                    <Avatar.Icon
                      size={45}
                      icon="briefcase"
                      style={styles.avatar}
                    />

                    <View
                      style={{ flex: 1 }}
                    >

                      <Text
                        style={styles.cardTitle}
                      >
                        {job.title}
                      </Text>

                      <Text
                        style={styles.cardSubtitle}
                      >
                        Posted by {job.name}
                      </Text>

                    </View>

                  </View>

                  <Text
                    style={
                      styles.cardDescription
                    }
                  >
                    {job.description}
                  </Text>

                  <Text
                    style={styles.cardPrice}
                  >
                    Budget :
                    Rs. {job.budget}
                  </Text>

                </Card.Content>

                {(user?.role ===
                  "ServiceProvider" ||
                  user?.role ===
                  "Supplier") && (

                    <Card.Actions>

                      <Button
                        mode="contained"
                        buttonColor="#C19A6B"
                        textColor="#000"
                        style={
                          styles.applyButton
                        }
                        onPress={() =>
                          handleApply(
                            job.job_id
                          )
                        }
                      >
                        Apply Now
                      </Button>

                    </Card.Actions>

                  )}

              </Card>

            ))

          )}

        </>

      )}

      {/* WORKS */}

      {selectedTab === "works" && (

        <>

          <Text
            style={styles.sectionTitle}
          >
            Service Provider Works
          </Text>

          {servicePosts.length === 0 ? (

            <Text style={styles.text}>
              No service posts available
            </Text>

          ) : (

            servicePosts.map((post) => {

              let imageArray = [];

              try {

                imageArray =
                  JSON.parse(
                    post.images
                  );

              } catch {

                imageArray = [];

              }

              const firstImage =
                imageArray[0];

              return (

                <Card
                  key={post.work_id}
                  style={styles.modernCard}
                >

                  {firstImage && (

                    <Card.Cover
                      source={{
                        uri:
                          `${BASE_URL}/uploads/${firstImage}`
                      }}
                      style={
                        styles.cardImage
                      }
                    />

                  )}

                  <Card.Content>

                    <View
                      style={styles.cardHeader}
                    >

                      <Avatar.Icon
                        size={45}
                        icon="hammer"
                        style={
                          styles.avatar
                        }
                      />

                      <View
                        style={{ flex: 1 }}
                      >

                        <Text
                          style={
                            styles.cardTitle
                          }
                        >
                          {post.title}
                        </Text>

                        <TouchableOpacity
                          onPress={() => {

                            console.log(
                              "POST USER ID:",
                              post.user_id
                            );

                            navigation.navigate(
                              "UserProfile",
                              {
                                userId:
                                  post.user_id
                              }
                            );

                          }}
                        >
                          <Text
                            style={
                              styles.cardSubtitle
                            }
                          >
                            {post.name}
                          </Text>

                        </TouchableOpacity>

                      </View>

                    </View>

                    <Text
                      style={
                        styles.cardDescription
                      }
                    >
                      {post.description}
                    </Text>

                  </Card.Content>

                </Card>

              );

            })

          )}

        </>

      )}

      {/* MATERIALS */}

      {selectedTab ===
        "materials" && (

          <>

            <Text
              style={styles.sectionTitle}
            >
              Available Materials
            </Text>

            {materials.length === 0 ? (

              <Text style={styles.text}>
                No materials available
              </Text>

            ) : (

              materials.map((item) => (

                <Card
                  key={item.material_id}
                  style={styles.modernCard}
                >

                  <Card.Cover
                    source={{
                      uri:
                        item.image
                          ? `${BASE_URL}/uploads/${item.image}`
                          : "https://images.unsplash.com/photo-1519710164239-da123dc03ef4"
                    }}
                    style={styles.cardImage}
                  />

                  <Card.Content>

                    <View
                      style={styles.cardHeader}
                    >

                      <Avatar.Icon
                        size={45}
                        icon="cube"
                        style={
                          styles.avatar
                        }
                      />

                      <View
                        style={{ flex: 1 }}
                      >

                        <Text
                          style={
                            styles.cardTitle
                          }
                        >
                          {item.title}
                        </Text>

                        <Text
                          style={
                            styles.cardSubtitle
                          }
                        >
                          Supplier :
                          {" "}
                          {item.name}
                        </Text>

                      </View>

                    </View>

                    <Text
                      style={
                        styles.cardDescription
                      }
                    >
                      {item.description}
                    </Text>

                    <Text
                      style={styles.cardPrice}
                    >
                      Price :
                      Rs. {item.price}
                    </Text>

                  </Card.Content>

                  <Card.Actions>

                    <Button
                      mode="contained"
                      buttonColor="#C19A6B"
                      onPress={() =>
                        navigation.navigate(
                          "Chat",
                          {
                            receiverId:
                              item.user_id
                          }
                        )
                      }
                    >
                      Message Supplier
                    </Button>

                  </Card.Actions>

                </Card>

              ))

            )}

          </>

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
            setDrawerOpen(
              !drawerOpen
            )
          }
        />

        <Text
          style={styles.headerTitle}
        >
          FurniConnect
        </Text>

      </View>

      {/* DRAWER */}

      {drawerOpen && (

        <View style={styles.drawer}>

          <View
            style={styles.drawerHeader}
          >

            <Avatar.Icon
              size={60}
              icon="account"
            />

            <Text
              style={styles.drawerName}
            >
              {user?.name || "User"}
            </Text>

            <Text
              style={styles.drawerRole}
            >
              {user?.role || "Role"}
            </Text>

          </View>

          <Drawer.Section>

            <Drawer.Item
              label="Home"
              icon="home"
              onPress={() => {

                setCurrentScreen(
                  "home"
                );

                setDrawerOpen(false);

              }}
            />

            <Drawer.Item
              label="My Profile"
              icon="account"
              onPress={() => {

                setCurrentScreen(
                  "profile"
                );

                setDrawerOpen(false);

              }}
            />

            {user?.role ===
              "FurnitureOwner" && (

                <>

                  <Drawer.Item
                    label="My Jobs"
                    icon="briefcase"
                    onPress={() => {

                      setCurrentScreen(
                        "myJobs"
                      );

                      setDrawerOpen(false);

                    }}
                  />

                  <Drawer.Item
                    label="Applications"
                    icon="clipboard-list"
                    onPress={() => {

                      setCurrentScreen(
                        "applications"
                      );

                      setDrawerOpen(false);

                    }}
                  />

                  <Drawer.Item
                    label="Create Job"
                    icon="plus"
                    onPress={() => {

                      setCurrentScreen(
                        "createJob"
                      );

                      setDrawerOpen(false);

                    }}
                  />

                </>

              )}

            {user?.role ===
              "ServiceProvider" && (

                <>

                  <Drawer.Item
                    label="Add Work Post"
                    icon="hammer"
                    onPress={() => {

                      setCurrentScreen(
                        "addWork"
                      );

                      setDrawerOpen(false);

                    }}
                  />

                  <Drawer.Item
                    label="My Applications"
                    icon="clipboard-list"
                    onPress={() => {

                      setCurrentScreen(
                        "myApplications"
                      );

                      setDrawerOpen(false);

                    }}
                  />

                </>

              )}

            {user?.role ===
              "Supplier" && (

                <>

                  <Drawer.Item
                    label="Add Material"
                    icon="plus-box"
                    onPress={() => {

                      setCurrentScreen(
                        "addMaterial"
                      );

                      setDrawerOpen(false);

                    }}
                  />

                  <Drawer.Item
                    label="My Materials"
                    icon="cube"
                    onPress={() => {

                      setCurrentScreen(
                        "myMaterials"
                      );

                      setDrawerOpen(false);

                    }}
                  />

                </>

              )}

            <Drawer.Item
              label="AI Assistant"
              icon="robot"
              onPress={() => {

                setCurrentScreen(
                  "ai"
                );

                setDrawerOpen(false);

              }}
            />

            <Drawer.Item
              label="My Reviews"
              icon="star"
              onPress={() => {

                setCurrentScreen(
                  "reviews"
                );

                setDrawerOpen(false);

              }}
            />

            <Drawer.Item
              label="Logout"
              icon="logout"
              onPress={() =>
                setUser(null)
              }
            />

          </Drawer.Section>

        </View>

      )}

      {renderScreen()}

    </View>

  );

}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor:
      COLORS.background
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

  logoContainer: {
    alignItems: "center",
    marginBottom: 25,
    marginTop: 10
  },

  mainTitle: {
    fontSize: 36,
    fontWeight: "900",
    color: "#C19A6B",
    textAlign: "center",
    letterSpacing: 2
  },

  subTitle: {
    color: "#d6d6d6",
    textAlign: "center",
    fontSize: 17,
    marginTop: 10,
    fontStyle: "italic",
    letterSpacing: 1
  },

  tabContainer: {
    flexDirection: "row",
    justifyContent:
      "space-around",
    alignItems: "center",
    marginBottom: 25,
    marginTop: 10,
    borderBottomWidth: 1,
    borderBottomColor:
      "rgba(255,255,255,0.1)"
  },

  tabButton: {
    flex: 1,
    borderRadius: 0
  },

  tabLabel: {
    fontSize: 16,
    fontWeight: "600",
    paddingBottom: 10
  },

  activeTabLabel: {
    borderBottomWidth: 3,
    borderBottomColor:
      "#C19A6B",
    color: "#C19A6B"
  },

  sectionTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#C19A6B",
    marginBottom: 15,
    marginTop: 20
  },

  modernCard: {
    marginBottom: 35,
    backgroundColor: "#1a1a1f",
    borderRadius: 20,
    overflow: "hidden",
    borderWidth: 1,
    borderColor:
      "rgba(255,255,255,0.15)"
  },

  cardImage: {
    height: 180
  },

  cardHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 15,
    marginBottom: 10
  },

  avatar: {
    backgroundColor: "#C19A6B",
    marginRight: 12
  },

  cardTitle: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "bold"
  },

  cardSubtitle: {
    color: "#C19A6B",
    fontSize: 14,
    marginTop: 3
  },

  cardDescription: {
    color: "#ddd",
    marginTop: 10,
    fontSize: 15,
    lineHeight: 22
  },

  cardPrice: {
    color: "#C19A6B",
    fontSize: 17,
    fontWeight: "bold",
    marginTop: 15
  },

  applyButton: {
    borderRadius: 10,
    marginRight: 10,
    marginBottom: 10,
    paddingHorizontal: 10
  },

  text: {
    color: "#fff"
  }

});