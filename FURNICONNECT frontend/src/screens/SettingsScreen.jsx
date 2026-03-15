import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { List } from "react-native-paper";
import { COLORS } from "../theme/colors";

export default function SettingsScreen(){

return(

<View style={styles.container}>

<List.Item title="Change Password" left={()=> <List.Icon icon="lock"/>} />
<List.Item title="Notifications" left={()=> <List.Icon icon="bell"/>} />
<List.Item title="About App" left={()=> <List.Icon icon="information"/>} />

</View>

);

}

const styles = StyleSheet.create({

container:{
flex:1,
backgroundColor:COLORS.background
}

});