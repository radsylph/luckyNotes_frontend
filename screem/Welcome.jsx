import { View, Text, Image, Pressable, SafeAreaView } from "react-native";
import React from "react";
import COLORS from "../constants/colors";
import { LinearGradient } from "expo-linear-gradient";
import Button from "../components/Button";

const Welcome = ({ navigation }) => {
  return (
    <LinearGradient
      style={{ flex: 1 }}
      colors={[COLORS.primary, COLORS.secundary]}
    >
      <SafeAreaView style={{ flex: 1, justifyContent: "center" }}>
        <View style={{ flex: 1 }}>
          <View style={{ alignItems: "center" }}>
            <Image
              source={require("../assets/2.png")}
              style={{
                top: 170,
                height: 260,
                width: 320,
              }}
            />
          </View>
          <View
            style={{
              paddingHorizontal: 22,
              position: "absolute",
              top: 430,
              width: "100%",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Text
              style={{
                fontSize: 30,
                fontWeight: 800,
                color: COLORS.terceary,
              }}
            >
              Lets Get Started
            </Text>
            <View style={{ marginVertical: 12 }}>
              <Text
                style={{
                  fontSize: 16,
                  color: COLORS.terceary,
                  marginVertical: 4,
                }}
              >
                Write notes & to-do lists
              </Text>
            </View>
            <View style={{ width: "100%" }}>
              <Button
                title="Join Now"
                onPress={() => navigation.navigate("singUp")}
                style={{
                  marginTop: 22,
                }}
              />
            </View>
            <View
              style={{
                flexDirection: "row",
                marginTop: 12,
                justifyContent: "center",
              }}
            >
              <Text style={{ fontSize: 13, color: COLORS.terceary }}>
                Already have an account ?
              </Text>
              <Pressable onPress={() => navigation.navigate("login")}>
                <Text
                  style={{
                    fontSize: 13,
                    color: COLORS.terceary,
                    fontWeight: "bold",
                    marginLeft: 4,
                  }}
                >
                  Login
                </Text>
              </Pressable>
            </View>
          </View>
        </View>
      </SafeAreaView>
    </LinearGradient>
  );
};

export default Welcome;
