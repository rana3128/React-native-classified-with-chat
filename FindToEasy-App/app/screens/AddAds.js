import React, { useState, useEffect } from "react";
import { Formik } from "formik";
import { StyleSheet, Image, Text, Button, View, ScrollView, ActivityIndicator, Dimensions, Platform } from "react-native";
import * as ImagePicker from "expo-image-picker";
import { TextInput } from "react-native-paper";
import Screen from "../components/Screen";
import SubmitButton from "../components/AppButton2";
import ImageInput from "../components/ImageInput";
import ErrorMessage from "../components/ErrorMessage";
import * as Yup from "yup";
import { uploadImage, createAds } from "../network/classifiedApi";
import { catagories, catagoriesTitle } from "../config/constant";
import AppPicker from "../components/AppPicker";
import * as Location from "expo-location";
import { useIsFocused } from "@react-navigation/native";
import colors from "../config/colors";

const validationSchema = Yup.object().shape({
  title: Yup.string().required().label("Title"),
  description: Yup.string().required().label("Description"),
  phone: Yup.string().required().label("Phone"),
  address: Yup.string().required().label("Address"),
  city: Yup.string().required().label("City"),
  catagory: Yup.string().required().label("Catagory"),
});

export default function AddAds(props) {
  const isFocused = useIsFocused();

  const [pickedImage, setImage] = useState("");
  const [gpsCord, setGpsCord] = useState([0.0, 0.0]);
  const [state, setState] = useState("");
  const [loading, setLoading] = useState(false);
  const [location, setLocation] = useState(null);

  const handleAddAds = (userData) => {
    setLoading(true);
    setState("Submitting basic details....");

    const gpsLocation = {
      address: userData.address,
      coordinates: [location?.coords?.latitude, location?.coords?.longitude],
    };
    userData.location = gpsLocation;

    createAds(userData)
      .then((data) => {
        if (data?.data?.insertedId) {
          setState("Uploading images....");
          uploadImageP(data.data.insertedId);
        }
      })
      .catch((err) => {
        setLoading(false);
        setState("");
        console.log(err);
      });
  };

  const pickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (status !== "granted") {
      alert("Sorry, we need camera roll permissions to make this work!");
      return;
    }

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
    });
    setImage(result.uri);
  };

  const uploadImageP = async (adsId) => {
    if (pickedImage && Platform.OS != "web") {
      const formData = new FormData();
      formData.append("adsId", adsId);
      formData.append("adsImage", {
        name: new Date() + "_profile",
        uri: pickedImage,
        type: "image/jpg",
      });
      uploadImageForm(formData);
    } else if (pickedImage) {
      const url = pickedImage;
      let fileType = pickedImage.split(";")[0].split("/")[1];

      fetch(url)
        .then((res) => res.blob())
        .then((blob) => {
          const file = new File([blob], `tmp.${fileType}`, { type: `image/${fileType}` });
          const formData = new FormData();
          formData.append("adsId", adsId);
          formData.append("adsImage", file);
          uploadImageForm(formData);
        });
    }
  };

  const uploadImageForm = (formData) => {
    uploadImage(formData)
      .then((res) => {
        console.log(res);
        setLoading(false);
        setState("");
        props.navigation.navigate("My Ad's");
      })
      .catch((err) => {
        setLoading(false);
        setState("");
        console.log(err);
      });
  };

  useEffect(() => {
    (async () => {
      let locationPer = await Location.requestForegroundPermissionsAsync();
      console.log(locationPer);
      if (locationPer?.status !== "granted") {
        console.log("Permission to access location was denied");
        return;
      }
      let gpsLocation = await Location.getCurrentPositionAsync({ accuracy: Location.Accuracy.Highest, maximumAge: 10000 });
      setLocation(gpsLocation);
    })();
  }, [isFocused]);

  return (
    <ScrollView>
      {loading ? (
        <View style={[styles.container]}>
          <View style={[styles.child1]}>
            <ActivityIndicator animating={loading} size="large" color="#00ff00" />
            <Text>{state}</Text>
          </View>
        </View>
      ) : (
        <Formik initialValues={{}} onSubmit={(values) => handleAddAds(values)} validationSchema={validationSchema}>
          {({ handleChange, handleSubmit, errors, setFieldTouched, touched }) => (
            <>
              <TextInput
                label="Title"
                onChangeText={handleChange("title")}
                onBlur={() => setFieldTouched("title")}
                placeholder="Title"
                mode="outlined"
                style={{ margin: 5 }}
                theme={{ colors: { primary: "orange" } }}
              />
              {touched.title && <ErrorMessage error={errors.title} visible={touched.title} />}

              <TextInput
                label="Description"
                onChangeText={handleChange("description")}
                onBlur={() => setFieldTouched("description")}
                placeholder="Description"
                mode="outlined"
                style={{ margin: 5 }}
                theme={{ colors: { primary: "orange" } }}
              />
              {touched.description && <ErrorMessage error={errors.description} visible={touched.description} />}

              <TextInput
                label="Phone"
                onChangeText={handleChange("phone")}
                onBlur={() => setFieldTouched("phone")}
                placeholder="Phone"
                mode="outlined"
                style={{ margin: 5 }}
                theme={{ colors: { primary: "orange" } }}
              />
              {touched.phone && <ErrorMessage error={errors.phone} visible={touched.phone} />}

              <TextInput
                label="Address"
                onChangeText={handleChange("address")}
                onBlur={() => setFieldTouched("address")}
                placeholder="Address"
                mode="outlined"
                style={{ margin: 5 }}
                theme={{ colors: { primary: "orange" } }}
              />
              {touched.address && <ErrorMessage error={errors.address} visible={touched.address} />}

              <TextInput
                label="City"
                onChangeText={handleChange("city")}
                onBlur={() => setFieldTouched("city")}
                placeholder="City"
                mode="outlined"
                style={{ margin: 5 }}
                theme={{ colors: { primary: "orange" } }}
              />
              {touched.city && <ErrorMessage error={errors.city} visible={touched.city} />}

              <AppPicker options={catagoriesTitle} selectedValue={null} onBlur={() => setFieldTouched("catagory")} onValueChange={(itemValue) => handleChange("catagory")(itemValue)} />
              {touched.catagory && <ErrorMessage error={errors.catagory} visible={touched.catagory} />}

              <ImageInput
                onPress={() => {
                  pickImage(handleChange("image"));
                }}
              />
              {pickedImage ? <Image source={{ uri: pickedImage }} style={styles.image} /> : null}

              <SubmitButton title="Submit" onPress={handleSubmit} />
            </>
          )}
        </Formik>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    height: Dimensions.get("window").height - 100,
  },
  child1: {
    marginTop: "50%",
    justifyContent: "center",
    alignSelf: "center",
  },
  logo: {
    width: 100,
    height: 100,
    alignSelf: "center",
    marginTop: 50,
    marginBottom: 20,
  },
  image: {
    marginTop: 5,
    alignSelf: "center",
    borderRadius: 5,
    borderColor: colors.medium,
    width: 150,
    height: 150,
  },
});
