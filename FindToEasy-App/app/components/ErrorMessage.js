import { View, Text,StyleSheet } from 'react-native'
import React from 'react'

export default function ErrorMessage({error}) {
  return (
 
      <Text style={styles.text}>{error}</Text>
  )

}
const styles = StyleSheet.create({
    text:{
        color:"red",
        fontSize:12,
       
    }
})