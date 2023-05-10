import React, { useState, useEffect } from 'react';
import { View, FlatList, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { allChats } from '../network/chat';
import colors from "../config/colors";
import { useAuth } from "../auth/auth";


export default function MyChats(props) {
  const auth = useAuth();
  const [chatList, setChatList] = useState([])

  const navToChat = (chatData) => {
    props.navigation.navigate("Chat", { chatData })
  }

  useEffect(() => {
    allChats()
      .then(res => setChatList(res.data))
      .catch(err => console.log(err));
  }, [])

  return (
    <View>
      <FlatList
        data={chatList}
        keyExtractor={list => list._id}
        renderItem={({ item }) =>
          <TouchableOpacity onPress={() => navToChat(item)}>
            <View style={styles.ListContainer} >
              <Text>Ads : {item.addTitle}</Text>
              <Text>Name : {auth.user._id === item.adsOwner ? item.userName : item.adsOwnerName}</Text>
            </View>
          </TouchableOpacity>
        }>
      </FlatList>
    </View>
  )
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
