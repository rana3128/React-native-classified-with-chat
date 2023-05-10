import React, { useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import RootNav from "./app/navigations/rootNav";
import { AuthProvider } from "./app/auth/auth";
import * as Location from 'expo-location';

export default function App() {

  useEffect(() => {
    Location.getCurrentPositionAsync({});
  }, []);

  return (
    <AuthProvider >
      <NavigationContainer>
        <RootNav />
      </NavigationContainer>
    </AuthProvider>
  );
}
