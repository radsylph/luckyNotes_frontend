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
import { React, useEffect, useRef, useState, useCallback } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import COLORS from "../constants/colors";
import { Ionicons } from "@expo/vector-icons";
import Button from "../components/Button";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { ItemNote, oneNote } from "../constants/ItemNote";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import BarButton from "../components/BarButton";
import HAader2 from "../components/HAader2";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import OneNote from "../constants/ItemNote.jsx";

const Favorite = ({ navigation }) => {
  const [token, setToken] = useState("");
  const [notes, setNotes] = useState([]);

  const deleteToken = async () => {
    try {
      await AsyncStorage.removeItem("token");
      console.log("token removed");
    } catch (error) {
      console.log(error);
    }
  };

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

  getFavNotes = async () => {
    try {
      const response = await axios.get(
        "https://luckynotesbackend-production.up.railway.app/note/Fav",
        {
          headers: {
            Authorization: "Bearer " + token,
            "Content-Type": "application/json",
          },
        }
      );
      console.log(response.data.status);
      if (response.data.status === 200) {
        const notes = response.data.favNotes;
        const UserNotes = notes.map((nota) => {
          return {
            name: nota.title,
            Descripcion: nota.content,
            id: nota._id,
            favorite: nota.favorite,
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
      getFavNotes();
    }
  }, [token]);

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      if (token) {
        getFavNotes();
      }
    });
    return unsubscribe;
  }, [token, navigation]);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.primary }}>
      <HAader2 navigation={navigation} />

      <View style={{ flex: 1, backgroundColor: COLORS.favoritos }}>
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

export default Favorite;
