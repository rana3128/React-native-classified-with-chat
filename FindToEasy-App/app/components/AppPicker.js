import React from 'react';
import { View, StyleSheet, TextInput, Platform } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { MaterialCommunityIcons } from "@expo/vector-icons";
import colors from '../config/colors';

export default function AppPicker({ icon, options, ...otherProps }) {
  return (
    <View style={styles.container}>
      {icon && <MaterialCommunityIcons name={icon} size={20} color={colors.medium} style={styles.icon} />}
      <Picker style={styles.picker} {...otherProps} >
        <Picker.Item style={styles.picker} label="--Select Catagory--" value={null} />
        {Object.keys(options).map(cat => <Picker.Item style={styles.picker} label={options[cat]} value={cat} />)}
      </Picker>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.white,
    borderRadius: 25,
    flexDirection: "row",
    width: "100%",
    padding: 15,
    marginVertical: 10
  },
  picker: {
    width: "100%",
    borderWidth: 0
  },
  icon: {
    marginRight: 10
  }
})