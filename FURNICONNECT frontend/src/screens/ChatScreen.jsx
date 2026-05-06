import React, { useEffect, useState, useRef } from "react";
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
import { getMessages, sendMessage } from "../services/api";
import { COLORS } from "../theme/colors";

export default function ChatScreen({ route }) {

  const { receiverId } = route.params;

  const [messages, setMessages] = useState([]);
  const [text, setText] = useState("");

  const flatListRef = useRef();

  // 🔥 LOAD MESSAGES
  const loadMessages = async () => {
    try {
      const res = await getMessages(receiverId);
      setMessages(res.data || []);
    } catch (err) {
      console.log("LOAD ERROR:", err);
    }
  };

  useEffect(() => {
    loadMessages();
  }, []);

  // 🔥 AUTO SCROLL
  const scrollToBottom = () => {
    flatListRef.current?.scrollToEnd({ animated: true });
  };

  // 🔥 SEND MESSAGE
 const handleSend = async () => {

  console.log("🔥 HANDLE SEND START");

  if (!text.trim()) {
    console.log("❌ EMPTY TEXT");
    return;
  }

  try {
    console.log("📤 SENDING:", {
      receiver_id: receiverId,
      message: text
    });

    const res = await sendMessage({
      receiver_id: receiverId,
      message: text
    });

    console.log("✅ RESPONSE:", res.data);

    setText("");

    // 🔁 reload messages
    loadMessages();

  } catch (err) {
    console.log("❌ SEND ERROR FULL:", err);
    console.log("❌ SEND ERROR RESPONSE:", err.response?.data);
  }
};

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
      keyboardVerticalOffset={80}
    >
      <View style={styles.container}>

        {/* 🔥 MESSAGE LIST */}
        <FlatList
          ref={flatListRef}
          data={messages}
          keyExtractor={(item) => item.message_id?.toString()}
          contentContainerStyle={{ paddingBottom: 80 }}
          onContentSizeChange={scrollToBottom}
          renderItem={({ item }) => (
            <View style={styles.msg}>
              <Text style={styles.text}>{item.message}</Text>
            </View>
          )}
        />

        {/* 🔥 INPUT BOX */}
        <View style={styles.inputContainer}>
          <TextInput
            value={text}
            onChangeText={setText}
            style={styles.input}
            placeholder="Type message..."
            placeholderTextColor="#aaa"
          />

          <Button
            mode="contained"
            onPress={() => {
              console.log("SEND BUTTON CLICKED");
              handleSend();
            }}
          >
            Send
          </Button>
        </View>

      </View>
    </KeyboardAvoidingView>
  );
}

// 🎨 STYLES
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  msg: {
    padding: 10,
    backgroundColor: "#333",
    margin: 5,
    borderRadius: 10,
    alignSelf: "flex-start"
  },
  text: {
    color: "#fff"
  },
  inputContainer: {
    position: "absolute",   // 🔥 IMPORTANT FIX
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: "row",
    padding: 10,
    backgroundColor: COLORS.background,
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