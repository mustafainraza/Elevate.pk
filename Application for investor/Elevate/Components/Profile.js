import React, { useState, useContext, useEffect } from "react";
import {
  View,
  Text,
  Header,
  Image,
  Pressable,
  Button,
  ScrollView,
  SafeAreaView,
  TextInput,
  ActivityIndicator,
} from "react-native";
import AppContext from "./AppContext";
import { Avatar } from "react-native-paper";
import { Platform } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
const Tab = createMaterialTopTabNavigator();
const Profile = ({ navigation }) => {
  const myContext = useContext(AppContext);
  // const name = "Syed Basit Abbas ";
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#ffffff" }}>
      <View
        style={{
          flex: 1,
          flexDirection: "row",
          backgroundColor: "#ffffff",
          marginBottom: "-5%",
        }}
      >
        {!myContext.Is_data ? (
          <View style={{ flex: 1 }}>
            <ActivityIndicator
              size={40}
              color="#F23B25"
              style={{
                marginTop: "40%",
                alignItems: "center",
                marginLeft: "170%",
              }}
            />
          </View>
        ) : Platform.OS === "ios" ? (
          <View
            style={{
              flex: 0.85,
              justifyContent: "center",
              alignItems: "center",
              marginLeft: "3%",
              marginBottom: "10%",
            }}
          >
            {myContext.imageset ? (
              myContext.pickedImagePath !== "data:image/jpg;base64,null" ? (
                <Avatar.Image
                  size={100}
                  source={{
                    uri: `data:image/jpg;base64,${myContext.pickedImagePath}`,
                  }}
                />
              ) : (
                <Avatar.Image
                  size={100}
                  source={require("../assets/Userr.png")}
                />
              )
            ) : (
              <Avatar.Image
                size={100}
                source={require("../assets/Userr.png")}
              />
            )}
          </View>
        ) : (
          <View
            style={{
              flex: 0.85,
              justifyContent: "center",
              alignItems: "center",
              marginLeft: "3%",
              marginBottom: "10%",
              marginTop: "10%",
            }}
          >
            {myContext.imageset ? (
              myContext.pickedImagePath !== "data:image/jpg;base64,null" ? (
                <Avatar.Image
                  size={100}
                  source={{
                    uri: `data:image/jpg;base64,${myContext.pickedImagePath}`,
                  }}
                />
              ) : (
                <Avatar.Image
                  size={100}
                  source={require("../assets/Userr.png")}
                />
              )
            ) : (
              <Avatar.Image
                size={100}
                source={require("../assets/Userr.png")}
              />
            )}
          </View>
        )}
        {Platform.OS === "ios" ? (
          <View
            style={{
              marginTop: "19%",
              flex: 2.4,
            }}
          >
            <Text
              style={{
                fontWeight: "bold",
                fontFamily: Platform.OS === "ios" ? "Arial" : "serif",
                fontSize: 24,
              }}
            >
              {myContext.name}
            </Text>
          </View>
        ) : (
          <View
            style={{
              marginTop: "28%",
              flex: 2.4,
              marginLeft: "2%",
            }}
          >
            <Text
              style={{
                fontWeight: "bold",
                fontFamily: Platform.OS === "ios" ? "Arial" : "serif",
                fontSize: 24,
              }}
            >
              {myContext.name}
            </Text>
          </View>
        )}
      </View>
      <Pressable
        style={{
          backgroundColor: "#D6252E", //"#dcdcdc",
          height: "4%",
          borderColor: "#dcdcdc",
          borderRadius: 8,
          marginLeft: "5%",
          marginRight: "5%",
          marginBottom: "5%",
        }}
        onPress={() => navigation.navigate("Edit_Profile")}
      >
        <Text
          style={{
            fontWeight: "bold",
            fontFamily: Platform.OS === "ios" ? "Arial" : "serif",
            fontSize: 15,
            textAlign: "center",
            paddingTop: "1%",
            color: "#f5f5f5",
          }}
        >
          Edit Profile
        </Text>
      </Pressable>
      <View
        style={{
          flex: 3,
        }}
      >
        <Tab.Navigator>
          <Tab.Screen
            name=" Backed projects"
            component={BackedScrenn}
          ></Tab.Screen>

          <Tab.Screen name=" Rewards" component={RewardScreen}></Tab.Screen>
          {/* <Tab.Screen
            name="Profile Details"
            component={ProfileScreen}
          ></Tab.Screen> */}
        </Tab.Navigator>
      </View>
    </SafeAreaView>
  );
};
function BackedScrenn({ navigation }) {
  const [imageset, setimageset] = useState(true);
  const backedscreen_text1 = "Explore Creative Projects";
  const backedscreen_text2 =
    "Pledge to your favourites, then view all the projects you've backed here.";
  const [data, setData] = useState(true);
  return data ? (
    <View style={{ flex: 1 }}>
      <Pressable
        style={{
          marginTop: "30%",
          paddingBottom: "3%",
          alignSelf: "center",
        }}
        onPress={() => navigation.navigate("Search")}
      >
        <Text
          style={{
            fontWeight: "bold",
            fontFamily: Platform.OS === "ios" ? "Arial" : "serif",
            fontSize: 24,
          }}
        >
          {backedscreen_text1}
        </Text>
      </Pressable>
      <Text
        style={{
          fontFamily: Platform.OS === "ios" ? "Arial" : "serif",
          marginHorizontal: "5%",
          fontSize: 16,
          color: "#808080",
          textAlign: "center",
        }}
      >
        {backedscreen_text2}
      </Text>
    </View>
  ) : (
    <View>
      <Text>bz</Text>
    </View>
  );
}
function RewardScreen() {
  const RewardScreenData = "This is rewards screen";
  return (
    <View style={{ flex: 1 }}>
      <Text>{RewardScreenData}</Text>
    </View>
  );
}
export default Profile;
