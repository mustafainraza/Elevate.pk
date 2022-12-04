import react, { useState, useContext, useEffect } from "react";
import {
    View,
    Text,
    Button,
    Image,
    StyleSheet,
    SafeAreaView,
} from "react-native";
import AppContext from "./AppContext";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Profile from "./Profile";
import Edit_Profile_Screen from "./Edit_Profile_Screen";

import { AuthContext } from "../store/auth-context";
const Stack = createNativeStackNavigator();
export default function App() {



    return (
        // <AppContext.Provider value={imagesettings}>
        //  <NavigationContainer> 
        <Stack.Navigator
            initialRouteName="Profilee"
            screenOptions={{
                headerShown: false,
            }}
        >
            <Stack.Screen name="Profilee" component={Profile}></Stack.Screen>

            <Stack.Screen
                options={{
                    headerShown: false,
                    headerShadowVisible: false, // applied here
                    headerBackTitleVisible: false,
                    contentStyle: { backgroundColor: "#ffffff" },
                    headerStyle: { backgroundColor: "#ffffff" },
                }}
                name="Edit_Profile"
                component={Edit_Profile_Screen}
            ></Stack.Screen>

        </Stack.Navigator>
        /* </NavigationContainer> */
        // </AppContext.Provider>
    );
}
const styles = StyleSheet.create({
    main: {
        backgroundColor: "#ffffff",
        flex: 1,
        //justifyContent: "space-evenly",
    },
});
