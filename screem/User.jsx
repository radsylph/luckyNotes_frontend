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
import AsyncStorage from "@react-native-async-storage/async-storage";
import BarButton from "../components/BarButton";
import HAader2 from "../components/HAader2";

const User = ({ navigation, route }) => {
  const { CurrentName, CurrentEmail, CurrentUserName, CurrentLastName } =
    route.params;
  const [isPasswordShown, setIsPasswordShown] = useState(true);
  const [name, setName] = useState(CurrentName);
  const [lastName, setLastName] = useState(CurrentLastName);
  const [userName, setUserName] = useState(CurrentUserName);
  const [token, setToken] = useState("");

  const getToken = async () => {
    try {
      const tokenAuth = await AsyncStorage.getItem("token");
      if (!tokenAuth) {
        alert("please login again");
        //deleteToken();
        //navigation.navigate("welcome");
      }
      if (tokenAuth) {
        setToken(tokenAuth);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleEdit = async () => {
    const userData = {
      name: name,
      lastname: lastName,
      username: userName,
    };
    console.log(userData);

    try {
      const response = await axios.put(
        "https://luckynotesbackend-production.up.railway.app/auth/editUser",
        userData,
        {
          headers: {
            Authorization: "Bearer " + token,
            "Content-Type": "application/json",
          },
        }
      );
      if (response.status === 200) {
        alert("user edited");
        navigation.navigate("main");
      }
    } catch (error) {
      console.log(error);
      alert(error);
    }
  };

  useEffect(() => {
    console.log(CurrentName);
    console.log(CurrentEmail);
    console.log(CurrentUserName);
    console.log(CurrentLastName);
    getToken();
  }, []);
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.secundary }}>
      <HAader2 navigation={navigation} />
      <View style={{ flex: 1, marginHorizontal: 22 }}>
        <ScrollView>
          <View style={{ marginVertical: 22 }}>
            <View style={{ marginBottom: 12 }}>
              <Text
                style={{
                  fontSize: 16,
                  fontWeight: 400,
                  marginVertical: 8,
                  color: COLORS.terceary,
                }}
              >
                User Name
              </Text>

              <View
                style={{
                  width: "100%",
                  height: 48,
                  borderColor: COLORS.primary,
                  borderWidth: 1,
                  borderRadius: 8,
                  alignItems: "center",
                  justifyContent: "center",
                  paddingLeft: 22,
                  backgroundColor: "rgba(178,178,178,0.5)",
                }}
              >
                <TextInput
                  keyboardType="default"
                  value={userName}
                  onChangeText={(text) => setUserName(text)}
                  style={{
                    color: COLORS.terceary,
                    width: "100%",
                  }}
                />
              </View>
            </View>
            <View style={{ marginBottom: 12 }}>
              <Text
                style={{
                  fontSize: 16,
                  fontWeight: 400,
                  marginVertical: 8,
                  color: COLORS.terceary,
                }}
              >
                Name
              </Text>

              <View
                style={{
                  width: "100%",
                  height: 48,
                  borderColor: COLORS.primary,
                  borderWidth: 1,
                  borderRadius: 8,
                  alignItems: "center",
                  justifyContent: "center",
                  paddingLeft: 22,
                  backgroundColor: "rgba(178,178,178,0.5)",
                }}
              >
                <TextInput
                  keyboardType="default"
                  value={name}
                  onChangeText={(text) => setName(text)}
                  style={{
                    color: COLORS.terceary,
                    width: "100%",
                  }}
                />
              </View>
            </View>
            <View style={{ marginBottom: 12 }}>
              <Text
                style={{
                  fontSize: 16,
                  fontWeight: 400,
                  marginVertical: 8,
                  color: COLORS.terceary,
                }}
              >
                Last Name
              </Text>

              <View
                style={{
                  width: "100%",
                  height: 48,
                  borderColor: COLORS.primary,
                  borderWidth: 1,
                  borderRadius: 8,
                  alignItems: "center",
                  justifyContent: "center",
                  paddingLeft: 22,
                  backgroundColor: "rgba(178,178,178,0.5)",
                }}
              >
                <TextInput
                  keyboardType="default"
                  value={lastName}
                  onChangeText={(text) => setLastName(text)}
                  style={{
                    color: COLORS.terceary,
                    width: "100%",
                  }}
                />
              </View>
            </View>
            <View style={{ marginBottom: 12 }}>
              <Text
                style={{
                  fontSize: 16,
                  fontWeight: 400,
                  marginVertical: 8,
                  color: COLORS.terceary,
                }}
              >
                email
              </Text>

              <View
                style={{
                  width: "100%",
                  height: 48,
                  borderColor: COLORS.primary,
                  borderWidth: 1,
                  borderRadius: 8,
                  alignItems: "center",
                  justifyContent: "center",
                  paddingLeft: 22,
                  backgroundColor: "rgba(178,178,178,0.5)",
                }}
              >
                <TextInput
                  placeholder="Enter your User Name"
                  placeholderTextColor={COLORS.terceary}
                  keyboardType="default"
                  style={{
                    color: COLORS.terceary,
                    width: "100%",
                  }}
                />
              </View>
            </View>

            <Button
              title="Change Credentials"
              onPress={handleEdit}
              style={{
                borderColor: COLORS.terceary,
                color: COLORS.terceary,
                backgroundColor: COLORS.success,
                marginTop: 18,
                marginBottom: 4,
              }}
            />

            <Button
              title="Delete acount"
              onPress={() => navigation.navigate("destroyacount")}
              style={{
                borderColor: COLORS.terceary,
                color: COLORS.terceary,
                backgroundColor: COLORS.alert,
                marginTop: 18,
                marginBottom: 4,
              }}
            />
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default User;
