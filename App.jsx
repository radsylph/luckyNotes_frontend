import { StatusBar } from "expo-status-bar";
import { Text, View } from "react-native";
import { useState, useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import {
  Login,
  Welcome,
  SingUp,
  Main,
  ResetPassword,
  Trash,
  Favorite,
  Group,
} from "./screem";

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

const Tab = createBottomTabNavigator();

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="welcome">
        <Stack.Screen
          name="welcome"
          component={Welcome}
          options={{
            headerShown: false,
          }}
        />

        <Stack.Screen
          name="login"
          component={Login}
          options={{
            headerShown: false,
          }}
        />

        <Stack.Screen
          name="singUp"
          component={SingUp}
          options={{
            headerShown: false,
          }}
        />

        <Stack.Screen
          name="main"
          component={Main}
          options={{
            headerShown: false,
          }}
        />

        <Stack.Screen
          name="resetPassword"
          component={ResetPassword}
          options={{
            headerShown: false,
          }}
        />
      </Stack.Navigator>
      <Tab.Screen
        name="main"
        component={Main}
        options={{
          headerShown: false,
        }}
      />

      <Tab.Screen
        name="group"
        component={Group}
        options={{
          headerShown: false,
        }}
      />

      <Tab.Screen
        name="favorite"
        component={Favorite}
        options={{
          headerShown: false,
        }}
      />
    </NavigationContainer>
  );
}
