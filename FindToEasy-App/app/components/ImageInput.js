import React from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import colors from "../config/colors";

export default function ImageInput({ onPress, style }) {
  return (
    <TouchableOpacity style={ style} onPress={onPress}>
    <View style={styles.container}>

      <MaterialCommunityIcons color={colors.medium} name="camera" size={30} />
      <Text style={styles.text}> Select Image </Text>
    </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent:"center",
    alignItems:"center",
    backgroundColor:"white",
    borderRadius:5,
    marginVertical:5,
    marginHorizontal:10,
    width:75,
    height:75,
  },
  text:{
    justifyContent:"center",
    alignItems:"center",
    fontSize:12,
    
  }
});
