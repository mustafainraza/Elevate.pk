import { View, Text, Button, Pressable } from "react-native";
import React, { useContext } from "react";
import {
    createDrawerNavigator,
    DrawerContentScrollView,
    DrawerItemList,
    DrawerItem,
} from "@react-navigation/drawer";
import Home from "./Home";
import { StatusBar } from "expo-status-bar";
import {
    Octicons,
    Entypo,
    FontAwesome,
    FontAwesome5,
    Fontisto,
} from "@expo/vector-icons";

import { Ionicons } from "@expo/vector-icons";

import campaign from "../Components/Home";
import Guides from "../Components/Guide";

const Drawer = createDrawerNavigator();
export default function Drawer_Nav({ navigation }) {
    return (
        <>
            <StatusBar style="dark" backgroundColor="#f5f5f5" />

            <Drawer.Navigator>
                <Drawer.Screen
                    options={{
                        drawerIcon: () => (
                            <FontAwesome name="home" size={24} color="#F23B25" />
                        ),
                    }}
                    name="Home"
                    component={Home}
                />
                <Drawer.Screen
                    options={{
                        drawerIcon: () => (
                            <FontAwesome name="book" size={24} color="#F23B25" />
                        ),
                    }}
                    name="Guide"
                    component={Guides}
                />

            </Drawer.Navigator>
        </>
    );
}
