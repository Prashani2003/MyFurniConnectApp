import React from "react";
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity
} from "react-native";

import {
    createDrawerNavigator
} from "@react-navigation/drawer";

import {
    DrawerContentScrollView,
    DrawerItem
} from "@react-navigation/drawer";

import {
    Avatar
} from "react-native-paper";

import Icon from "react-native-vector-icons/MaterialIcons";

import AdminHomeScreen from "../screens/AdminHomeScreen";
import AdminUsersScreen from "../screens/AdminUsersScreen";
import AdminJobsScreen from "../screens/AdminJobsScreen";
import AdminReviewsScreen from "../screens/AdminReviewsScreen";
import AdminMaterialsScreen from "../screens/AdminMaterialsScreen";
import UserProfileScreen from "../screens/UserProfileScreen";

import { COLORS } from "../theme/colors";

const Drawer = createDrawerNavigator();


// ========================
// CUSTOM DRAWER
// ========================
function CustomDrawerContent(props) {

    return (
        <DrawerContentScrollView
            {...props}
            style={{ backgroundColor: "#1e1e1e" }}
        >

            <View style={styles.header}>

                <Avatar.Icon
                    size={90}
                    icon="shield-account"
                    style={{
                        backgroundColor: COLORS.accent
                    }}
                />

                <Text style={styles.name}>
                    Admin Panel
                </Text>

            </View>

            <View style={styles.line} />

            <DrawerItem
                label="Dashboard"
                labelStyle={{ color: "#fff", fontSize: 18 }}
                icon={() => (
                    <Text style={{ fontSize: 24 }}>📊</Text>
                )}
                onPress={() =>
                    props.navigation.navigate("AdminHome")
                }
            />

            <DrawerItem
                label="Manage Users"
                labelStyle={{ color: "#fff", fontSize: 18 }}
                icon={() => (
                    <Text style={{ fontSize: 24 }}>👥</Text>
                )}
                onPress={() =>
                    props.navigation.navigate("AdminUsers")
                }
            />

            <DrawerItem
                label="My Profile"
                labelStyle={{
                    color: "#fff",
                    fontSize: 18
                }}
                icon={() => (
                    <Text style={{ fontSize: 24 }}>
                        👤
                    </Text>
                )}
                onPress={() =>
                    props.navigation.navigate(
                        "AdminProfile"
                    )
                }
            />

            <DrawerItem
                label="Manage Jobs"
                labelStyle={{ color: "#fff", fontSize: 18 }}
                icon={() => (
                    <Text style={{ fontSize: 24 }}>💼</Text>
                )}
                onPress={() =>
                    props.navigation.navigate("AdminJobs")
                }
            />

            <DrawerItem
                label="Manage Reviews"
                labelStyle={{
                    color: "#fff",
                    fontSize: 18,
                    fontWeight: "bold"
                }}
                icon={() => (
                    <Text style={{ fontSize: 28 }}>
                        ⭐
                    </Text>
                )}
                onPress={() =>
                    props.navigation.navigate(
                        "AdminReviews"
                    )
                }
            />

            
            <DrawerItem
                label="Logout"
                labelStyle={{
                    color: "#ff6b6b",
                    fontSize: 18
                }}
                icon={() => (
                    <Text style={{ fontSize: 24 }}>🚪</Text>
                )}
                onPress={() => props.setUser(null)}
            />

        </DrawerContentScrollView>
    );
}


// ========================
// MAIN DRAWER
// ========================
export default function AdminDrawer({ setUser }) {

    return (
        <Drawer.Navigator

            drawerContent={(props) => (
                <CustomDrawerContent
                    {...props}
                    setUser={setUser}
                />
            )}

            screenOptions={({ navigation }) => ({

                headerStyle: {
                    backgroundColor: "#1f1f1f"
                },

                headerTintColor: "#fff",

                headerTitle: "FurniConnect",

                drawerStyle: {
                    backgroundColor: "#1e1e1e"
                },

                // 🔥 HAMBURGER MENU
                headerLeft: () => (
                    <TouchableOpacity
                        onPress={() => navigation.openDrawer()}
                        style={{ marginLeft: 15 }}
                    >
                        <Icon
                            name="menu"
                            size={30}
                            color="#fff"
                        />
                    </TouchableOpacity>
                )

            })}
        >

            <Drawer.Screen
                name="AdminHome"
                component={AdminHomeScreen}
                options={{
                    title: "Admin Dashboard"
                }}
            />

            <Drawer.Screen
                name="AdminUsers"
                component={AdminUsersScreen}
                options={{
                    title: "Manage Users"
                }}
            />


            <Drawer.Screen
                name="AdminJobs"
                component={AdminJobsScreen}
                options={{
                    title: "Manage Jobs"
                }}
            />

            <Drawer.Screen
                name="AdminReviews"
                component={AdminReviewsScreen}
                options={{
                    title: "Manage Reviews"
                }}
            />

            <Drawer.Screen
                name="AdminMaterials"
                component={AdminMaterialsScreen}
                options={{
                    title: "Manage Materials"
                }}
            />

            <Drawer.Screen
                name="AdminProfile"
            >
                {() => (

                    <UserProfileScreen
                        route={{
                            params: {
                                userId: 1
                            }
                        }}
                    />

                )}
            </Drawer.Screen>



        </Drawer.Navigator>
    );
}


// ========================
// STYLES
// ========================
const styles = StyleSheet.create({

    header: {
        alignItems: "center",
        padding: 30
    },

    name: {
        color: "#fff",
        fontSize: 22,
        fontWeight: "bold",
        marginTop: 15
    },

    line: {
        borderBottomWidth: 1,
        borderBottomColor: "#444",
        marginBottom: 20,
        marginHorizontal: 20
    }

});