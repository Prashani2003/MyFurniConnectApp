import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { COLORS } from "../theme/colors";

export default function MessagesScreen(){

return(

<View style={styles.container}>
<Text style={styles.text}>Messages will appear here</Text>
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

text:{
color:"#fff",
fontSize:18
}

});