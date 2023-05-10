import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import Screen from "./Screen";
import AppText from "./AppText";
import colors from "../config/colors";
import AppIcon from "./AppIcon";
import { MaterialCommunityIcons } from "@expo/vector-icons";

export default function AppListItem(props) {

  const { title, city, description, image } = props.data;

  return (
    <View elevation={5} style={styles.ListContainer}>
      <Text style={styles.headingtext}>{title}</Text>
      <View style={styles.container}>
        <Image style={styles.image} source={image}></Image>
        <View style={{ flex: 1, flexDirection: "column", flexWrap: "wrap" }}>
          <Text style={styles.descriptiontext}>{description}</Text>
          <Text style={styles.locationtext}>{city}</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  ListContainer: {
    backgroundColor: "white",
    margin: 2,
    padding: 0,
    borderWidth: 1,
    borderRadius: 5,
    borderColor: "#e0e0eb",
    padding: 5,
    shadowColor: "gray",
    shadowOpacity: 0.5,
    shadowRadius: 5,
    shadowOffset: {
      height: 1,
      width: 1
    }
  },
  container: {
    flexDirection: "row",
    backgroundColor: "white",
    marginBottom: 2,
    padding: 5,
  },
  headingtext: {
    fontSize: 20,
    color: colors.medium,

    marginLeft: 5,
    flex: 1,
    flexDirection: "row",
    backgroundColor: "white"
  },
  descriptiontext: {
    fontSize: 18,
    marginLeft: 5,
  },
  image: {
    width: 80,
    height: 50,
    marginLeft: 5,
    marginRight: 5,
  },
  locationtext: {
    fontSize: 9,
    marginLeft: 5,
  },
  icon: {
    position: "absolute",
    justifyContent: "flex-end",
    alignItems: "flex-end"

  }
});
