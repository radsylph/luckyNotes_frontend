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
import HAader2 from "../components/HAader2";
import OneGroupNote from "../constants/ItemGroupNote.jsx";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

const GroupInside = ({ navigation, route }) => {
  const [token, setToken] = useState("");
  const [groupsNotes, setGroupsNotes] = useState([]);
  const { groupName } = route.params;

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

  getGroupsNotes = async () => {
    try {
      const response = await axios.get(
        `https://luckynotesbackend-production.up.railway.app/note/series/${groupName}`,
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );
      console.log(response.data.status);
      if (response.data.status === 200) {
        const groupsNotes = response.data.notes;
        const userGroupsNotes = groupsNotes.map((group) => {
          return {
            name: group.title,
            id: group._id,
            Description: group.content,
            favorite: group.favorite,
            trash: group.trash,
          };
        });
        setGroupsNotes(userGroupsNotes);
      }
    } catch (error) {
      console.log(error.response.data);
      alert(error);
    }
  };

  useEffect(() => {
    getToken();
  }, []);

  useEffect(() => {
    if (token) {
      getGroupsNotes();
    }
  }, [token]);

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      if (token) {
        getGroupsNotes();
      }
    });
  }, [navigation]);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.primary }}>
      <HAader2 navigation={navigation} />

      <View style={{ flex: 1, backgroundColor: COLORS.quaternary }}>
        <FlatList
          style={{ marginHorizontal: 12 }}
          keyboardDismissMode="on-drag"
          containerCustomStyle={{ overflow: "visible" }}
          data={groupsNotes}
          renderItem={({ item }) => (
            <OneGroupNote item={item} navigation={navigation} />
          )}
        />
      </View>
      <BarButton navigation={navigation} />
    </SafeAreaView>
  );
};

export default GroupInside;
