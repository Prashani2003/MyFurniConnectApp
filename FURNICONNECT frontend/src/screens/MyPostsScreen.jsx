import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Card } from "react-native-paper";
import { COLORS } from "../theme/colors";

export default function MyPostsScreen(){

return(

<View style={styles.container}>

<Text style={styles.title}>My Posts</Text>

<Card style={styles.card}>
<Card.Title title="My Post Example"/>
<Card.Content>
<Text>Teak wood supplier post</Text>
</Card.Content>
</Card>

</View>

);

}

const styles = StyleSheet.create({

container:{
flex:1,
backgroundColor:COLORS.background,
padding:20
},

title:{
fontSize:24,
color:COLORS.accent,
marginBottom:20
},

card:{
backgroundColor:"#2a2a2a"
}

});