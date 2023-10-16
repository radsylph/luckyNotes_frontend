import React, { useRef, useEffect } from "react";
import {
  View,
  Text,
  Modal,
  TouchableOpacity,
  Pressable,
  Animated,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import COLORS from "../constants/colors";
import Button from "./Button";

function CustomAlert({ visible, messages, onClose, title }) {
  const slideAnimation = useRef(new Animated.Value(-100)).current;

  useEffect(() => {
    if (visible) {
      Animated.spring(slideAnimation, {
        toValue: 0,
        useNativeDriver: true,
      }).start();
    } else {
      Animated.spring(slideAnimation, {
        toValue: -100,
        useNativeDriver: true,
      }).start();
    }
  }, [visible]);

  return (
    <Modal visible={visible} transparent={true}>
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "rgba(0,0,0,0.3)",
        }}
      >
        <Animated.View
          style={{
            transform: [{ translateY: slideAnimation }],
            backgroundColor: COLORS.quaternary,
            padding: 8,
            borderRadius: 10,
            alignItems: "center",
            borderWidth: 2,
            borderColor: COLORS.primary,
            shadowColor: COLORS.black,
            shadowOffset: {
              width: 0,
              height: 2,
            },
            shadowOpacity: 0.25,
            shadowRadius: 3.84,
            elevation: 5,
          }}
        >
          <Text
            style={{
              fontSize: 18,
              fontWeight: "bold",
              marginBottom: 10,
              color: COLORS.primary,
            }}
          >
            {title}
          </Text>
          {messages.map((message, index) => (
            <Text
              key={index}
              style={{
                fontSize: 16,
                marginBottom: 20,
                color: COLORS.primary,
              }}
            >
              {message}
            </Text>
          ))}
          <Button title="OK" onPress={onClose} filled style={{ padding: 20 }} />
        </Animated.View>
      </View>
    </Modal>
  );
}

export default CustomAlert;
