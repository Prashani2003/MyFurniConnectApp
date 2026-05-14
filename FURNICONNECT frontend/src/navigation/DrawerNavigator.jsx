import React from "react";

import {
  View,
  Text,
  StyleSheet,
  Image
} from "react-native";

import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItem
} from "@react-navigation/drawer";

import Icon from
  "react-native-vector-icons/MaterialIcons";

import HomeScreen from "../screens/HomeScreen";
import MyPostsScreen from "../screens/MyPostsScreen";
import SettingsScreen from "../screens/SettingsScreen";
import MyReviewsScreen from "../screens/MyReviewsScreen";
import AIScreen from "../screens/AIScreen";
import ChatScreen from "../screens/ChatScreen";
import MessagesScreen from "../screens/MessagesScreen";

const Drawer =
  createDrawerNavigator();

function CustomDrawerContent(
  props
) {

  const {
    user,
    setUser
  } = props;

  const role =
    user?.role
      ?.toLowerCase()
      ?.replace(/\s/g, "");

  return (

    <DrawerContentScrollView
      {...props}
      style={{
        backgroundColor:
          "#1e1e1e"
      }}
    >

      {/* PROFILE SECTION */}

      <View
        style={
          styles.profileContainer
        }
      >

        <Image
          source={{
            uri:
              user?.profile_image
                ? user.profile_image
                : "https://cdn-icons-png.flaticon.com/512/149/149071.png"
          }}
          style={styles.avatar}
        />

        <Text style={styles.name}>
          {user?.name}
        </Text>

        <Text style={styles.role}>
          {user?.role}
        </Text>

        {user?.service_type && (

          <Text style={styles.serviceType}>

            {user?.service_type}

          </Text>

        )}

      </View>

      {/* HOME */}

      <DrawerItem
        label="Home"
        labelStyle={
          styles.label
        }
        icon={() => (
          <Icon
            name="home"
            size={22}
            color="#fff"
          />
        )}
        onPress={() =>
          props.navigation.navigate(
            "Home"
          )
        }
      />

      {/* MESSAGES */}

      <DrawerItem
        label="Messages"
        labelStyle={
          styles.label
        }
        icon={() => (
          <Icon
            name="chat"
            size={22}
            color="#fff"
          />
        )}
        onPress={() =>
          props.navigation.navigate(
            "Messages"
          )
        }
      />


      {/* SUPPLIER */}

      {role ===
        "supplier" && (

          <DrawerItem
            label="My Posts"
            labelStyle={
              styles.label
            }
            icon={() => (
              <Icon
                name="description"
                size={22}
                color="#fff"
              />
            )}
            onPress={() =>
              props.navigation.navigate(
                "My Posts"
              )
            }
          />

        )}

      {/* FURNITURE OWNER */}

      {role ===
        "furnitureowner" && (

          <DrawerItem
            label="Settings"
            labelStyle={
              styles.label
            }
            icon={() => (
              <Icon
                name="settings"
                size={22}
                color="#fff"
              />
            )}
            onPress={() =>
              props.navigation.navigate(
                "Settings"
              )
            }
          />

        )}

      {/* MY REVIEWS */}

      {role !==
        "furnitureowner" && (

          <DrawerItem
            label="My Reviews"
            labelStyle={styles.label}
            icon={() => (
              <Icon
                name="star"
                size={22}
                color="#fff"
              />
            )}
            onPress={() =>
              props.navigation.navigate(
                "My Reviews"
              )
            }
          />

        )}

      {/* LOGOUT */}

      <DrawerItem
        label="Logout"
        labelStyle={
          styles.label
        }
        icon={() => (
          <Icon
            name="logout"
            size={22}
            color="red"
          />
        )}
        onPress={() =>
          setUser(null)
        }
      />

    </DrawerContentScrollView>

  );

}

export default function DrawerNavigator({
  user,
  setUser
}) {

  if (!user) return null;

  return (

    <Drawer.Navigator

      screenOptions={{
        headerStyle: {
          backgroundColor: "#111"
        },

        headerTintColor: "#fff",

        drawerStyle: {
          backgroundColor: "#1e1e1e"
        }
      }}

      drawerContent={(props) => (

        <CustomDrawerContent
          {...props}
          user={user}
          setUser={setUser}
        />

      )}

    >

      {/* HOME */}
      <Drawer.Screen
        name="Home"
        component={HomeScreen}
      />

      {/* MESSAGES */}
      <Drawer.Screen
        name="Messages"
        component={MessagesScreen}
      />


      {/* MY POSTS */}
      <Drawer.Screen
        name="My Posts"
        component={MyPostsScreen}
      />

      {/* REVIEWS */}
      <Drawer.Screen
        name="My Reviews"
        component={MyReviewsScreen}
      />

      {/* SETTINGS */}
      <Drawer.Screen
        name="Settings"
        component={SettingsScreen}
      />

      {/* AI */}
      <Drawer.Screen
        name="AI Assistant"
        component={AIScreen}
      />

    </Drawer.Navigator>

  );

}

const styles = StyleSheet.create({

  profileContainer: {
    padding: 20,
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: "#333",
    marginBottom: 10
  },

  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginBottom: 10
  },

  name: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold"
  },

  role: {
    color: "#aaa",
    marginTop: 5,
    fontSize: 16
  },

  serviceType: {
    color: "#c9a46c",
    marginTop: 3,
    fontSize: 14,
    textTransform: "capitalize"
  },

  label: {
    color: "#fff",
    fontSize: 15
  }

});