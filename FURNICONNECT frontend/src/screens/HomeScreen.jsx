import React,{useState} from "react";
import {View,Text,StyleSheet,ScrollView} from "react-native";
import {Card,Avatar,IconButton,Drawer} from "react-native-paper";

import ProfileScreen from "./ProfileScreen";
import MyPostsScreen from "./MyPostsScreen";
import MessagesScreen from "./MessagesScreen";
import SettingsScreen from "./SettingsScreen";

import {COLORS} from "../theme/colors";

export default function HomeScreen(){

const[drawerOpen,setDrawerOpen]=useState(false);
const[currentScreen,setCurrentScreen]=useState("home");

const posts=[

{
id:1,
userName:"Silva Wood Suppliers",
role:"Supplier",
location:"Gampaha",
postType:"Teak Wood Available"
},

{
id:2,
userName:"Nimal Carpenter",
role:"Worker",
location:"Colombo",
postType:"Furniture Carpenter Available"
}

];

const renderScreen=()=>{

if(currentScreen==="profile"){
return <ProfileScreen/>;
}

if(currentScreen==="posts"){
return <MyPostsScreen/>;
}

if(currentScreen==="messages"){
return <MessagesScreen/>;
}

if(currentScreen==="settings"){
return <SettingsScreen/>;
}

return(

<ScrollView style={styles.feed}>

<Text style={styles.title}>Welcome to FurniConnect</Text>

<Text style={styles.subtitle}>
Find wood suppliers, workers and furniture services
</Text>

{posts.map(post=>(

<Card key={post.id} style={styles.card}>

<Card.Title
title={post.userName}
subtitle={post.role}
left={(props)=><Avatar.Icon {...props} icon="account"/>}
/>

<Card.Content>

<Text style={styles.text}>{post.location}</Text>
<Text style={styles.text}>{post.postType}</Text>

</Card.Content>

</Card>

))}

</ScrollView>

);

};

return(

<View style={styles.container}>

<View style={styles.header}>

<IconButton
icon="menu"
size={28}
iconColor="#fff"
onPress={()=>setDrawerOpen(!drawerOpen)}
/>

<Text style={styles.headerTitle}>FurniConnect</Text>

</View>

{drawerOpen && (

<View style={styles.drawer}>

{/* USER SECTION */}

<View style={styles.drawerHeader}>

<Avatar.Icon size={60} icon="account"/>

<Text style={styles.drawerName}>User Name</Text>

<Text style={styles.drawerRole}>Furniture Owner</Text>

</View>

<Drawer.Section>

<Drawer.Item
label="Home"
icon="home"
active={currentScreen==="home"}
onPress={()=>{
setCurrentScreen("home");
setDrawerOpen(false);
}}
/>

<Drawer.Item
label="My Profile"
icon="account"
active={currentScreen==="profile"}
onPress={()=>{
setCurrentScreen("profile");
setDrawerOpen(false);
}}
/>

<Drawer.Item
label="My Posts"
icon="file-document"
active={currentScreen==="posts"}
onPress={()=>{
setCurrentScreen("posts");
setDrawerOpen(false);
}}
/>

<Drawer.Item
label="Messages"
icon="message-text"
active={currentScreen==="messages"}
onPress={()=>{
setCurrentScreen("messages");
setDrawerOpen(false);
}}
/>

<Drawer.Item
label="Settings"
icon="cog"
active={currentScreen==="settings"}
onPress={()=>{
setCurrentScreen("settings");
setDrawerOpen(false);
}}
/>

<Drawer.Item
label="Logout"
icon="logout"
onPress={()=>alert("Logged out")}
/>

</Drawer.Section>

</View>

)}

{renderScreen()}

</View>

);

}

const styles=StyleSheet.create({

container:{
flex:1,
backgroundColor:COLORS.background
},

header:{
flexDirection:"row",
alignItems:"center",
padding:10,
backgroundColor:"#1f1f1f"
},

headerTitle:{
color:"#fff",
fontSize:20
},

drawer:{
position:"absolute",
top:60,
left:0,
width:250,
backgroundColor:"#1e1e1e",
height:"100%",
zIndex:10
},

drawerHeader:{
alignItems:"center",
padding:20
},

drawerName:{
color:"#fff",
marginTop:10,
fontSize:16,
fontWeight:"bold"
},

drawerRole:{
color:"gray"
},

feed:{
padding:15
},

title:{
fontSize:26,
fontWeight:"bold",
color:COLORS.accent
},

subtitle:{
color:COLORS.secondaryText,
marginBottom:20
},

card:{
marginBottom:15,
backgroundColor:"#2a2a2a"
},

text:{
color:"#fff"
}

});