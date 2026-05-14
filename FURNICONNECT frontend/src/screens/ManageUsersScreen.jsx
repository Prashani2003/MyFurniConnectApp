import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList
} from "react-native";

import API from "../services/api";

export default function ManageUsersScreen() {

  const [users, setUsers] = useState([]);

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    const res = await API.get("/admin/users");
    setUsers(res.data);
  };

  return (
    <FlatList
      data={users}
      keyExtractor={(item) => item.id.toString()}
      renderItem={({ item }) => (
        <View style={{
          padding: 20,
          borderBottomWidth: 1
        }}>
          <Text>{item.name}</Text>
          <Text>{item.role}</Text>
        </View>
      )}
    />
  );
}