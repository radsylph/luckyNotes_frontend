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

import AsyncStorage from "@react-native-async-storage/async-storage";
import BarButton from "../components/BarButton";

const Main = () => {
  const [token, setToken] = useState("");

  const getToken = async () => {
    try {
      const tokenAuth = await AsyncStorage.getItem("token");
      console.log(tokenAuth);
      if (token !== null) {
        setToken(tokenAuth);
        alert(tokenAuth);
      }
    } catch (error) {
      console.log(error);

      return alert(error);
    }
    console.log(token);
  };

  useEffect(() => {
    getToken();
  }, []);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.primary }}>
      <View
        style={{
          backgroundColor: COLORS.primary,
          justifyContent: "space-between",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
          height: 50,
          borderBottomColor: COLORS.secundary,
          borderBottomWidth: 1,
        }}
      >
        <Image
          source={require("../assets/2sintil.png")}
          style={{
            width: 48,
            height: 25,
          }}
        />

        <View>
          <TouchableOpacity>
            <Ionicons
              style={{ marginVertical: 5 }}
              name="add-circle"
              size={40}
              color={COLORS.secundary}
            />
          </TouchableOpacity>
        </View>
      </View>

      <View style={{ flex: 1 }}>
        <FlatList
          style={{ marginHorizontal: 12 }}
          keyboardDismissMode="on-drag"
          containerCustomStyle={{ overflow: "visible" }}
          data={ItemNote}
          renderItem={oneNote}
        />
      </View>
      <BarButton />
    </SafeAreaView>
  );
};

export default Main;
