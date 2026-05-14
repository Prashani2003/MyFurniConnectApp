import React, {
  useState
} from "react";

import AsyncStorage from
  "@react-native-async-storage/async-storage";

import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  TouchableOpacity
} from "react-native";

import API, {
  setAuthToken
} from "../services/api";

import {
  COLORS
} from "../theme/colors";

export default function LoginScreen({
  navigation,
  setUser
}) {

  const [email, setEmail] =
    useState("");

  const [
    password,
    setPassword
  ] = useState("");

  const handleLogin =
    async () => {

      try {

        const res =
          await API.post(
            "/auth/login",
            {
              email,
              password,
            }
          );

        const {
          token,
          user
        } = res.data;

        // 🔥 DEBUG
        console.log(
          "LOGIN USER:",
          user
        );

        // 🔥 SAVE TOKEN
        await AsyncStorage.setItem(
          "token",
          token
        );

        // 🔥 SET TOKEN

        setAuthToken(token);

        console.log(
          "LOGIN RESPONSE:",
          res.data
        );

        // 🔥 FIX USER ID ERROR
        setUser({
          user_id: user.id,
          id: user.id,
          name: user.name,
          email: user.email,
          role: user.role,
          profile_image:
            user.profile_image,
          bio: user.bio,
          contact: user.contact,
          rating: user.rating,
        });

        console.log(
          "LOGIN SUCCESS"
        );

      } catch (err) {

        console.log(
          "LOGIN ERROR:",
          err.response?.data ||
          err.message
        );

        alert("Login failed");

      }

    };

  return (

    <View style={styles.container}>

      <Text style={styles.title}>
        Login
      </Text>

      <TextInput
        placeholder="Email"
        placeholderTextColor="#aaa"
        style={styles.input}
        value={email}
        onChangeText={setEmail}
      />

      <TextInput
        placeholder="Password"
        placeholderTextColor="#aaa"
        secureTextEntry
        style={styles.input}
        value={password}
        onChangeText={setPassword}
      />

      <Button
        title="Login"
        onPress={handleLogin}
      />

      <TouchableOpacity
        onPress={() =>
          navigation.navigate(
            "Register"
          )
        }
      >

        <Text style={styles.link}>

          Don't have an account?
          Register

        </Text>

      </TouchableOpacity>

    </View>

  );

}

// 🎨 STYLES

const styles =
  StyleSheet.create({

    container: {
      flex: 1,
      justifyContent:
        "center",
      padding: 20,
      backgroundColor:
        COLORS.background,
    },

    title: {
      fontSize: 30,
      textAlign: "center",
      marginBottom: 30,
      color: COLORS.accent,
    },

    input: {
      borderWidth: 1,
      borderColor: "#444",
      padding: 12,
      marginBottom: 15,
      borderRadius: 6,
      color: "white",
      backgroundColor:
        "#2c2c2c",
    },

    link: {
      marginTop: 20,
      textAlign: "center",
      color: COLORS.accent,
    },

  });