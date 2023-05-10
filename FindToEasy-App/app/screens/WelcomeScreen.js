import React from "react";
import { ImageBackground, StyleSheet, View, Image } from "react-native";
import AppText from "../components/AppText";
import AppButton from "../components/AppButton";


import AppIcon from "../components/AppIcon";

function WelcomeScreen({navigation},props) {
  return (
    <ImageBackground style={styles.background} source="https://akm-img-a-in.tosshub.com/indiatoday/images/story/202112/stockvault-job-opportunity2594_1200x768.jpeg?UVszqvrTDJjG3ekp_v66dAPbbPWVZyOd&size=770:433"  blurRadius={2} >
      <View style={styles.logoContainer}>
        <Image source={require("../assets/logo.png")} style={styles.logo} />
        <AppText>Find easily from world</AppText>
      </View>
      <View style={styles.buttonContainer}>
       
        <AppButton title="Login"  onPress={() => navigation.navigate('Login')}></AppButton>
        <AppButton title="Register" color="secondry" onPress={() => navigation.navigate('Register')}></AppButton>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
 
  },
  logo: {
    width: 150,
    height: 150,
  },
  logoContainer: {
    position: "absolute",
    top: 70,
    alignItems: "center",
  },
  loginbutton: {
    width: "100%",
    height: 70,
    backgroundColor: "#fc5c65",
  },
  registerbutton: {
    width: "100%",
    height: 70,
    backgroundColor: "#4ecdc4",
  },
  buttonContainer: {
    padding: 20,
    width: "100%",
  },
});

export default WelcomeScreen;
