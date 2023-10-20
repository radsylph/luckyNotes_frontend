import {
  View,
  Text,
  TextInput,
  ScrollView,
  TouchableOpacity,
  Pressable,
  FlatList,
  Image,
  StyleSheet,
} from "react-native";
import { React, useEffect, useRef, useState } from "react";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { SelectList } from "react-native-dropdown-select-list";
import COLORS from "../constants/colors";

const GroupSelec = () => {
  const [selected, setSelected] = useState(null);
  const [data, setData] = useState([]);
  const [token, setToken] = useState("");

  // useEffect(() => {
  //   axios
  //     .get("https://luckynotesbackend-production.up.railway.app/note/series")
  //     .then((response) => {
  //       // Store Values in Temporary Array
  //       let newArray = response.data.map((item) => {
  //         return { key: item.id, value: item.name };
  //       });
  //       //Set Data Variable
  //       setData(newArray);
  //     });
  // }, []);

  const getToken = async () => {
    try {
      const tokenAuth = await AsyncStorage.getItem("token");
      if (!tokenAuth) {
        alert("please login again");
        deleteToken();
        navigation.navigate("welcome");
      }
      if (tokenAuth) {
        alert(tokenAuth);
        try {
          const response = await axios.get(
            "https://luckynotesbackend-production.up.railway.app/note/series",

            {
              headers: {
                Authorization: "Bearer " + tokenAuth,
                "Content-Type": "application/json",
              },
            }
          );
          console.log(response.data);
          const groups = response.data.series;
          const userGroups = groups.map((item) => {
            return { label: item._id, value: item.Name };
          });
          setData(userGroups);
        } catch (error) {
          console.log(error.response.data);
          alert("test2");
        }
      }
    } catch (error) {
      console.log(error);
      alert(error);
    }
  };
  useEffect(() => {
    getToken();
  }, []);

  const deleteToken = async () => {
    try {
      await AsyncStorage.removeItem("token");
      console.log("token removed");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <SelectList
      placeholder="Select Folders"
      searchPlaceholder="this are the folders"
      inputStyles={{ color: COLORS.terceary }}
      boxStyles={{
        backgroundColor: COLORS.contras1,
        borderColor: COLORS.terceary,
        borderWidth: 1,
      }}
      dropdownStyles={{ backgroundColor: COLORS.secundary }}
      dropdownItemStyles={{
        backgroundColor: COLORS.terceary,
        borderWidth: 1,
        borderColor: COLORS.secundary,
      }}
      dropdownTextStyles={{ backgroundColor: COLORS.gray }}
      data={data}
      onSelect={() => alert(selected)}
      setSelected={setSelected}
    />
  );
};

export default GroupSelec;

const styles = StyleSheet.create({
  abanico: {
    backgroundColor: "white",
    position: "absolute",
    top: 40,
    width: "100%",
    zIndex: 999,
  },
});
