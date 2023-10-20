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
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const CreateGroup = ({ navigation }) => {
  const [token, setToken] = useState("");
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessages, setAlertMessages] = useState([]);
  const [alertTitle, setAlertTitle] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

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

  const handleSubmit = async (e) => {
    e.preventDefault();

    const userData = {
      Name: title,
      Description: description,
    };
    console.log(userData);
    try {
      const response = await axios.post(
        "https://luckynotesbackend-production.up.railway.app/note/create_series",
        userData,
        {
          headers: {
            Authorization: "Bearer " + token,
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 200) {
        alert("group created");
        navigation.navigate("group");
      }
    } catch (error) {
      if (error.response.data.status == "405") {
        alert("Session expired, please login again");
        deleteToken();
        navigation.navigate("welcome");
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
              Create your Group of notes
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
                Put your group title
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
                  placeholder="Group Title"
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
            <View style={{ marginBottom: 12 }}>
              <Text
                style={{
                  fontSize: 16,
                  fontWeight: 400,
                  marginVertical: 8,
                  color: COLORS.terceary,
                }}
              >
                some group description
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
                  multiline={true}
                  numberOfLines={10}
                  placeholder="Enter your Group Description (optional)"
                  placeholderTextColor={COLORS.terceary}
                  value={description}
                  onChangeText={(text) => setDescription(text)}
                  keyboardType="default"
                  style={{
                    color: COLORS.terceary,
                    width: "100%",
                    height: "100%",
                  }}
                />
              </View>
            </View>

            <Button
              title="Create Group"
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

export default CreateGroup;