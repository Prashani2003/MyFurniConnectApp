import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";

import HomeScreen from "../screens/HomeScreen";
import MyPostsScreen from "../screens/MyPostsScreen";

const Drawer = createDrawerNavigator();

export default function SupplierDrawer() {
  return (
    <Drawer.Navigator>
      <Drawer.Screen name="Home" component={HomeScreen} />
      <Drawer.Screen name="My Materials" component={MyPostsScreen} />
    </Drawer.Navigator>
  );
}