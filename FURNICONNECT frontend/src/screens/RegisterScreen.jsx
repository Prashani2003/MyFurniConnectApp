import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity
} from "react-native";

import {
  Button,
  Menu
} from "react-native-paper";

import API from "../services/api";
import { COLORS } from "../theme/colors";

export default function RegisterScreen({ navigation }) {

  const [name, setName] =
    useState("");

  const [email, setEmail] =
    useState("");

  const [password, setPassword] =
    useState("");

  const [role, setRole] =
    useState("");

  // ✅ NEW
  const [
    serviceType,
    setServiceType
  ] = useState("");

  const [visible, setVisible] =
    useState(false);

  // ✅ NEW
  const [
    serviceVisible,
    setServiceVisible
  ] = useState(false);

  const handleRegister =
    async () => {

      try {

        if (!role)
          return alert(
            "Please select a role"
          );

        // ✅ CHECK SERVICE TYPE
        if (
          role === "ServiceProvider" &&
          !serviceType
        ) {
          return alert(
            "Please select service type"
          );
        }

        await API.post(
          "/auth/register",
          {
            name,
            email,
            password,
            role,

            // ✅ NEW
            service_type:
              serviceType,
          }
        );

        alert(
          "Registered successfully"
        );

        navigation.replace(
          "Login"
        );

      } catch (err) {

        console.log(
          err.response?.data ||
          err.message
        );

        alert(
          err.response?.data
            ?.message ||
          "Register failed"
        );

      }

    };

  return (

    <View style={styles.container}>

      <Text style={styles.title}>
        Register
      </Text>

      <TextInput
        placeholder="Name"
        style={styles.input}
        value={name}
        onChangeText={setName}
      />

      <TextInput
        placeholder="Email"
        style={styles.input}
        value={email}
        onChangeText={setEmail}
      />

      <TextInput
        placeholder="Password"
        secureTextEntry
        style={styles.input}
        value={password}
        onChangeText={setPassword}
      />

      {/* ROLE MENU */}

      <Menu
        visible={visible}
        onDismiss={() =>
          setVisible(false)
        }
        anchor={
          <Button
            mode="outlined"
            onPress={() =>
              setVisible(true)
            }
          >
            {role ||
              "Select Role"}
          </Button>
        }
      >

        <Menu.Item
          title="Supplier"
          onPress={() => {
            setRole("Supplier");
            setVisible(false);

            // RESET
            setServiceType("");
          }}
        />

        <Menu.Item
          title="ServiceProvider"
          onPress={() => {
            setRole(
              "ServiceProvider"
            );
            setVisible(false);
          }}
        />

        <Menu.Item
          title="FurnitureOwner"
          onPress={() => {
            setRole(
              "FurnitureOwner"
            );
            setVisible(false);

            // RESET
            setServiceType("");
          }}
        />

      </Menu>

      {/* ✅ SERVICE TYPE MENU */}

      {role ===
        "ServiceProvider" && (

          <Menu
            visible={
              serviceVisible
            }

            onDismiss={() =>
              setServiceVisible(
                false
              )
            }

            anchor={
              <Button
                mode="outlined"
                style={{
                  marginTop: 15
                }}

                onPress={() =>
                  setServiceVisible(
                    true
                  )
                }
              >

                {serviceType ||
                  "Select Service Type"}

              </Button>
            }
          >

            <Menu.Item
              title="Carpenter"
              onPress={() => {
                setServiceType(
                  "carpenter"
                );

                setServiceVisible(
                  false
                );
              }}
            />

            <Menu.Item
              title="Spray Worker"
              onPress={() => {
                setServiceType(
                  "sprayworker"
                );

                setServiceVisible(
                  false
                );
              }}
            />

            <Menu.Item
              title="Cushion Worker"
              onPress={() => {
                setServiceType(
                  "cushionworker"
                );

                setServiceVisible(
                  false
                );
              }}
            />

          </Menu>

        )}

      <Button
        mode="contained"
        style={{
          marginTop: 20
        }}
        onPress={handleRegister}
      >
        Register
      </Button>

      <TouchableOpacity
        onPress={() =>
          navigation.navigate(
            "Login"
          )
        }
      >

        <Text style={styles.link}>

          Already have an account?
          Login

        </Text>

      </TouchableOpacity>

    </View>

  );

}

const styles =
  StyleSheet.create({

    container: {
      flex: 1,
      justifyContent:
        "center",
      padding: 20,
      backgroundColor:
        COLORS.background
    },

    title: {
      fontSize: 30,
      textAlign: "center",
      marginBottom: 30,
      color: COLORS.accent
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
      color: COLORS.accent
    },

  });