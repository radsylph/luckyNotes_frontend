import { StatusBar } from "expo-status-bar";
import { Text, View } from "react-native";
import { useState, useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Login, SingUp, Welcome, Main, ResetPassword } from "./screem";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Welcome">
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
    </NavigationContainer>
  );
}
