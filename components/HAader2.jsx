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

const HAader2 = ({ navigation }) => {
  const handleMAILPress = () => {
    alert("Mail se");
    navigation.navigate("main");
  };

  return (
    <View
      style={{
        backgroundColor: COLORS.contras2,
        justifyContent: "space-between",
        flexDirection: "row",
        alignItems: "center",
        height: 50,
        borderBottomColor: COLORS.terceary,
        borderBottomWidth: 1,
      }}
    >
      <TouchableOpacity onPress={handleMAILPress}>
        <Ionicons
          style={{ marginVertical: 5 }}
          name="chevron-back-outline"
          size={40}
          color={COLORS.terceary}
        />
      </TouchableOpacity>

      <TouchableOpacity>
        <Ionicons
          style={{ marginVertical: 5 }}
          name="add-circle"
          size={40}
          color={COLORS.contras2}
        />
      </TouchableOpacity>

      <TouchableOpacity>
        <Ionicons
          style={{ marginVertical: 5 }}
          name="add-circle"
          size={40}
          color={COLORS.contras2}
        />
      </TouchableOpacity>
    </View>
  );
};

export default HAader2;
