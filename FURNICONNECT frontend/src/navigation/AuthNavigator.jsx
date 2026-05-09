import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import LoginScreen from "../screens/LoginScreen";
import RegisterScreen from "../screens/RegisterScreen";
import HomeScreen from "../screens/HomeScreen";
import ChatScreen from "../screens/ChatScreen";
import ReviewScreen from "../screens/ReviewScreen";
import UserProfileScreen from "../screens/UserProfileScreen";


const Stack = createStackNavigator();

export default function AuthNavigator({ user, setUser }) {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>

      {user ? (
        <>
          {/* 🔥 MAIN APP (DRAWER / HOME) */}
          <Stack.Screen name="Main">
            {(props) => (
              <HomeScreen {...props} user={user} setUser={setUser} />
            )}
          </Stack.Screen>

          {/* 🔥 CHAT SCREEN */}
          <Stack.Screen
            name="Chat"
            component={ChatScreen}
          />

          {/* 🔥 REVIEW SCREEN */}
          <Stack.Screen
            name="Review"
            component={ReviewScreen}
          />

          {/* 🔥 USER PROFILE */}
          <Stack.Screen
            name="UserProfile"
            component={UserProfileScreen}
            options={{
              headerShown: false
            }}
          />
        </>
      ) : (
        <>
          <Stack.Screen name="Login">
            {(props) => (
              <LoginScreen {...props} setUser={setUser} />
            )}
          </Stack.Screen>

          <Stack.Screen name="Register">
            {(props) => (
              <RegisterScreen {...props} setUser={setUser} />
            )}
          </Stack.Screen>
        </>
      )}

    </Stack.Navigator>
  );
}