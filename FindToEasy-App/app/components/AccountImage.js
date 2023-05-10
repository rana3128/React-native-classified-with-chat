import { View,Image } from 'react-native'
import React from 'react'


export default function AccountImage({Uri}) {
  return (
    <View style={{ width:100,
        height:100,
        borderRadius:50,
        backgroundColor:"grey",
        margin:8,
        overflow:"hidden",
        justifyContent:"center",
        alignItems:"center"}}>
         <Image  
            source={{
                width:100,
                height:100,
                uri:Uri,
            }}/>
    </View>
  )
}

