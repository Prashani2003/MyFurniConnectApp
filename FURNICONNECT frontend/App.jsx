import React, { useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import AuthNavigator from "./src/navigation/AuthNavigator";
import { Provider as PaperProvider } from "react-native-paper";

export default function App() {
  const [user, setUser] = useState(null);

  return (
    <PaperProvider>
      <NavigationContainer>
        <AuthNavigator user={user} setUser={setUser} />
      </NavigationContainer>
    </PaperProvider>
  );
}