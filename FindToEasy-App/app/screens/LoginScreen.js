import React from "react";
import { Formik } from "formik";
import { StyleSheet, Image, Text } from "react-native";
import { TextInput } from "react-native-paper";
import Screen from "../components/Screen";

import SubmitButton from "../components/AppButton2";
import ErrorMessage from "../components/ErrorMessage";
import * as Yup from "yup";
import { useAuth } from "../auth/auth";
import { login } from "../network/userApi";

const validationSchema = Yup.object().shape({
  username: Yup.string().required().label("Username"),
  password: Yup.string().required().min(4).label("Password"),
});

export default function LoginScreen(props) {
  const auth = useAuth();
  const handleLogin = (userData) => {
    console.log(userData);
    login(userData.username, userData.password)
      .then((data) => {
        console.log(data);
        if (data?.token) {
          auth.login(data);
          props.navigation.navigate("Home");
        }
      })
      .catch((err) => {
        console.log(err);
        // props.navigation.navigate("Home")
      });
  };

  return (
    <Screen>
      <Image style={styles.logo} source={require("../assets/logo.png")}></Image>
      <Formik initialValues={{ username: "", password: "" }} onSubmit={(values) => handleLogin(values)} validationSchema={validationSchema}>
        {({ handleChange, handleSubmit, errors, setFieldTouched, touched }) => (
          <>
            <TextInput
              label="Username"
              onChangeText={handleChange("username")}
              onBlur={() => setFieldTouched("username")}
              left={<TextInput.Icon name="account" />}
              placeholder="Username"
              mode="outlined"
              style={{ margin: 5 }}
              theme={{ colors: { primary: "orange" } }}
            />

          { touched.username&&<ErrorMessage error={errors.username} visible={touched.username} />
} 
            <TextInput
              label="Password"
              onChangeText={handleChange("password")}
              onBlur={() => setFieldTouched("password")}
              left={<TextInput.Icon name="lock" />}
              placeholder="Password"
              secureTextEntry
              mode="outlined"
              style={{ margin: 2 }}
              theme={{ colors: { primary: "orange" } }}
            />

          {touched.password&&<ErrorMessage error={errors.password} visible={touched.password} />}  
            <SubmitButton title="Login" color="secondry" onPress={handleSubmit} />
          </>
        )}
      </Formik>
    </Screen>
  );
}

const styles = StyleSheet.create({
  logo: {
    width: 100,
    height: 100,
    alignSelf: "center",
    marginTop: 50,
    marginBottom: 20,
  },
});
