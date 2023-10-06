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

const Main = ({ navigation }) => {
  const [isPasswordShown, setIsPasswordShown] = useState(false);
  const [isChecked, setIsChecked] = useState(false);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.secundary }}>
      <View style={{ flex: 1, marginHorizontal: 22 }}>
        <ScrollView>
          <View style={{ marginVertical: 22 }}>
            <Button
              title=" Out Session"
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
                no hay nada aqui LARGO!!
              </Text>
            </View>
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default Main;
