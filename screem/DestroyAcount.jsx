import {
  View,
  Text,
  TextInput,
  ScrollView,
  TouchableOpacity,
  Pressable,
  FlatList,
  Image,
} from "react-native";
import { React, useEffect, useRef, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import COLORS from "../constants/colors";
import { Ionicons } from "@expo/vector-icons";
import Button from "../components/Button";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { ItemNote, oneNote } from "../constants/ItemNote";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import HAader2 from "../components/HAader2";
const DestroyAcount = ({ navigation }) => {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.black }}>
      <HAader2 navigation={navigation} />

      <View
        style={{
          paddingTop: 150,
          paddingHorizontal: 22,
          position: "absolute",
          width: "100%",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Text
          style={{
            fontSize: 30,
            fontWeight: 800,
            color: COLORS.terceary,
          }}
        >
          By deleting your account you will permanently lose all stored data
        </Text>

        <View style={{ width: "100%", paddingTop: 150 }}>
          <Button
            title="Delete acount"
            style={{
              borderColor: COLORS.terceary,
              color: COLORS.terceary,
              backgroundColor: COLORS.alert,
              marginTop: 18,
              marginBottom: 4,
            }}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default DestroyAcount;
