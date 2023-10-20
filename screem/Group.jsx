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
import { HAaderAl } from "../components/HAader";
import OneGroup from "../constants/ItemGroup.jsx";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

const Group = ({ navigation }) => {
  const [token, setToken] = useState("");
  const [groups, setGroups] = useState([]);

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

  getGroups = async () => {
    try {
      const response = await axios.get(
        "https://luckynotesbackend-production.up.railway.app/note/series",
        {
          headers: {
            Authorization: "Bearer " + token,
            "Content-Type": "application/json",
          },
        }
      );
      console.log(response.data.status);
      if (response.data.status === 200) {
        const groups = response.data.series;
        const userGroups = groups.map((group) => {
          return {
            id: group._id,
            name: group.Name,
            Description: group.Description,
          };
        });
        setGroups(userGroups);
      }
    } catch (error) {
      alert("test");
      console.log(error.response.data);
    }
  };

  useEffect(() => {
    getToken();
  }, []);

  useEffect(() => {
    if (token) {
      getGroups();
    }
  }, [token]);

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      if (token) {
        getGroups();
      }
    });
    return unsubscribe;
  }, [token, navigation]);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.primary }}>
      <HAaderAl navigation={navigation} />

      <View style={{ flex: 1, backgroundColor: COLORS.quaternary }}>
        <FlatList
          style={{ marginHorizontal: 12 }}
          keyboardDismissMode="on-drag"
          containerCustomStyle={{ overflow: "visible" }}
          data={groups}
          renderItem={({ item }) => (
            <OneGroup item={item} navigation={navigation} />
          )}
        />
      </View>
      <BarButton navigation={navigation} />
    </SafeAreaView>
  );
};

export default Group;
