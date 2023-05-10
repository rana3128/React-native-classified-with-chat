import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, Button } from 'react-native';
import ListItemMenu from '../components/ListItemMenu';
import { userAds as apiUserAds, apiActiveAction, apiDeleteAds } from "../network/userApi";
import { useIsFocused } from '@react-navigation/native'


export default function BookMarked(props) {

  const isFocused = useIsFocused()
  const [userAds, setUserAds] = useState([]);
  const navToAdsDetails = (adsBasic) => {
    props.navigation.navigate("AdsDetails", { adsBasic })
  }
  const navToAddAds = (adsBasic) => {
    props.navigation.navigate("AddAds", { adsBasic })
  }

  const activeAction = (id, action) => {
    apiActiveAction(id, action)
      .then(res => {
        getUserAds();
      }).catch(err => console.log(err));
  }

  const deleteAction = (id) => {
    apiDeleteAds(id)
      .then(res => {
        getUserAds();
      }).catch(err => console.log(err));
  }

  const getUserAds = () => {
    apiUserAds()
      .then(res => {
        setUserAds(res.data);
      })
  }

  useEffect(() => {
    getUserAds();
  }, [isFocused])

  return (
    <View>
      <Button title='Add new Post/Ads' onPress={() => navToAddAds()} />
      <FlatList data={userAds}
        keyExtractor={list => list._id.toString()}
        renderItem={({ item }) =>
          <TouchableOpacity onPress={() => navToAdsDetails(item)}>
            <ListItemMenu
              row={item}
              activeAction={activeAction}
              deleteAction={deleteAction}
            />
          </TouchableOpacity>
        }>
      </FlatList>
    </View>
  )
}
