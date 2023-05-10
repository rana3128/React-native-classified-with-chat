import React from "react";
import { Formik } from "formik";
import { StyleSheet, Image } from "react-native";
import Screen from "../components/Screen";
import { TextInput } from "react-native-paper";
import SubmitButton from "../components/AppButton2";
import ErrorMessage from "../components/ErrorMessage";
import * as Yup from "yup";
import { register } from "../network/userApi";

const validationSchema = Yup.object().shape({
  username: Yup.string().required().label("Username"),
  password: Yup.string().required().min(4).label("Password"),
  repassword: Yup.string().oneOf([Yup.ref("password"), null], "Passwords must match"),
});

export default function RegisterScreen(props) {
  const handleRegister = (userData) => {
    console.log(userData);
    register(userData.username, userData.password)
      .then((data) => {
        console.log(data);
        props.navigation.navigate("Login");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <Screen>
      <Image style={styles.logo} source={require("../assets/logo.png")}></Image>
      <Formik initialValues={{ username: "", password: "", repassword: "" }} onSubmit={(values) => handleRegister(values)} validationSchema={validationSchema}>
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

            {touched.username && <ErrorMessage error={errors.username} visible={touched.username} />}
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

            {touched.password && <ErrorMessage error={errors.password} visible={touched.password} />}
            <TextInput
              label="RePassword"
              onChangeText={handleChange("repassword")}
              onBlur={() => setFieldTouched("repassword")}
              left={<TextInput.Icon name="lock" />}
              placeholder="RePassword"
              secureTextEntry
              mode="outlined"
              style={{ margin: 2 }}
              theme={{ colors: { primary: "orange" } }}
            />

            {touched.repassword && <ErrorMessage error={errors.repassword} visible={touched.repassword} />}
            <SubmitButton title="Register" color="secondry" onPress={handleSubmit} style={{ marginTop: 15, borderRadius: 8 }} />
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
