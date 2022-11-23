import {
    Pressable,
    StyleSheet,
    View,
    FlatList,
    Text,
    VirtualizedList,
    ActivityIndicator,
} from "react-native";
import LottieView from "lottie-react-native";
import React, { useEffect, useState, useRef } from "react";
import Project from "./project";
import axios from "axios";

const sum1 = 8000;
const goal1 = 10000;
const sum2 = 1000;
const goal2 = 10000;
const sum3 = 900;
const goal3 = 1000;



export default function NEWEST({ navigation }) {
    const [set, setData] = useState(null);
    const [timeout, settime] = useState(true);
    const [isdata, setisdata] = useState(true);
    const animationRef = useRef(null);

    const DaysLeft = (props) => {
        let xd = Date.parse(props.data);
        let z = new Date();
        let x = (xd - z) / (1000 * 60 * 60);
        if (x <= 0) {
            return 0;
        } else {
            return Math.floor(x);
        }
    };

    // const sad = async () => {
    //   let isUnmounted = false;
    //   settime(true);
    //   await axios
    //     .get(
    //       "https://crowd-funding-api.herokuapp.com/projects/popularprojectdetails"
    //     )
    //     .then(function (response) {
    //       if (!isUnmounted) {
    //         let temp = [];
    //         for (var i = 0; i < response.data.length; i++) {
    //           temp.push(response.data[i]);
    //         }
    //         setData(temp);
    //         setTimeout(() => {
    //           settime(false);
    //         }, 2500);
    //       }
    //     })
    //     .catch(function (error) {
    //       console.log(error);
    //     });
    //   return () => {
    //     isUnmounted = true;
    //   };
    // };

    const refreshdata = () => {
        settime(true);
        setData(Set);
        setTimeout(() => {
            settime(false);
        }, 2500);


    }

    useEffect(() => {
        setData(Set);
        settime(false);
    }, []);

    // useEffect(() => {
    //   if (set == null || set == undefined || set.length == 0) {
    //     setisdata(true);
    //   } else {
    //     setisdata(true);
    //   }
    // }, [isdata, set]);

    // const getItem = (set, index) => {
    //   return set[index];
    // };

    useEffect(() => {
        animationRef.current?.play();
    }, []);

    const renderItem = ({ item }) => (
        <Pressable
            style={styles.container}
            android_ripple={{ borderless: false, color: "lightgrey" }}
            onPress={() => {
                navigation.navigate("Details", {
                    title: item.title,
                    data: item.data,
                    disc: item.disc,
                    funded: item.funded,
                    backed: item.backed,
                    hours: item.hours,
                    Name: item.name,
                    C_ID: item.C_ID,
                    total: item.sum,
                    GOAL: item.goal,
                });
            }}
        >
            <Project
                title={item.title}
                disc={item.disc}
                funded={item.funded}
                backed={item.backed}
                hours={<DaysLeft data={item.hours} />}
                // data={"data:image/jpeg;base64," + item.C_IMAGE}
                data={item.data}
                C_ID={item.C_ID}
            />
        </Pressable>
    );
    return (
        <View>
            {timeout ? (
                <View
                    style={{
                        backgroundColor: "white",
                        height: "100%",
                        width: "100%",
                    }}
                >
                    <View
                        style={{
                            marginTop: "80%",
                            width: "100%",
                            height: 200,
                        }}
                    >
                        <LottieView
                            autoPlay
                            loop={timeout}
                            duration={4000}
                            ref={(animation) => {
                                animationRef.current = animation;
                            }}
                            source={require("../assets/business-investor-gaining-profit-from-investment.json")}
                        />
                    </View>
                </View>
            ) : isdata == false ? (
                <View style={styles.empty}>
                    <Text style={styles.textt}>No Projects here...</Text>
                </View>
            ) : (
                <FlatList
                    data={set}
                    renderItem={renderItem}
                    onRefresh={refreshdata}
                    refreshing={false}
                    keyExtractor={(item) => item.C_ID}
                />
            )}
        </View>

    );
}
const Set = [
    {
        title: "my project",
        disc: 'This is project discription',
        funded: Math.ceil((sum1 / goal1) * 100),
        backed: 8,
        hours: '2022-11-25',
        data: require('../assets/project.jpeg'),
        C_ID: 1,
        name: 'Mustafain Raza',
        goal: goal1,
        sum: Math.ceil(sum1),
    },
    {
        title: "Cameron",
        disc: 'This Cameron is basically a Bike Helmet and this is very important for bike riding',
        funded: Math.ceil((sum2 / goal2) * 100),
        backed: 10,
        hours: '2022-11-20',
        data: require('../assets/download.jpeg'),
        C_ID: 2,
        name: 'Mustafain Raza',
        goal: goal2,
        sum: Math.ceil(sum2),
    },
    {
        title: "Our FYP",
        disc: 'This is Our Final Year Project which needs to be funded so that we can work in the future',
        funded: Math.ceil((sum3 / goal3) * 100),
        backed: 20,
        hours: '2022-11-11',
        data: require('../assets/FYP.jpeg'),
        C_ID: 3,
        name: 'Mustafain Raza',
        goal: goal3,
        sum: Math.ceil(sum3),
    }

]



export const styles = StyleSheet.create({
    container: {
        backgroundColor: "grey",
        marginTop: 25,
        marginLeft: 25,
        width: "86%",
        height: 400,
        borderRadius: 30,
    },
    empty: {
        marginTop: "80%",
        alignItems: "center",
        justifyContent: "center",
    },
    textt: {
        fontSize: 30,
        fontWeight: "bold",
    },
});
