import { View, Text, Image, Platform, Pressable } from "react-native";
import React, { useState, useEffect, useRef } from "react";

import { Bar } from "react-native-progress";
import { useRoute } from "@react-navigation/native";
import LottieView from "lottie-react-native";

export default function Project(props) {
    const [funded, setfunded] = useState(0);
    const [backers, setbackers] = useState(0);
    const [hours, sethours] = useState(0);
    const animation = useRef(null);
    const route = useRoute();
    const [isLiked, setLiked] = useState(false);
    const isFirstRun = useRef(true);
    const [countlike, setcountlike] = useState(2000);
    useEffect(() => {
        setfunded(
            props.funded == null || props.funded == undefined ? 0 : props.funded
        );
        setbackers(
            props.backed == null || props.backed == undefined ? 0 : props.backed
        );
        sethours(props.hours == null || props.hours == undefined ? 0 : props.hours);
    }, [props.funded, props.backed, props.hours]);
    useEffect(() => {
        if (isFirstRun.current) {
            if (isLiked) {
                animation.current.play(66, 66);
            } else {
                animation.current.play(19, 19);
            }
            isFirstRun.current = false;
        } else if (isLiked) {
            animation.current.play(19, 50);
        } else {
            animation.current.play(0, 19);
        }
    }, [isLiked]);

    return (
        <>
            <View
                style={{
                    height: "50%",
                    width: "100%",
                }}
            >
                <Image
                    style={{
                        resizeMode: "stretch",
                        height: "100%",
                        width: "100%",
                        borderTopLeftRadius: route.name == "Details" ? 0 : 30,
                        borderTopRightRadius: route.name == "Details" ? 0 : 30,
                    }}
                    source={{ uri: props.data }}


                />
                <Text style={{ color: "black", fontSize: 10, paddingRight: 28, paddingTop: 15, position: "absolute", alignSelf: "flex-end" }}>{countlike >= 1000 ? countlike : countlike + 2000}</Text>
                <Pressable
                    style={{ position: "absolute", alignSelf: "flex-end" }}
                    onPress={() => {
                        setLiked(!isLiked);
                        setcountlike(countlike + 1);

                    }}
                >
                    <LottieView
                        style={{
                            height: 80,
                            width: 80,
                        }}
                        ref={animation}
                        source={require("../assets/like.json")}
                        autoPlay={false}
                        loop={false}
                    />
                </Pressable>
            </View>
            <View style={{ margin: 10, height: "50%" }}>
                <View style={{ height: "25%" }}>
                    <Text
                        style={{
                            fontWeight: "700",
                            fontSize: 18,
                            color: "white",
                            fontFamily: Platform.OS === "ios" ? "Arial" : "serif",
                        }}
                    >
                        Product Name: {props.title}
                    </Text>
                    <Text
                        style={{
                            fontWeight: "400",
                            fontSize: 18,
                            color: "white",
                            fontFamily: Platform.OS === "ios" ? "Arial" : "serif",
                        }}
                    >
                        {props.disc}
                    </Text>
                </View>
                <View
                    style={{
                        marginTop: "12%",
                        justifyContent: "center",
                        alignItems: "center",
                        height: "20%",
                    }}
                >
                    <Bar
                        borderColor="grey"
                        style={{ margin: 10 }}
                        color={"#D6252E"}
                        unfilledColor={"white"}
                        progress={funded * 0.01}
                        width={250}
                        height={4}
                    />
                </View>
                <View
                    style={{
                        flexDirection: "row",
                        justifyContent: "space-around",
                        alignItems: "center",
                        height: "13%",
                        paddingRight: "7%",
                    }}
                >
                    <Text
                        style={{
                            fontWeight: "400",
                            fontSize: 18,
                            color: "white",
                        }}
                    >
                        {funded}%
                    </Text>

                    <Text
                        style={{
                            fontWeight: "400",
                            fontSize: 18,
                            color: "white",
                        }}
                    >
                        {backers}
                    </Text>

                    <Text
                        style={{
                            fontWeight: "400",
                            fontSize: 18,
                            color: "white",
                        }}
                    >
                        {hours}
                    </Text>
                </View>

                <View
                    style={{
                        flexDirection: "row",
                        justifyContent: "space-around",
                        alignItems: "center",
                        height: "15%",
                        paddingLeft: "4%",
                    }}
                >
                    <Text
                        style={{
                            fontWeight: "500",
                            fontSize: 13,
                            color: "white",
                        }}
                    >
                        Funded
                    </Text>

                    <Text
                        style={{
                            paddingLeft: 13,
                            fontWeight: "500",
                            fontSize: 13,
                            color: "white",
                        }}
                    >
                        Backers
                    </Text>

                    <Text
                        style={{
                            fontWeight: "500",
                            fontSize: 13,
                            color: "white",
                        }}
                    >
                        Hours To Go
                    </Text>
                </View>
            </View>
        </>
    );
}
