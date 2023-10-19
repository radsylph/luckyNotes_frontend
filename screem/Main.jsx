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
import OneNote from "../constants/ItemNote.jsx";

import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import BarButton from "../components/BarButton";
import HAader from "../components/HAader";
import { get } from "react-native/Libraries/TurboModule/TurboModuleRegistry";

const Main = ({ navigation }) => {
  const [token, setToken] = useState("");
  const [notes, setNotes] = useState([]);

  const getToken = async () => {
    try {
      const tokenAuth = await AsyncStorage.getItem("token");
      if (!tokenAuth) {
        alert("please login again");
        deleteToken();
        navigation.navigate("welcome");
      }
      if (tokenAuth) {
        setToken(tokenAuth);
      }
    } catch (error) {
      console.log(error);
      alert(error);
    }
  };
  const deleteToken = async () => {
    try {
      await AsyncStorage.removeItem("token");
      console.log("token removed");
    } catch (error) {
      console.log(error);
    }
  };

  const getNotes = async () => {
    try {
      const response = await axios.get(
        "https://luckynotesbackend-production.up.railway.app/note/user",
        {
          headers: {
            Authorization: "Bearer " + token,
            "Content-Type": "application/json",
          },
        }
      );

      if (response.data.status === 200) {
        const notes = response.data.notes;
        const UserNotes = notes.map((nota) => {
          return {
            name: nota.title,
            Descripcion: nota.content,
            id: nota._id,
            fav: nota.fav,
            trash: nota.trash,
          };
        });
        setNotes(UserNotes);
      }
    } catch (error) {
      console.log(error.response.data);
    }
  };

  useEffect(() => {
    getToken();
  }, []);

  useEffect(() => {
    if (token) {
      getNotes();
    }
  }, [token, notes]);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.primary }}>
      <HAader navigation={navigation} />
      <View style={{ flex: 1 }}>
        <FlatList
          style={{ marginHorizontal: 12 }}
          keyboardDismissMode="on-drag"
          containerCustomStyle={{ overflow: "visible" }}
          data={notes}
          renderItem={({ item }) => (
            <OneNote item={item} navigation={navigation} />
          )}
        />
      </View>
      <BarButton navigation={navigation} />
    </SafeAreaView>
  );
};

export default Main;
