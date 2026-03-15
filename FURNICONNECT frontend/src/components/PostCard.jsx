import React from "react";
import {View,Text,StyleSheet} from "react-native";
import {COLORS} from "../theme/colors";

export default function PostCard({post}){

return(

<View style={styles.card}>

<Text style={styles.name}>{post.userName}</Text>

<Text style={styles.text}>{post.role}</Text>

<Text style={styles.text}>{post.location}</Text>

<Text style={styles.text}>{post.postType}</Text>

</View>

);

}

const styles=StyleSheet.create({

card:{
backgroundColor:COLORS.card,
padding:15,
margin:10,
borderRadius:12
},

name:{
color:COLORS.accent,
fontWeight:"bold",
fontSize:16
},

text:{
color:COLORS.secondaryText
}

});