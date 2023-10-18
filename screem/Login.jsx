import {
  View,
  Text,
  TextInput,
  ScrollView,
  TouchableOpacity,
  Pressable,
} from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import COLORS from "../constants/colors";
import { Colors } from "react-native/Libraries/NewAppScreen";
import { Ionicons } from "@expo/vector-icons";
import Checkbox from "expo-checkbox";
import Button from "../components/Button.jsx";
import CustomAlert from "../components/Alert";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Login = ({ navigation }) => {
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessages, setAlertMessages] = useState([]);
  const [alertTitle, setAlertTitle] = useState("");
  const [isPasswordShown, setIsPasswordShown] = useState(true);
  const [isChecked, setIsChecked] = useState(false);
  const [user_info, setUser_info] = useState("");
  const [password, setPassword] = useState("");
  const handleSubmit = async (e) => {
    e.preventDefault();

    const userData = {
      user_info,
      password,
    };
    try {
      const response = await axios.post(
        "https://luckynotesbackend-production.up.railway.app/auth/login",
        userData
      );
      if (response.status == "200") {
        const token = response.data.token;
        await AsyncStorage.setItem("token", token);
        navigation.navigate("main");
      }
    } catch (error) {
      let errors = error.response.data.error;
      setAlertMessages(errors.map((error) => error.msg));
      setShowAlert(true);
    }
  };

  const handleCloseAlert = () => {
    setShowAlert(false);
  };

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
              Welcome Back
            </Text>

            <Text
              style={{
                fontSize: 16,
                color: COLORS.terceary,
              }}
            >
              Hello again you been missed!
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
                User Name or email
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
                  placeholder="Enter your User Name / email"
                  placeholderTextColor={COLORS.terceary}
                  keyboardType="default"
                  value={user_info}
                  onChangeText={(text) => setUser_info(text)}
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
                Password
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
                  placeholder="Enter your Password"
                  placeholderTextColor={COLORS.terceary}
                  secureTextEntry={isPasswordShown}
                  value={password}
                  onChangeText={(text) => setPassword(text)}
                  keyboardType="default"
                  style={{
                    color: COLORS.terceary,
                    width: "100%",
                  }}
                />

                <TouchableOpacity
                  onPress={() => setIsPasswordShown(!isPasswordShown)}
                  style={{
                    position: "absolute",
                    right: 12,
                  }}
                >
                  {isPasswordShown == true ? (
                    <Ionicons
                      name="eye-off"
                      size={24}
                      color={COLORS.terceary}
                    />
                  ) : (
                    <Ionicons name="eye" size={24} color={COLORS.terceary} />
                  )}
                </TouchableOpacity>
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
                value={isChecked}
                onValueChange={setIsChecked}
                color={isChecked ? COLORS.primary : undefined}
              />
              <Text style={{ color: COLORS.terceary }}>
                {" "}
                Solo es un placebo!!!
              </Text>
            </View>

            <Button
              title="login"
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
            >
              <Text style={{ fontSize: 16, color: COLORS.terceary }}>
                {" "}
                Don´t have an account ?
              </Text>
              <Pressable onPress={() => navigation.navigate("singUp")}>
                <Text
                  style={{
                    fontSize: 16,
                    color: COLORS.terceary,
                    fontWeight: "bold",
                    marginLeft: 6,
                  }}
                >
                  {" "}
                  Sign Up
                </Text>
              </Pressable>
            </View>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "center",
                marginVertical: 22,
              }}
            >
              <Text style={{ fontSize: 16, color: COLORS.terceary }}>
                {" "}
                Forgot your password ?
              </Text>
              <Pressable onPress={() => navigation.navigate("resetPassword")}>
                <Text
                  style={{
                    fontSize: 16,
                    color: COLORS.terceary,
                    fontWeight: "bold",
                    marginLeft: 6,
                  }}
                >
                  {" "}
                  Rest Password
                </Text>
              </Pressable>
            </View>
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default Login;
