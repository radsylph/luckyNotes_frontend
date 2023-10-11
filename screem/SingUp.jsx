import {
  View,
  Text,
  TextInput,
  ScrollView,
  TouchableOpacity,
  Pressable,
} from "react-native";
import axios from "axios";
import React, { useState, useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import COLORS from "../constants/colors";
import { Colors } from "react-native/Libraries/NewAppScreen";
import { Ionicons } from "@expo/vector-icons";
import Checkbox from "expo-checkbox";
import Button from "../components/Button";

const SingUp = ({ navigation }) => {
  const [isPasswordShown, setIsPasswordShown] = useState(true);
  const [isChecked, setIsChecked] = useState(false);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassowrd] = useState("");
  const [name, setName] = useState("");
  const [lastname, setLastname] = useState("");
  const [errors, setErrors] = useState([]);

  useEffect(() => {}, [errors]);
  const handleSubmit = async () => {
    const userData = {
      name,
      lastname,
      username,
      email,
      password,
    };

    console.log(userData);
    try {
      const response = await axios.post(
        "https://luckynotesbackend-production.up.railway.app/auth/create",
        userData
      );
      console.log(response.status);
      console.log(response.data);
      if (response.status == "201") {
        alert("User created successfully, we have send an email ");
        navigation.navigate("login");
      }
    } catch (error) {
      console.error("Axios Error:", error);
    }

    //navigation.navigate("login") //asi es que se va al login
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.secundary }}>
      <View style={{ flex: 1, marginHorizontal: 22 }}>
        <ScrollView>
          <View style={{ marginVertical: 22 }}>
            <Text
              style={{
                fontSize: 22,
                fontWeight: "bold",
                marginVertical: 12,
                color: COLORS.terceary,
              }}
            >
              Create your Lucky Note account
            </Text>

            <Text
              style={{
                fontSize: 16,
                color: COLORS.terceary,
              }}
            >
              Write notes & to-do lists
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
                  placeholder="Enter your User Name"
                  placeholderTextColor={COLORS.terceary}
                  keyboardType="default"
                  onChangeText={(e) => setUsername(e)}
                  value={username}
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
                E-mail
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
                  placeholder="Enter your E-mail"
                  placeholderTextColor={COLORS.terceary}
                  keyboardType="email-address"
                  style={{
                    color: COLORS.terceary,
                    width: "100%",
                  }}
                  onChangeText={(e) => setEmail(e)}
                  value={email}
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
                  placeholder="Enter your Name"
                  placeholderTextColor={COLORS.terceary}
                  keyboardType="default"
                  style={{
                    color: COLORS.terceary,
                    width: "100%",
                  }}
                  value={name}
                  onChangeText={(e) => setName(e)}
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
                  placeholder="Enter your Last Name"
                  placeholderTextColor={COLORS.terceary}
                  keyboardType="default"
                  style={{
                    color: COLORS.terceary,
                    width: "100%",
                  }}
                  value={lastname}
                  onChangeText={(e) => setLastname(e)}
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
                  style={{
                    color: COLORS.terceary,
                    width: "100%",
                  }}
                  value={password}
                  onChangeText={(e) => setPassowrd(e)}
                  keyboardType="default"
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
              title="Sign Up"
              filled
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
                Already have an account ?
              </Text>
              <Pressable onPress={() => navigation.navigate("login")}>
                <Text
                  style={{
                    fontSize: 16,
                    color: COLORS.terceary,
                    fontWeight: "bold",
                    marginLeft: 6,
                  }}
                >
                  {" "}
                  Login
                </Text>
              </Pressable>
            </View>
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default SingUp;
