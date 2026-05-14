import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";

import HomeScreen from "../screens/HomeScreen";
import MyPostsScreen from "../screens/MyPostsScreen";

const Drawer = createDrawerNavigator();

export default function WorkerDrawer() {
  return (
    <Drawer.Navigator>
      <Drawer.Screen name="Home" component={HomeScreen} />
      <Drawer.Screen name="Apply Jobs" component={MyPostsScreen} />
    </Drawer.Navigator>
  );
}