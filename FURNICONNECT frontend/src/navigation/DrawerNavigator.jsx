import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";

import HomeScreen from "../screens/HomeScreen";
import ProfileScreen from "../screens/ProfileScreen";
import MyPostsScreen from "../screens/MyPostsScreen";

const Drawer = createDrawerNavigator();

export default function DrawerNavigator() {
  return (
    <Drawer.Navigator
      screenOptions={{
        headerStyle:{backgroundColor:"#1f1f1f"},
        headerTintColor:"#fff",
        drawerStyle:{backgroundColor:"#121212"},
        drawerLabelStyle:{color:"#fff"}
      }}
    >

      <Drawer.Screen name="Home" component={HomeScreen} />
      <Drawer.Screen name="My Profile" component={ProfileScreen} />
      <Drawer.Screen name="My Posts" component={MyPostsScreen} />
      <Drawer.Screen name="Messages" component={HomeScreen} />
      <Drawer.Screen name="Settings" component={HomeScreen} />
      <Drawer.Screen name="Logout" component={HomeScreen} />

    </Drawer.Navigator>
  );
}