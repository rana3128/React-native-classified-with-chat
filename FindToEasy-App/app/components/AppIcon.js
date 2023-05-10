import { View } from 'react-native'
import React from 'react'
import {MaterialCommunityIcons} from '@expo/vector-icons'

export default function AppIcon({
    name,
    size=40,
    backgroundColor="#000",
    iconColor="white",
    onPress
}) {
  return (
    <View style={{ width:size,
        height:size,
        borderRadius:size/2,
        backgroundColor,
        margin:8,
        justifyContent:"center",
        alignItems:"center"}}>
     <MaterialCommunityIcons name={name} color={iconColor} size={size*0.7} onPress={onPress}/>
    </View>
  )
}

