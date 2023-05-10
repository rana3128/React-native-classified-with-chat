import React from 'react';
import { Text, View, StyleSheet, Pressable } from 'react-native';

export default function SubmitButton(props) {
  const { onPress, title = 'Save' } = props;
  return (
    <Pressable style={styles.button} onPress={onPress}>
      <Text style={styles.text}>{title}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
    borderRadius: 5,
    elevation: 3,
    backgroundColor: '#00b2ff',
    marginHorizontal:2,
    marginTop:7
  },
  text: {
    fontSize: 18,
    textTransform: "uppercase",
    lineHeight: 21,
    fontWeight: 'bold',
    letterSpacing: 0.25,
    color: 'white',
  },
});