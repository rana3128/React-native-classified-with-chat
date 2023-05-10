
import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { MaterialCommunityIcons, FontAwesome } from "@expo/vector-icons";

import HomeScreen from "../screens/HomeScreen";
import LoginScreen from "../screens/LoginScreen";
import RegisterScreen from "../screens/RegisterScreen";
import Account from "../screens/Account";
import UserAds from "../screens/UserAds";
import BookMarked from "../screens/BookMarked";
import MyChats from "../screens/MyChats";
import Test from "../screens/Test";
import colors from "../config/colors";
import { useAuth } from "../auth/auth";

const Drawer = createDrawerNavigator();

export default function HomeNav({ navigation }) {

  const auth = useAuth()

  return (
    <Drawer.Navigator
      initialRouteName="Find2Easy"
      screenOptions={{
        headerTitleAlign: "center",
        drawerActiveBackgroundColor: colors.primary,
        drawerActiveTintColor: colors.white,
        drawerStyle: {
          backgroundColor: "white",
          width: 240,
        },
      }}
      useLegacyImplementation
    >
      <Drawer.Screen
        name="Find2Easy"
        component={HomeScreen}
        options={{
          drawerLabel: "Home",
          drawerIcon: ({ focused, size }) => <MaterialCommunityIcons name="home" size={size} color={focused ? colors.white : "#ccc"} />,
        }}
      />
      {
        !!auth.user ?
          <Drawer.Group >
            <Drawer.Screen
              name="Account"
              component={Account}
              options={{
                drawerIcon: ({ focused, size }) => <MaterialCommunityIcons
                  name="account" size={size}
                  color={focused ? colors.white : colors.medium} />,
              }}
            />
            <Drawer.Screen
              name="Marked Ads"
              component={BookMarked}
              options={{
                drawerIcon: ({ focused, size }) => <FontAwesome
                  name="bookmark"
                  size={24}
                  color={focused ? colors.white : colors.medium} />,
              }}
            />
            <Drawer.Screen
              name="My Ad's"
              component={UserAds}
              options={{
                drawerIcon: ({ focused, size }) => <MaterialCommunityIcons
                  name="format-list-text" size={size}
                  color={focused ? colors.white : colors.medium} />,
              }}
            />
            <Drawer.Screen
              name="Messages"
              component={MyChats}
              options={{
                drawerIcon: ({ focused, size }) => <FontAwesome
                  name="wechat"
                  size={24}
                  color={focused ? colors.white : colors.medium} />,
              }}
            />
            <Drawer.Screen
              name="Test"
              component={Test}
              options={{
                drawerIcon: ({ focused, size }) => <MaterialCommunityIcons
                  name="format-list-text" size={size}
                  color={focused ? colors.white : colors.medium} />,
              }}
            />
          </Drawer.Group>
          : (
            <Drawer.Group >
              <Drawer.Screen
                name="Login"
                component={LoginScreen}
                options={{
                  drawerIcon: ({ focused, size }) => <MaterialCommunityIcons
                    name="login" size={size}
                    color={focused ? colors.white : colors.medium} />,
                }}
              />
              <Drawer.Screen
                name="Register"
                component={RegisterScreen}
                options={{
                  drawerIcon: ({ focused, size }) => <MaterialCommunityIcons
                    name="account" size={size}
                    color={focused ? colors.white : colors.medium} />,
                }}
              />
            </Drawer.Group>
          )
      }


    </Drawer.Navigator>
  );
}
