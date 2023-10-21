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
import axios from "axios";
import BarButton from "../components/BarButton";
import AsyncStorage from "@react-native-async-storage/async-storage";

const HAader = ({ navigation }) => {
  const [token, setToken] = useState("");
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
    }
  };

  const getUserInfo = async () => {
    try {
      if (!token) {
        alert("please login again");
        //deleteToken();
        //navigation.navigate("welcome");
      }
      if (token) {
        const response = await axios.get(
          "https://luckynotesbackend-production.up.railway.app/auth/getUser",
          {
            headers: {
              Authorization: "Bearer " + token,
              "Content-Type": "application/json",
            },
          }
        );
        console.log(response.status);
        if (response.status === 200) {
          console.log(response.data);
          console.log(response.data.user.name);
          console.log(response.data.user.email);
          console.log(response.data.user.username);
          console.log(response.data.user.lastname);
          console.log(response.data.user._id);

          navigation.navigate("user", {
            CurrentName: response.data.user.name,
            CurrentEmail: response.data.user.email,
            CurrentUserName: response.data.user.username,
            CurrentLastName: response.data.user.lastname,
          });
        }
      }
    } catch (error) {
      console.log(error.status);
      alert(error);
    }
  };

  const handleUserPress = () => {
    getUserInfo();
    // navigation.navigate("user ");
  };

  useEffect(() => {
    getToken();
  }, []);

  const handleCreatePress = () => {

    navigation.navigate("create");
  };

  const handleLogOutPress = () => {
    deleteToken();
    navigation.navigate("welcome");
  };

  return (
    <View
      style={{
        backgroundColor: COLORS.primary,
        justifyContent: "space-between",
        flexDirection: "row",
        alignItems: "center",
        height: 50,
        borderBottomColor: COLORS.terceary,
        borderBottomWidth: 1,
      }}
    >
      <TouchableOpacity onPress={handleLogOutPress}>
        <Ionicons
          style={{ marginVertical: 5 }}
          name="log-out-outline"
          size={40}
          color={COLORS.secundary}
        />
      </TouchableOpacity>

      <TouchableOpacity onPress={handleUserPress}>
        <Ionicons
          style={{ marginVertical: 5 }}
          name="person-circle-outline"
          size={40}
          color={COLORS.secundary}
        />
      </TouchableOpacity>

      <TouchableOpacity onPress={handleCreatePress}>
        <Ionicons
          style={{ marginVertical: 5 }}
          name="add-circle"
          size={40}
          color={COLORS.secundary}
        />
      </TouchableOpacity>
    </View>
  );
};

const HAaderAl = ({ navigation }) => {
  const handleMAILPress = () => {
    navigation.navigate("main");
  };

  const handleCreateGroup = () => {
    navigation.navigate("createGroup");
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
      <TouchableOpacity onPress={handleCreateGroup}>
        <Ionicons
          style={{ marginVertical: 5 }}
          name="add-circle"
          size={40}
          color={COLORS.primary}
        />
      </TouchableOpacity>
    </View>
  );
};

export { HAaderAl, HAader };
