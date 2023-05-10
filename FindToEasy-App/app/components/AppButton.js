import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import colors from "../config/colors";
import React from "react";

export default function AppButton({ title, onPress, style,color = "primary" }) {
  return (
    <TouchableOpacity style={[styles.button, style,{ backgroundColor:colors[color] }]} onPress={onPress}>
      <Text style={styles.text}>
        {title}
     
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: colors.primary,
    borderRadius: 25,
    marginTop:10,
   
    alignItems: "center",
    padding: 15,
    width: "100%",
    marginVertical:10,
    bottom:10

  },
  text: {
    color: colors.white,
    fontSize: 18,
    textTransform: "uppercase",
    fontWeight: "bold",
  },
});
