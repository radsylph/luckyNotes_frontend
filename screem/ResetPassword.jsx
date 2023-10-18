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

const ResetPassword = ({ navigation }) => {
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessages, setAlertMessages] = useState([]);
  const [alertTitle, setAlertTitle] = useState("");
  const [email, setEmail] = useState("");
  const handleSubmit = async (e) => {
    e.preventDefault();

    const userData = {
      email,
    };
    try {
      const response = await axios.post(
        "https://luckynotesbackend-production.up.railway.app/auth/reset_password",
        userData
      );
      if (response.status == "200") {
        // estAlertTitle("Success");
        // setAlertMessages(["Check your email to reset your password"]);
        // setShowAlert(true);
        alert("Check your email to reset your password");
        navigation.navigate("login");
        console.log(response.data);
      }
    } catch (error) {
      console.log(error.response.data);
      const errors = error.response.data.errors;
      console.log(errors);
      setAlertTitle("Error");
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
              Reseting Credentials
            </Text>

            <Text
              style={{
                fontSize: 16,
                color: COLORS.terceary,
              }}
            >
              You keep forgetting your password, don't you?
            </Text>
            <View style={{ marginBottom: 14 }}>
              <Text
                style={{
                  fontSize: 16,
                  fontWeight: 400,
                  marginVertical: 8,
                  color: COLORS.terceary,
                }}
              >
                Email
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
                  placeholder="Enter your email"
                  placeholderTextColor={COLORS.terceary}
                  keyboardType="default"
                  value={email}
                  onChangeText={(text) => setEmail(text)}
                  style={{
                    color: COLORS.terceary,
                    width: "100%",
                  }}
                />
              </View>
            </View>

            <Button
              title="login"
              onPress={handleSubmit}
              style={{
                marginTop: 18,
                marginBottom: 4,
              }}
            />
            {/* <View
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
                  Rest
                </Text>
              </Pressable>
            </View> */}
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default ResetPassword;
