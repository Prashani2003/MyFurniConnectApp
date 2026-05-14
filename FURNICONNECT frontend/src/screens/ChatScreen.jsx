import React, {
  useEffect,
  useState,
  useRef
} from "react";

import {
  View,
  Text,
  TextInput,
  FlatList,
  StyleSheet,
  KeyboardAvoidingView,
  Platform
} from "react-native";

import { Button } from "react-native-paper";

import AsyncStorage from
  "@react-native-async-storage/async-storage";

import jwtDecode from
  "jwt-decode";

import {
  getMessages,
  sendMessage
} from "../services/api";

import { COLORS } from "../theme/colors";

export default function ChatScreen({
  route
}) {

  // ========================
  // PARAMS
  // ========================

  const receiverId =
  route?.params?.receiverId;
  
  const receiverName =
    route.params?.receiverName ||
    "User";

  // ========================
  // STATES
  // ========================

  const [messages, setMessages] =
    useState([]);

  const [text, setText] =
    useState("");

  const [myId, setMyId] =
    useState(null);

  const flatListRef =
    useRef();

  // ========================
  // GET LOGGED USER
  // ========================

  useEffect(() => {

    getMyId();

  }, []);

  const getMyId =
    async () => {

      try {

        const token =
          await AsyncStorage.getItem(
            "token"
          );

        if (token) {

          const decoded =
            jwtDecode(token);

setMyId(decoded.user_id);
        }

      } catch (err) {

        console.log(err);

      }

    };

  // ========================
  // LOAD MESSAGES
  // ========================

  const loadMessages =
    async () => {

      try {

        const res =
          await getMessages(
            receiverId
          );

        setMessages(
          res.data || []
        );

      } catch (err) {

        console.log(
          "LOAD ERROR:",
          err.response?.data ||
          err.message
        );

      }

    };

  useEffect(() => {

    if (receiverId) {

      loadMessages();

    }

  }, [receiverId]);

  // ========================
  // AUTO SCROLL
  // ========================

  const scrollToBottom =
    () => {

      flatListRef.current
        ?.scrollToEnd({
          animated: true
        });

    };

  // ========================
  // SEND MESSAGE
  // ========================

  const handleSend =
    async () => {

      if (!text.trim()) {
        return;
      }

      try {

        console.log(
  "SENDING DATA:",
  {
    receiver_id:
      receiverId,

    message: text
  }
);

await sendMessage({

  receiver_id:
    receiverId,

  message: text

});

        setText("");

        loadMessages();

      } catch (err) {

        console.log(
          "SEND ERROR:",
          err.response?.data ||
          err.message
        );

      }

    };

  // ========================
  // UI
  // ========================

  return (

    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={
        Platform.OS === "ios"
          ? "padding"
          : undefined
      }
      keyboardVerticalOffset={80}
    >

      <View style={styles.container}>

        {/* HEADER */}

        <View style={styles.header}>

          <Text style={styles.headerText}>
            {receiverName}
          </Text>

        </View>

        {/* MESSAGES */}

        <FlatList
          ref={flatListRef}
          data={messages}
          keyExtractor={(item) =>
            item.message_id.toString()
          }
          contentContainerStyle={{
            padding: 10,
            paddingBottom: 100
          }}
          onContentSizeChange={
            scrollToBottom
          }
          renderItem={({ item }) => {

            const isMine =
              item.sender_id === myId;

            return (

              <View
                style={[

                  styles.msg,

                  isMine
                    ? styles.myMsg
                    : styles.otherMsg

                ]}
              >

                <Text style={styles.text}>
                  {item.message}
                </Text>

              </View>

            );

          }}
        />

        {/* INPUT */}

        <View
          style={styles.inputContainer}
        >

          <TextInput
            value={text}
            onChangeText={setText}
            style={styles.input}
            placeholder="Type message..."
            placeholderTextColor="#aaa"
          />

          <Button
            mode="contained"
            buttonColor="#C19A6B"
            textColor="#000"
            onPress={handleSend}
          >
            Send
          </Button>

        </View>

      </View>

    </KeyboardAvoidingView>

  );

}

// ========================
// STYLES
// ========================

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor:
      COLORS.background,
  },

  header: {
    padding: 15,
    backgroundColor: "#1f1f1f",
    borderBottomWidth: 1,
    borderBottomColor: "#333"
  },

  headerText: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "bold"
  },

  msg: {
    padding: 12,
    marginVertical: 5,
    borderRadius: 15,
    maxWidth: "75%"
  },

  myMsg: {
    backgroundColor: "#C19A6B",
    alignSelf: "flex-end"
  },

  otherMsg: {
    backgroundColor: "#333",
    alignSelf: "flex-start"
  },

  text: {
    color: "#fff",
    fontSize: 15
  },

  inputContainer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: "row",
    padding: 10,
    backgroundColor:
      COLORS.background,
    alignItems: "center"
  },

  input: {
    flex: 1,
    backgroundColor: "#2a2a2a",
    color: "#fff",
    padding: 10,
    borderRadius: 10,
    marginRight: 10
  }

});