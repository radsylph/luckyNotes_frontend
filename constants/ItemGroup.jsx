import { Text, View, TouchableOpacity, Pressable } from "react-native";
import COLORS from "./colors";
import { Ionicons } from "@expo/vector-icons";
import { Colors } from "react-native/Libraries/NewAppScreen";
import axios from "axios";
import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

const OneGroup = ({ item, navigation }) => {
  const [token, setToken] = useState("");
  const deleteToken = async () => {
    try {
      await AsyncStorage.removeItem("token");
      console.log("token removed");
    } catch (error) {
      console.log(error);
    }
  };

  const getToken = async (groupId) => {
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
      alert("test1");
      console.log(error);
    }
  };
  return (
    <View
      style={{
        borderRadius: 20,
        backgroundColor: COLORS.secundary,
        marginVertical: 4,
        height: 80,
        justifyContent: "space-between",
        flexDirection: "row",
      }}
    >
      <Pressable
        onPress={() => {
          navigation.navigate("groupInside", {
            groupId: item.id,
            groupName: item.name,
          });
          // alert(item.name);
        }}
        style={({ pressed }) => [
          {
            paddingLeft: 10,
            backgroundColor: pressed ? COLORS.contras1 : COLORS.secundary,
            borderTopLeftRadius: 20,
            borderBottomLeftRadius: 20,
            width: 230,
          },
        ]}
      >
        <Text
          style={{
            color: COLORS.terceary,
            fontSize: 20,
            fontWeight: "bold",
            marginVertical: 4,
          }}
        >
          {item.name}
        </Text>
        <Text style={{ color: COLORS.terceary }}>{item.Description}</Text>
      </Pressable>

      <View
        style={{
          justifyContent: "space-between",
          flexDirection: "row",
          marginVertical: 8,
          position: "relative",
        }}
      >
        <Pressable
          style={({ pressed }) => [
            {
              backgroundColor: pressed ? COLORS.contras1 : COLORS.secundary,
              borderRadius: 20,
              marginHorizontal: 3,
            },
          ]}
        >
          <Ionicons
            style={{ marginVertical: 12, marginHorizontal: 8 }}
            name="archive-outline"
            size={30}
            color={COLORS.terceary}
          />
        </Pressable>
      </View>
    </View>
  );
};

export default OneGroup;
