import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import { createDrawerNavigator, DrawerContentScrollView, DrawerItem } from "@react-navigation/drawer";
import Icon from "react-native-vector-icons/MaterialIcons";

import HomeScreen from "../screens/HomeScreen";
import ProfileScreen from "../screens/ProfileScreen";
import MyPostsScreen from "../screens/MyPostsScreen";
import MessagesScreen from "../screens/MessagesScreen";
import SettingsScreen from "../screens/SettingsScreen";

const Drawer = createDrawerNavigator();

function CustomDrawerContent(props) {
  const { user, setUser } = props;

  const role = user.role?.toLowerCase();

  return (
    <DrawerContentScrollView {...props} style={{ backgroundColor: "#1e1e1e" }}>
      
      {/* 🔥 PROFILE SECTION */}
      <View style={styles.profileContainer}>
        <Image
          source={{ uri: "https://cdn-icons-png.flaticon.com/512/149/149071.png" }}
          style={styles.avatar}
        />
        <Text style={styles.name}>{user.name}</Text>
        <Text style={styles.role}>{user.role}</Text>
      </View>

      {/* 🔥 MENU ITEMS */}
      <DrawerItem
        label="Home"
        labelStyle={styles.label}
        icon={() => <Icon name="home" size={22} color="#fff" />}
        onPress={() => props.navigation.navigate("Home")}
      />

      <DrawerItem
        label="Profile"
        labelStyle={styles.label}
        icon={() => <Icon name="person" size={22} color="#fff" />}
        onPress={() => props.navigation.navigate("Profile")}
      />

      {/* ROLE BASED */}
      {role === "supplier" && (
        <DrawerItem
          label="My Posts"
          labelStyle={styles.label}
          icon={() => <Icon name="description" size={22} color="#fff" />}
          onPress={() => props.navigation.navigate("My Posts")}
        />
      )}

      {role === "serviceprovider" && (
        <DrawerItem
          label="Messages"
          labelStyle={styles.label}
          icon={() => <Icon name="chat" size={22} color="#fff" />}
          onPress={() => props.navigation.navigate("Messages")}
        />
      )}

      {role === "furnitureowner" && (
        <DrawerItem
          label="Settings"
          labelStyle={styles.label}
          icon={() => <Icon name="settings" size={22} color="#fff" />}
          onPress={() => props.navigation.navigate("Settings")}
        />
      )}

      {/* LOGOUT */}
      <DrawerItem
        label="Logout"
        labelStyle={styles.label}
        icon={() => <Icon name="logout" size={22} color="red" />}
        onPress={() => setUser(null)}
      />

    </DrawerContentScrollView>
  );
}

export default function DrawerNavigator({ user, setUser }) {
  if (!user) return null;

  return (
    <Drawer.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: "#111" },
        headerTintColor: "#fff",
        drawerStyle: { backgroundColor: "#1e1e1e" },
      }}
      drawerContent={(props) => (
        <CustomDrawerContent {...props} user={user} setUser={setUser} />
      )}
    >
      <Drawer.Screen name="Home" component={HomeScreen} />
      <Drawer.Screen name="Profile" component={ProfileScreen} />
      <Drawer.Screen name="My Posts" component={MyPostsScreen} />
      <Drawer.Screen name="Messages" component={MessagesScreen} />
      <Drawer.Screen name="Settings" component={SettingsScreen} />
    </Drawer.Navigator>
  );
}

const styles = StyleSheet.create({
  profileContainer: {
    padding: 20,
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: "#333",
    marginBottom: 10,
  },

  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginBottom: 10,
  },

  name: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },

  role: {
    color: "#aaa",
    marginTop: 5,
  },

  label: {
    color: "#fff",
    fontSize: 15,
  },
});