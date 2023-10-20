import {
  View,
  Text,
  TextInput,
  ScrollView,
  TouchableOpacity,
  Pressable,
} from "react-native";
import React, { useState, useEffect } from "react";

import { SafeAreaView } from "react-native-safe-area-context";
import COLORS from "../constants/colors";
import { Colors } from "react-native/Libraries/NewAppScreen";
import { Ionicons } from "@expo/vector-icons";
import Checkbox from "expo-checkbox";
import Button from "../components/Button.jsx";
import CustomAlert from "../components/Alert";
import { SelectList } from "react-native-dropdown-select-list";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import HAader2 from "../components/HAader2";
import GroupSelec from "../components/GroupSelec";

const CreateNote = ({ navigation }) => {
  const [token, setToken] = useState("");
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessages, setAlertMessages] = useState([]);
  const [alertTitle, setAlertTitle] = useState("");
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [series, setSeries] = useState("");
  const [fav, setFav] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const [selected, setSelected] = useState(null);
  const [data, setData] = useState([{ label: "None", value: null }]);

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

  const deleteToken = async () => {
    try {
      await AsyncStorage.removeItem("token");
      console.log("token removed");
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getToken();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const userData = {
      title,
      content,
      SerieId: selected,
    };
    console.log(userData);
    try {
      const response = await axios.post(
        "https://luckynotesbackend-production.up.railway.app/note/create_note",
        userData,
        {
          headers: {
            Authorization: "Bearer " + token,
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status == "201") {
        alert("Note created");
        navigation.navigate("main");
      }
    } catch (error) {
      if (error.response.data.status == "405") {
        // alert("Session expired, please login again");
        // deleteToken();
        // navigation.navigate("welcome");
        console.log(error.response.data);
      }
      let errors = error.response.data.errors;
      setAlertMessages(errors.map((error) => error.msg));
      setShowAlert(true);
    }
  };

  const handleCloseAlert = () => {
    setShowAlert(false);
  };

  useEffect(() => {
    getToken();
  }, []);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.secundary }}>
      <HAader2 navigation={navigation} />
      <View style={{ flex: 1, marginHorizontal: 22 }}>
        <ScrollView>
          <View style={{ marginVertical: 22 }}>
            <CustomAlert
              visible={showAlert}
              messages={alertMessages}
              onClose={handleCloseAlert}
              title={"you have the following errors"}
            />
            <Text
              style={{
                fontSize: 22,
                fontWeight: "bold",
                marginVertical: 12,
                color: COLORS.terceary,
              }}
            >
              Create your notes
            </Text>

            <View style={{ marginBottom: 12 }}>
              <Text
                style={{
                  fontSize: 16,
                  fontWeight: 400,
                  marginVertical: 8,
                  color: COLORS.terceary,
                }}
              >
                Put your note title
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
                  placeholder="Note Title"
                  placeholderTextColor={COLORS.terceary}
                  keyboardType="default"
                  value={title}
                  onChangeText={(text) => setTitle(text)}
                  style={{
                    color: COLORS.terceary,
                    width: "100%",
                  }}
                />
              </View>
            </View>
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
              setSelected={setSelected}
            />
            <View style={{ marginBottom: 12 }}>
              <Text
                style={{
                  fontSize: 16,
                  fontWeight: 400,
                  marginVertical: 8,
                  color: COLORS.terceary,
                }}
              >
                Content
              </Text>

              <View
                style={{
                  width: "100%",
                  height: 300,
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
                  multiline={true}
                  numberOfLines={10}
                  placeholder="Enter your note Content"
                  placeholderTextColor={COLORS.terceary}
                  value={content}
                  onChangeText={(text) => setContent(text)}
                  keyboardType="default"
                  style={{
                    textAlignVertical: "top",
                    color: COLORS.terceary,
                    width: "100%",
                    height: "100%",
                  }}
                />
              </View>
            </View>

            <View
              style={{
                flexDirection: "row",
                marginVertical: 6,
              }}
            >
              <Checkbox
                style={{
                  marginRight: 8,
                }}
                value={fav}
                onValueChange={setFav}
                color={isChecked ? COLORS.primary : undefined}
              />
              <Text style={{ color: COLORS.terceary }}>Fav</Text>
            </View>

            <Button
              title="Create Note"
              onPress={handleSubmit}
              style={{
                marginTop: 18,
                marginBottom: 4,
              }}
            />
            <View
              style={{
                flexDirection: "row",
                justifyContent: "center",
                marginVertical: 22,
              }}
            ></View>
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default CreateNote;
