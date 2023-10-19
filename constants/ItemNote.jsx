import { Text, View, TouchableOpacity, Pressable } from "react-native";
import COLORS from "./colors";
import { Ionicons } from "@expo/vector-icons";
import { Colors } from "react-native/Libraries/NewAppScreen";
import axios from "axios";
import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

const getToken = async (noteId) => {
  try {
    const tokenAuth = await AsyncStorage.getItem("token");
    if (!tokenAuth) {
      alert("please login again");
      // deleteToken();
      // navigation.navigate("welcome");
    }
    if (tokenAuth) {
      const token = tokenAuth;

      try {
        const response = await axios.patch(
          `https://luckynotesbackend-production.up.railway.app/note/set_fav/${noteId}`,
          {},
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (response.data.status === 200) {
          console.log("success");
        }
      } catch (error) {
        console.log(error.response.data);
        alert("test2");
      }
    }
  } catch (error) {
    alert("test1");
    console.log(error);
  }
};

const OneNote = ({ item, navigation }) => {
  const [isBookmarked, setIsBookmarked] = useState(false);

  const handleBookmarkPress = async (noteId) => {
    // Call the getToken function to set the note as favorite
    await getToken(noteId);

    // Update the state to indicate that the note has been bookmarked
    if (isBookmarked) {
      setIsBookmarked(false);
    } else {
      setIsBookmarked(true);
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
          navigation.navigate("editNote", {
            noteId: item.id,
            noteTitle: item.name,
            noteContent: item.Descripcion,
            noteFavorite: item.favorite,
          });
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
        <Text style={{ color: COLORS.terceary }}>{item.Descripcion}</Text>
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

        <Pressable
          onPress={() => handleBookmarkPress(item.id)}
          style={({ pressed }) => [
            {
              backgroundColor: isBookmarked
                ? COLORS.success
                : pressed
                ? COLORS.contras1
                : COLORS.secundary,
              borderRadius: 20,
              marginHorizontal: 3,
            },
          ]}
        >
          <Ionicons
            style={{ marginVertical: 12, marginHorizontal: 8 }}
            name="bookmark"
            size={30}
            color={COLORS.terceary}
          />
        </Pressable>

        <Pressable
          style={({ pressed }) => [
            {
              backgroundColor: pressed ? COLORS.alert : COLORS.secundary,
              borderRadius: 20,
              marginHorizontal: 3,
            },
          ]}
        >
          <Ionicons
            style={{ marginVertical: 12, marginHorizontal: 8 }}
            name="trash-outline"
            size={30}
            color={COLORS.terceary}
          />
        </Pressable>
      </View>
    </View>
  );
};

export default OneNote;
