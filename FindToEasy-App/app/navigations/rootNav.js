import * as React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import HomeNav from "./homeNav";
import CatagoryList from "../screens/CatagoryList";
import AdsDetails from "../screens/AdsDetails";
import AddAds from "../screens/AddAds";
import ClientChat from "../screens/Chat";

const Stack = createStackNavigator();

export default function rootNav() {
  return (
    <Stack.Navigator>
      <Stack.Screen options={{ headerShown: false }} name="Root" component={HomeNav} />
      <Stack.Screen name="CatagoryList" component={CatagoryList} />
      <Stack.Screen name="AdsDetails" component={AdsDetails} />
      <Stack.Screen name="AddAds" component={AddAds} />
      <Stack.Screen name="Chat" component={ClientChat} />
    </Stack.Navigator>
  );
}
