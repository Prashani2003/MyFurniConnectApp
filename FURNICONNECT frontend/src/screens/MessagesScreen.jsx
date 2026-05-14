import React, {
  useEffect,
  useState
} from "react";

import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet
} from "react-native";

import {
  getConversations
} from "../services/api";

import {
  COLORS
} from "../theme/colors";

export default function
MessagesScreen({
  navigation
}) {

  const [users, setUsers] =
    useState([]);

  useEffect(() => {

    loadConversations();

  }, []);

  const loadConversations =
    async () => {

      try {

        const res =
          await getConversations();

        console.log(
          "CONVERSATIONS:",
          res.data
        );

        setUsers(
          res.data || []
        );

      } catch (err) {

        console.log(
          "CONVERSATION ERROR:",
          err.response?.data ||
          err.message
        );

      }

    };

  return (

    <View style={styles.container}>

      <Text style={styles.title}>
        Messages
      </Text>

      <FlatList
        data={users}
        keyExtractor={(item) =>
          item.id.toString()
        }
        renderItem={({ item }) => (

          <TouchableOpacity

            style={styles.card}

            onPress={() =>

              navigation.navigate(
                "Chat",
                {
                  receiverId:
                    item.id,

                  receiverName:
                    item.name
                }
              )

            }
          >

            <Text style={styles.name}>
              {item.name}
            </Text>

          </TouchableOpacity>

        )}
      />

    </View>

  );

}

const styles =
StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor:
      COLORS.background,
    padding: 20
  },

  title: {
    color: COLORS.accent,
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 20
  },

  card: {
    backgroundColor: "#2a2a2a",
    padding: 20,
    borderRadius: 15,
    marginBottom: 15
  },

  name: {
    color: "#fff",
    fontSize: 18
  }

});