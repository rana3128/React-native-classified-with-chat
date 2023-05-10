import { StyleSheet, Text, View,} from "react-native";
import { TextInput } from "react-native-paper";
export default function App() {
  return (
    <View style={styles.container}>
     <TextInput
    label="Username"
    left={<TextInput.Icon name="account" />}
    mode="outlined"
    style={{ margin:5,borderColor:"green"}}
  />
    </View>
  );
}
const styles = StyleSheet.create({
  container:{
      flex:1
  },
   input: {
    borderColor: "gray",
    width: "100%",
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
  },
//...
});