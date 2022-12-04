import { View, Text, FlatList, ActivityIndicator } from "react-native";
import React, { useState, useEffect } from "react";
import RewardCard from "./RewardCard";
// import axios from "axios";

export default function Rewards({ route }) {
    const [Rewards_data, setRewards_data] = useState(null);
    const [Isdata_loaded, setIsdata_loaded] = useState(false);
    const C_ID = route.params.C_ID;

    // const Reward_API = async () => {
    //   await axios
    //     .get(
    //       `https://crowd-funding-api.herokuapp.com/projects/getrewards/${C_ID}`
    //     )
    //     .then(function (response) {
    //       let temp = [];
    //       for (var i = 0; i < response.data.length; i++) {
    //         temp.push(response.data[i]);
    //       }
    //       setRewards_data(temp);
    //       setIsdata_loaded(true);
    //     })
    //     .catch(function (error) {
    //       console.log(error);
    //     });
    // };

    useEffect(() => {
        setRewards_data(Set);
        setIsdata_loaded(true);
    }, []);

    const renderItem = ({ item }) => (
        <RewardCard
            title={item.title}
            disc={item.disc}
            price={item.price}
            reward_id={item.reward_id}
            C_ID={C_ID}
        // check={route.params.check}
        />
    );
    return (
        <View style={{ backgroundColor: "white", height: "100%", width: "100%" }}>
            {!Isdata_loaded ? (
                <View
                    style={{
                        justifyContent: "center",
                        alignItems: "center",
                        height: "100%",
                        width: "100%",
                    }}
                >
                    <ActivityIndicator size={80} color="red" />
                </View>
            ) : (
                <View
                    style={{
                        backgroundColor: "white",
                        flex: 1,
                        width: "100%",
                        height: "100%",
                    }}
                >
                    <FlatList data={Rewards_data} renderItem={renderItem} />
                </View>
            )}
        </View>
    );
};

const Set = [
    {
        title: "Reward 1",
        disc: 'This is project Reward discription',
        price: 3000,
        reward_id: 1,
    },
    {
        title: "Reward 2",
        disc: 'This is project Reward 2 discription',
        price: 6000,
        reward_id: 2,
    },
]
