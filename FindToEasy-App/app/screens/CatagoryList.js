import React, { useState, useEffect } from 'react';
import { View, FlatList, TouchableOpacity } from 'react-native';
import AppListItem from '../components/AppListItem';
import { catagoriesTitle } from '../config/constant';
import { adsByCat } from "../network/classifiedApi";
import { useAuth } from "../auth/auth";


export default function CatagoryList(props) {
  const auth = useAuth();
  const { catagory } = props.route.params;
  const [catList, setCatList] = useState([])

  props.navigation.setOptions({ title: catagoriesTitle[catagory] })
  const navToAdsDetails = (adsBasic) => {
    props.navigation.navigate("AdsDetails", { adsBasic })
  }

  useEffect(() => {
    adsByCat(catagory)
      .then(res => {
        let data = res.data || [];
        data = data.filter(row => row.userId !== auth.user._id);
        setCatList(data);
      }).catch(err => console.log(err));
  }, [catagory])

  return (
    <View>
      <FlatList data={catList}
        keyExtractor={list => list._id}
        renderItem={({ item }) =>
          <TouchableOpacity onPress={() => navToAdsDetails(item)}>
            <AppListItem
              data={item}
            />
          </TouchableOpacity>
        }>
      </FlatList>
    </View>
  )
}