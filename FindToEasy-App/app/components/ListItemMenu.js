import React, { useState } from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import { Menu, MenuItem, MenuDivider } from 'react-native-material-menu';
import { MaterialCommunityIcons } from "@expo/vector-icons";

import Screen from "./Screen";
import colors from "../config/colors";


export default function ListItemMenu(props) {
  const { _id, title, location, description, image, isActive } = props.row;




  const [visible, setVisible] = useState(false);
  const hideMenu = () => setVisible(false);
  const showMenu = () => setVisible(true);

  const activeAction = (id, act) => {
    props.activeAction(id, act);
    hideMenu();
  }

  const deleteAction = (id) => {
    props.deleteAction(id);
    hideMenu();
  }

  return (
    <View elevation={5} style={[styles.ListContainer, isActive ? { backgroundColor: "white" } : { backgroundColor: "#D5CECE" }]} >
      <View style={styles.title_logo}>
        <Text style={styles.headingtext}>{title}</Text>
        <View style={styles.dotmenu}>
          <Menu
            visible={visible}
            anchor={<MaterialCommunityIcons name="dots-vertical" size={20} color="black" onPress={showMenu} />}
            onRequestClose={hideMenu}
          >
             <MenuItem
              style={[styles.menuitem, { backgroundColor: "#95f985" }]}
              onPress={() => deleteAction(_id)}
            >
              Edit
            </MenuItem>
            <MenuItem
              style={[styles.menuitem, { backgroundColor: "yellow" }]}
              onPress={() => activeAction(_id, !isActive)}
            >
              {isActive ? "DeActivate" : "Activate"}
            </MenuItem>
            <MenuItem
              style={[styles.menuitem, { backgroundColor: "red" }]}
              onPress={() => deleteAction(_id)}
            >
              Delete
            </MenuItem>
          </Menu>
        </View>
      </View>

      <View style={styles.container}>
        <Image style={styles.image} source={{ uri: image }}></Image>
        <View style={{ flex: 1, flexDirection: "column", flexWrap: "wrap" }}>
          {/* <Text style={styles.locationtext}>{JSON.stringify(location)}</Text> */}
          <Text style={styles.descriptiontext}>{description}</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  ListContainer: {
    backgroundColor: "white",
    marginTop:5,
    marginBottom: 2,
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
    // backgroundColor: "white",
    marginBottom: 1,
    padding: 1,
  },
  descriptiontext: {
    fontSize: 12,
    marginLeft: 5,
  },
  image: {
    width: 80,
    height: 50,
    marginLeft: 5,
    marginRight: 5,
  },
  locationtext: {
    fontSize: 10,
    marginLeft: 5,
  },
  title_logo: {
    flexDirection: "row",
  },
  headingtext: {
    fontSize: 14,
    color: colors.medium,
    marginLeft: 5,
    flex: 1,
    // backgroundColor: "white"
  },
  dotmenu: {
    flex: 1,
    position: 'absolute',
    right: 0,
    top: 0,
  },
  menuitem: {
    margin: 2,
    borderWidth: 1,
    borderRadius: 5,
    borderColor: "#e0e0eb",
    padding: 2,
  }
});
