import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image } from "react-native";
import colors from "../config/colors";
import { adsById } from "../network/classifiedApi";
import { MaterialIcons } from '@expo/vector-icons';

export default function AdsDetails(props) {
  const { adsBasic } = props.route.params;
  const [adsDetails, setAdsDetails] = useState(null)

  props.navigation.setOptions({ title: adsBasic.title || "Ads Details" });


  const navToChat = () => {
    props.navigation.navigate("Chat", { adsId: adsBasic._id, adsOwner: adsBasic.userId })
  }

  useEffect(() => {
    adsById(adsBasic._id)
      .then(res => {
        setAdsDetails(res.data);
      }).catch(err => console.log(err));
  }, [adsBasic._id])

  return (
    <View>
      {!!adsDetails ?
        <View style={styles.card}>
          <Image
            style={styles.image}
            source={{
              uri: adsDetails.image,
            }}
          ></Image>
          <View style={styles.phoneChatView}>
            <View style={[styles.phoneChatView, { flex: 4, margin: 5, fontWeight: 20 }]} >
              <MaterialIcons name="phone" size={16} color="black" />
              <Text> : {adsDetails.phone}</Text>
            </View>

            <View style={[styles.chatIcon, { flex: 1 }]}>
              <MaterialIcons name="message" size={30} color="black" onPress={navToChat} />
            </View>
          </View>

          <Text style={styles.textTitle}> {adsDetails.title} </Text>
          <Text style={styles.textDes}> {adsDetails.description} </Text>
          <Text style={styles.textDes}> {adsDetails.location.address} </Text>
          <Text style={styles.textDes}> {adsDetails.city} </Text>
          <Text style={styles.textDes}> Lattitute - {adsDetails.location.coordinates[0]} </Text>
          <Text style={styles.textDes}> Longitute - {adsDetails.location.coordinates[1]} </Text>
        </View> : null
      }
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 15,
    backgroundColor: colors.white,
    marginBottom: 20,
    marginHorizontal: 15,
    overflow: "hidden"
  },
  textTitle: {
    margin: 10,
    fontSize: 22,
    fontWeight: "bold",
    color: colors.black
  },
  textDes: {
    margin: 10,
    fontSize: 20,
    color: colors.medium
  },
  image: {
    width: "100%",
    height: 250,
  },
  chatIcon: {
    margin: 5,
    textAlign: 'right'
  },
  phoneChatView: {
    flexDirection: "row"
  }
});
