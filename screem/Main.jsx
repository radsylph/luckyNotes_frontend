import {
  View,
  Text,
  TextInput,
  ScrollView,
  TouchableOpacity,
  Pressable,
  FlatList,
} from "react-native";
import React, { useState, useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import COLORS from "../constants/colors";
import { Colors } from "react-native/Libraries/NewAppScreen";
import { Ionicons } from "@expo/vector-icons";
import Checkbox from "expo-checkbox";
import Button from "../components/Button";
import SearchBar from "../components/SearchBar";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { ItemNote, oneNote } from "../constants/ItemNote";

const Main = () => {
  const [token, setToken] = useState("");

  const getToken = async () => {
    try {
      const tokenAuth = await AsyncStorage.getItem("token");
      console.log(tokenAuth);
      if (token !== null) {
        setToken(tokenAuth);
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
      <View style={{ marginHorizontal: 22 }}>
        <View>
          <SearchBar />
        </View>
      </View>

      <View style={{ flex: 1, marginHorizontal: 22 }}>
        <FlatList
          keyboardDismissMode="on-drag"
          containerCustomStyle={{ overflow: "visible" }}
          data={ItemNote}
          renderItem={oneNote}
          View
        />

        <Ionicons name="add-circle-outline" size={50} color={COLORS.terceary} />
      </View>
    </SafeAreaView>
  );
};

export default Main;
