import React,{useState} from "react";
import {View,Text,TextInput,StyleSheet} from "react-native";
import {Button,Menu} from "react-native-paper";
import {COLORS} from "../theme/colors";


export default function RegisterScreen({navigation}){

const[name,setName]=useState("");
const[password,setPassword]=useState("");
const[role,setRole]=useState("");

const[visible,setVisible]=useState(false);

const openMenu=()=>setVisible(true);
const closeMenu=()=>setVisible(false);

return(

<View style={styles.container}>

<Text style={styles.title}>Register</Text>

<TextInput
placeholder="Company / User Name"
style={styles.input}
value={name}
onChangeText={setName}
/>

<TextInput
placeholder="Password"
style={styles.input}
value={password}
onChangeText={setPassword}
/>

{/* Role Dropdown */}

<Menu
visible={visible}
onDismiss={closeMenu}
anchor={
<Button
mode="outlined"
onPress={openMenu}
style={styles.dropdown}
>
{role ? role : "Select Role"}
</Button>
}
>

<Menu.Item onPress={()=>{setRole("Supplier");closeMenu();}} title="Supplier"/>
<Menu.Item onPress={()=>{setRole("Service Provider");closeMenu();}} title="Service Provider"/>
<Menu.Item onPress={()=>{setRole("Furniture Owner");closeMenu();}} title="Furniture Owner"/>

</Menu>

<Button
mode="contained"
style={styles.button}
onPress={()=>navigation.replace("Home")}
>
Register
</Button>

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

dropdown:{
marginBottom:20,
color:COLORS.accent
},

button:{
marginTop:10,
color:COLORS.accent
}

});