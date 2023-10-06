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
import Button from "../components/Button";

const SingUp = ({ navigation }) => {
  const [isPasswordShown, setIsPasswordShown] = useState(false);
  const [isChecked, setIsChecked] = useState(false);

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
                  keyboardType="UserName"
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
                  keyboardType="E-mail"
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
                  placeholder="Enter your Name"
                  placeholderTextColor={COLORS.terceary}
                  keyboardType="Name"
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
                  placeholder="Enter your Last Name"
                  placeholderTextColor={COLORS.terceary}
                  keyboardType="Last Name"
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
              title="Sign Up"
              filled
              onPress={() => navigation.navigate("welcome")}
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
