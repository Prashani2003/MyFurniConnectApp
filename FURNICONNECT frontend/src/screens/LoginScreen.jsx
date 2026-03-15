import React, {useState} from "react";
import {View, Text, TextInput, Button, StyleSheet} from "react-native";
import {COLORS} from "../theme/colors";


export default function LoginScreen({navigation}){

const[name,setName]=useState("");
const[password,setPassword]=useState("");

return(

<View style={styles.container}>

<Text style={styles.title}>FurniConnect</Text>

<TextInput
placeholder="Username or Company Name"
style={styles.input}
value={name}
onChangeText={setName}
/>

<TextInput
placeholder="Password"
secureTextEntry
style={styles.input}
value={password}
onChangeText={setPassword}
/>

<Button
title="Login"
onPress={()=>navigation.replace("Home")}
/>

<Text
style={styles.link}
onPress={()=>navigation.navigate("Register")}
>
Create Account
</Text>

</View>

);
}

const styles=StyleSheet.create({

container:{
flex:1,
justifyContent:"center",
padding:20,
backgroundColor:COLORS.background
},

title:{
fontSize:30,
textAlign:"center",
marginBottom:30,
color:COLORS.accent
},

input:{
borderWidth:1,
borderColor:"#444",
padding:12,
marginBottom:15,
borderRadius:6,
color:"white",
backgroundColor:"#2c2c2c"
},

link:{
marginTop:15,
textAlign:"center",
color:COLORS.accent
}

});