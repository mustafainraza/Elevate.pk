import react, { useState, useEffect } from "react";
import {
  View,
  Text,
  Button,
  Image,
  StyleSheet,
  SafeAreaView,
} from "react-native";
import AppContext from "./Components/AppContext";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Profile from "./Components/Profile";
import Edit_Profile_Screen from "./Components/Edit_Profile_Screen";
import Search_Screen from "./Components/Search_Screen";
//import axios from "axios";
const Stack = createNativeStackNavigator();
export default function App() {
  const [Is_data, SetIs_data] = useState(true);
  const [imageset, setimageset] = useState(true);
  const [email, setEmail] = useState("");
  const [check, setcheck] = useState("");
  const [pickedImagePath, setPickedImagePath] = useState(null);
  const [name, setname] = useState("");
  const [contactno, setcontactno] = useState("");
  const [cnic, setcnic] = useState("");
  const [password, setpassword] = useState("");
  const imagesettings = {
    imageset,
    setimageset,
    name,
    setname,
    email,
    setEmail,
    check,
    setcheck,
    pickedImagePath,
    setPickedImagePath,
    Is_data,
    SetIs_data,
    contactno,
    setcontactno,
    cnic,
    setcnic,
    password,
    setpassword,
  };
  const integratee = async () => {
    //await axios
    // .get(
    //   `https://crowd-funding-api.herokuapp.com/profile/useprofile/'sm0076@gmail.com'`
    // )
    // .then(function (response) {
    //   let tempp = response.data[0];
    // console.log(tempp.first_name);
    setname("Basit");
    setEmail("abbas@gmail.com");
    setcontactno("03363700122");
    setcnic("4210156276131");
    setpassword("basit1");

    // setPickedImagePath(tempp.C_IMAGE);
    // SetIs_data(true);
    // console.log(tempp.C_IMAGE);
    // })
    // .catch(function (error) {
    //   console.log(error);
    // });
  };
  useEffect(() => {
    integratee();
    // console.log(temp[0]);
  }, []);

  // useEffect(() => {
  //   console.log(temp);

  // }, [temp]);

  return (
    <AppContext.Provider value={imagesettings}>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="Profilee"
          screenOptions={{
            headerShown: false,
          }}
        >
          <Stack.Screen name="Profilee" component={Profile}></Stack.Screen>
          <Stack.Screen
            options={{
              headerShown: true,
              headerShadowVisible: false, // applied here
              headerBackTitleVisible: false,
              contentStyle: { backgroundColor: "#ffffff" },
              headerStyle: { backgroundColor: "#ffffff" },
            }}
            name="Search"
            component={Search_Screen}
          ></Stack.Screen>
          <Stack.Screen
            options={{
              headerShown: true,
              headerShadowVisible: false, // applied here
              headerBackTitleVisible: false,
              contentStyle: { backgroundColor: "#ffffff" },
              headerStyle: { backgroundColor: "#ffffff" },
            }}
            name="Edit_Profile"
            component={Edit_Profile_Screen}
          ></Stack.Screen>
        </Stack.Navigator>
      </NavigationContainer>
    </AppContext.Provider>
  );
}
const styles = StyleSheet.create({
  main: {
    backgroundColor: "#ffffff",
    flex: 1,
    //justifyContent: "space-evenly",
  },
});
