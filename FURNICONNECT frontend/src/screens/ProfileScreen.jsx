import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Avatar, Button } from "react-native-paper";
import { COLORS } from "../theme/colors";

export default function ProfileScreen(){

return(

<View style={styles.container}>

<Avatar.Icon size={100} icon="account" style={styles.avatar}/>

<Text style={styles.name}>User Name</Text>
<Text style={styles.role}>Supplier</Text>

<Button mode="contained" style={styles.button}>
Edit Profile
</Button>

</View>

);

}

const styles = StyleSheet.create({

container:{
flex:1,
justifyContent:"center",
alignItems:"center",
backgroundColor:COLORS.background
},

avatar:{
backgroundColor:"#b89f7a",
marginBottom:20
},

name:{
fontSize:22,
color:"#fff"
},

role:{
color:"#aaa",
marginBottom:20
},

button:{
backgroundColor:"#b89f7a"
}

});