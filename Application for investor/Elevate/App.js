import { StatusBar } from "expo-status-bar";
import { Button, StyleSheet, Text, View } from "react-native";
import { useContext, useEffect, useState } from "react";
// import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AuthContextProvider, { AuthContext } from "./store/auth-context";
import * as SplashScreen from "expo-splash-screen";
import * as SecureStore from "expo-secure-store";
import Change_Password from "./Components/Change_Password";
import Search_Screen from "./Components/Search_Screen"
// import IconButton from "./omponents/ui/IconButton";
// import { AntDesign } from "@expo/vector-icons";
import Login from "./screens/Login";
import Signup from "./screens/Signup";
import { Pressable } from "react-native";
import Profile from "./Components/Profile";
import Edit_Profile_Screen from "./Components/Edit_Profile_Screen";
import AppContext from "./Components/AppContext";
import { NavigationContainer } from "@react-navigation/native";
import URL from './config/env';

// import Home from './Components/Home';
import Start from './Components/start';
import Drawer_Nav from './Components/Drawer_Nav';
import Details from './Components/Details';
import TrackUpdates from './Components/TrackUpdates';
import Rewards from './Components/Reward.js';

import axios from "axios";




const Stack = createNativeStackNavigator();
function AuthStack() {

  return (
    <Stack.Navigator screenOptions={{
      headerShown: false,
    }}>
      {/* <Stack.Screen name="Start" component={Start} /> */}
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Signup" component={Signup} />
    </Stack.Navigator>
  );
}
// ------------
function AuthenticatedStack() {
  const authCtx = useContext(AuthContext);
  const token = authCtx.token;
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
    await axios
      .get(`http://${URL.SOMEPATH}/profile/useprofile`, {
        headers: {
          "x-access-token": token,
        },
      })
      .then(function (response) {
        let tempp = response.data[0];
        setname(tempp.name);
        setEmail(tempp.email);
        setcontactno(tempp.phone_no);
        setPickedImagePath(tempp.user_image);
        setcnic(tempp.cnic);
        setpassword(tempp.password);
        SetIs_data(true);
        // console.log(tempp.C_IMAGE);
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  useEffect(() => {
    integratee();
    // console.log(temp[0]);
  }, [email]);
  return (
    <AppContext.Provider value={imagesettings}>
      <Stack.Navigator
        initialRouteName="Drawer_Nav"
        screenOptions={{
          headerShown: false,
        }}>
        <Stack.Screen name='Drawer_Nav' component={Drawer_Nav} />
        <Stack.Screen
          name="Details"
          component={Details}
          options={{
            title: "Product Details",
            headerTintColor: "white",
            headerShown: true,
            headerStyle: {
              backgroundColor: "#D6252E",
            },
            headerTitleStyle: {
              fontSize: 20,
              color: "white"
            },
          }}
        ></Stack.Screen>
        <Stack.Screen
          options={{
            headerShown: true,
            headerShadowVisible: false, // applied here
            headerBackTitleVisible: false,
            contentStyle: { backgroundColor: "#ffffff" },
            headerStyle: { backgroundColor: "#ffffff" },
          }}
          name="Change Password"
          component={Change_Password}
        ></Stack.Screen>
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
          name="Track Progress"
          component={TrackUpdates}
          options={{
            title: "Updates",
            headerTintColor: "white",
            headerShown: true,
            headerStyle: {
              backgroundColor: "#D6252E",
            },
            headerTitleStyle: {
              fontSize: 20,
              color: "white"
            },
          }}
        />
        <Stack.Screen
          options={{
            title: "Rewards",
            headerTintColor: "white",

            headerTitleStyle: {
              color: "white",
            },
            headerShown: true,
            headerStyle: {
              backgroundColor: "#D6252E",
            },
          }}
          name="Rewards"
          component={Rewards}
        />
        {/* <Button onPress={() => authCtx.logout()} title="Logout"></Button> */}
      </Stack.Navigator>
    </AppContext.Provider>
  );
}

// ------------
function Navigation() {
  const authCtx = useContext(AuthContext);
  return (
    <NavigationContainer>
      {!authCtx.isAuthenticated && <AuthStack />}
      {authCtx.isAuthenticated && <AuthenticatedStack />}
    </NavigationContainer>
  );
}

function Root() {
  const [isTryingLogin, SetIsTryingLogin] = useState(true);
  const authCtx = useContext(AuthContext);
  useEffect(() => {
    async function fetchToken() {
      const storedToken = await SecureStore.getItemAsync("token");
      if (storedToken) {
        authCtx.authenticate(storedToken);
      }
      SetIsTryingLogin(false);
      await SplashScreen.hideAsync();
    }
    fetchToken();
  }, []);

  if (isTryingLogin) {
    SplashScreen.preventAutoHideAsync();
  }
  return <Navigation />;
}

export default function App() {
  return (
    <>
      <StatusBar style="light" />
      <AuthContextProvider>
        <Root />
      </AuthContextProvider>
    </>
  );
}
