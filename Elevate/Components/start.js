import {
  View,
  Text,
  ImageBackground,
  Button,
  SafeAreaView,
} from "react-native";
import React from "react";
import AppButton from "./btn";

export default function Start({ navigation }) {
  return (
    <ImageBackground
      source={require("../assets/logo.png")}
      resizeMode="cover"
      style={{ flex: 1, justifyContent: "center" }}
    >
      <View style={{ flex: 1 }}>
        <View style={{ flex: 1 }}>
          <View
            style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
          >
            <AppButton name={navigation} />
          </View>
        </View>
      </View>
    </ImageBackground>
  );
}
