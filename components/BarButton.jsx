import React, { useState } from "react";
import {
  LogBox,
  Text,
  View,
  FlatList,
  Touchable,
  TouchableOpacity,
} from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import COLORS from "../constants/colors";

import { Ionicons } from "@expo/vector-icons";

export default function BarButton({ navigation }) {
  const [activeCategory, setActiveCategory] = useState(1);

  const handleMailPress = () => {
    alert("Mail");
    navigation.navigate("login");
  };

  const handleSeriesPress = () => {
    alert("Series");
    navigation.navigate("group");
  };

  const handleFavPress = () => {
    alert("Fav");
    navigation.navigate("favorite");
  };

  const handleTrashPress = () => {
    alert("Trash");
  };

  return (
    <View
      style={{
        height: 60,
        backgroundColor: COLORS.secundary,
        borderTopColor: COLORS.primary,
        borderTopWidth: 1,
      }}
    >
      <View
        style={{
          justifyContent: "space-between",
          flexDirection: "row",
          alignItems: "center",
          marginHorizontal: "10%",
        }}
      >
        <TouchableOpacity onPress={handleMailPress}>
          <Ionicons
            style={{ marginVertical: 12, marginBottom: 15 }}
            name="mail-outline"
            size={30}
            color={COLORS.terceary}
          />
        </TouchableOpacity>

        <TouchableOpacity onPress={handleSeriesPress}>
          <Ionicons
            style={{ marginVertical: 12, marginBottom: 15 }}
            name="grid-outline"
            size={30}
            color={COLORS.terceary}
          />
        </TouchableOpacity>

        <TouchableOpacity onPress={handleFavPress}>
          <Ionicons
            style={{ marginVertical: 12, marginBottom: 15 }}
            name="bookmark"
            size={30}
            color={COLORS.terceary}
          />
        </TouchableOpacity>

        <TouchableOpacity onPress={handleTrashPress}>
          <Ionicons
            style={{ marginVertical: 12, marginBottom: 15 }}
            name="trash-outline"
            size={30}
            color={COLORS.terceary}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
}
