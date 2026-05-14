import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";

import HomeScreen from "../screens/HomeScreen";
import MyPostsScreen from "../screens/MyPostsScreen";
import ApplicationsScreen from "../screens/ApplicationsScreen";

const Drawer = createDrawerNavigator();

export default function OwnerDrawer() {
  return (
    <Drawer.Navigator>
      <Drawer.Screen name="Home" component={HomeScreen} />
      <Drawer.Screen name="My Jobs" component={MyPostsScreen} />
      <Drawer.Screen name="Applications"  component={ApplicationsScreen} 
/>
    </Drawer.Navigator>
  );
}