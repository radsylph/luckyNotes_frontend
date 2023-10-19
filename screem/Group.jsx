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
import BarButton from "../components/BarButton";
import HAader from "../components/HAader";

const Group = ({ navigation }) => {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.primary }}>
      <HAader />
      <BarButton navigation={navigation} />
    </SafeAreaView>
  );
};

export default Group;
