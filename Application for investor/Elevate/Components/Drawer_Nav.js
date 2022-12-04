import { View, Text, Button, Pressable } from "react-native";
import React, { useContext } from "react";
import {
    createDrawerNavigator,
    DrawerContentScrollView,
    DrawerItemList,
    DrawerItem,
} from "@react-navigation/drawer";
import { AuthContext } from "../store/auth-context";
import Home from "./Home";
import { StatusBar } from "expo-status-bar";
import AppContext from "./AppContext";
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
import Main from "./Main";




const Drawer = createDrawerNavigator();
export default function Drawer_Nav({ navigation }) {
    const authCtx = useContext(AuthContext);
    return (
        <>
            <StatusBar style="dark" backgroundColor="#f5f5f5" />

            <Drawer.Navigator
                drawerContent={(props) => {
                    return (
                        <DrawerContentScrollView {...props}>
                            <DrawerItemList {...props} />
                            <DrawerItem
                                icon={() => <Ionicons name={"exit"} color={"red"} size={24} />}
                                label="Logout"
                                onPress={() => authCtx.logout()}
                            />
                        </DrawerContentScrollView>
                    );
                }}
            >
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
                            <FontAwesome5 name="user" size={24} color="#F23B25" />
                        ),
                    }}
                    name="Profile"
                    component={Main}
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
