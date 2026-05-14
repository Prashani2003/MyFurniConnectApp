import React, {
  useEffect,
  useState
} from "react";

import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  ActivityIndicator,
  TouchableOpacity
} from "react-native";

import API from "../services/api";

import {
  COLORS
} from "../theme/colors";

export default function UserProfileScreen({
  route,
  currentUser
}) {

  

const userId =
  route?.params?.userId ||
  currentUser?.id;

console.log(
  "ROUTE PARAMS:",
  route?.params
);

console.log(
  "USER ID:",
  userId
);
  const [user, setUser] =
    useState(null);

  const [works, setWorks] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {

    fetchProfile();

  }, []);

  const fetchProfile = async () => {

    try {

      const res =
        await API.get(
          `/users/${userId}`
        );

      setUser(res.data.user);

      setWorks(
        res.data.works || []
      );

    } catch (err) {

      console.log(
        "PROFILE ERROR:",
        err.response?.data ||
        err.message
      );

    } finally {

      setLoading(false);

    }

  };

  // LOADING

  if (loading) {

    return (

      <View style={styles.loadingContainer}>

        <ActivityIndicator
          size="large"
          color={COLORS.accent}
        />

      </View>

    );

  }

  // USER NOT FOUND

  if (!user) {

    return (

      <View style={styles.loadingContainer}>

        <Text style={styles.errorText}>
          User not found
        </Text>

      </View>

    );

  }

  return (

    <ScrollView
      style={styles.container}
      showsVerticalScrollIndicator={false}
    >

      {/* PROFILE */}

      <View style={styles.profileSection}>

        <Image
          source={{
            uri:
              user.profile_image
                ? `http://192.168.1.3:5000/uploads/${user.profile_image}`
                : "https://cdn-icons-png.flaticon.com/512/149/149071.png"
          }}
          style={styles.profileImage}
        />

        <Text style={styles.name}>
          {user.name}
        </Text>

        <Text style={styles.role}>
          {user.role}
        </Text>

      </View>

      {/* BIO */}

      <View style={styles.card}>

        <Text style={styles.cardTitle}>
          Bio
        </Text>

        <Text style={styles.cardText}>
          {user.bio || "No bio added"}
        </Text>

      </View>

      {/* CONTACT */}

      <View style={styles.card}>

        <Text style={styles.cardTitle}>
          Contact
        </Text>

        <Text style={styles.cardText}>
          {user.contact || user.email || "No contact info"}
        </Text>

      </View>

      {/* WORK TITLE */}

      <Text style={styles.workTitle}>
  All Works
</Text>

<TouchableOpacity
  onPress={() => {

    navigation.navigate(
      "ChatScreen",
      {
        userId
      }
    );

  }}
>
  <Text>
    Message
  </Text>
</TouchableOpacity>
      {/* WORK LIST */}

      {works.map((work) => {

        let imageArray = [];

        try {

          imageArray =
            work.images
              ? JSON.parse(work.images)
              : [];

        } catch {

          imageArray = [];

        }

        const firstImage =
          imageArray.length > 0
            ? imageArray[0]
            : null;

        return (

          <View
            key={work.work_id}
            style={styles.workCard}
          >

            <Image
              source={{
                uri:
                  firstImage
                    ? `http://192.168.1.3:5000/uploads/${firstImage}`
                    : "https://via.placeholder.com/300"
              }}
              style={styles.workImage}
            />

            <View style={styles.workContent}>

              <Text style={styles.workName}>
                {work.title}
              </Text>

              <Text style={styles.workDesc}>
                {work.description}
              </Text>

            </View>

          </View>

        );

      })}

    </ScrollView>

  );

}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: COLORS.background,
    padding: 20
  },

  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: COLORS.background
  },

  errorText: {
    color: "white",
    fontSize: 18
  },

  profileSection: {
    alignItems: "center",
    marginBottom: 25
  },

  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 15
  },

  name: {
    color: "white",
    fontSize: 28,
    fontWeight: "bold"
  },

  role: {
    color: COLORS.accent,
    fontSize: 18,
    marginTop: 5
  },

  card: {
    backgroundColor: "#1e1e1e",
    padding: 18,
    borderRadius: 15,
    marginBottom: 15
  },

  cardTitle: {
    color: COLORS.accent,
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 8
  },

  cardText: {
    color: "white",
    fontSize: 15,
    lineHeight: 22
  },

  workTitle: {
    color: COLORS.accent,
    fontSize: 30,
    fontWeight: "bold",
    marginTop: 10,
    marginBottom: 20
  },

  workCard: {
    backgroundColor: "#1e1e1e",
    borderRadius: 20,
    overflow: "hidden",
    marginBottom: 20
  },

  workImage: {
    width: "100%",
    height: 220
  },

  workContent: {
    padding: 15
  },

  workName: {
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 8
  },

  workDesc: {
    color: "#ccc",
    fontSize: 15
  }

});