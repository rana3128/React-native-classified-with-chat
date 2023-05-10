import { View, Text, StyleSheet, Button } from "react-native";
import SubmitButton from "../components/AppButton2";
import { useAuth } from "../auth/auth";
import AccountImage from "../components/AccountImage";

export default function Account(props) {
  const auth = useAuth();
  const handleLogout = () => {
    auth.logout();
    props.navigation.navigate("Home");
  };

  // console.log(auth.user);
  return (
    <View style={styles.card}>
      <View style={styles.accountImage}>
        <AccountImage Uri="https://w7.pngwing.com/pngs/518/320/png-transparent-computer-icons-mobile-app-development-android-my-account-icon-blue-text-logo.png" />
      </View>
      <Text style={{ alignSelf: "center", fontSize: 20, margin: 20 }}> {auth.user.username} </Text>

      <SubmitButton title="Log Out" onPress={() => handleLogout()} style={{ alignSelf: "flexend" }} />
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "white",
    borderRadius: 10,
    height: 260,
    margin: 5,
  },
  accountImage: {
    marginTop: 5,
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center",
  },
});
