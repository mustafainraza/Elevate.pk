import { View, Text, ScrollView, Alert, Button } from "react-native";
import React, { useState, useRef, useEffect } from "react";
import Card from "./Cards";
import LottieView from "lottie-react-native";
import axios from "axios";

export default function TrackUpdates() {
  // const check = route.params.check_mycamp ? route.params.check_mycamp : false;
  // console.log(check);
  const animation = useRef(null);
  const [data, setData] = useState([]);
  //   const getdata = async () => {
  //     await axios
  //       .get(
  //         `https://crowd-funding-api.herokuapp.com/projects/getupdates/${route.params.C_ID}`
  //       )
  //       .then(function (response) {
  //         setData(response.data);
  //       })
  //       .catch((error) => {
  //         Alert.alert(error);
  //       });
  //   };

  useEffect(() => {
    animation.current?.play();
    setData(d);
  }, [d]);

  // useEffect(() => {
  //   // console.log("Hello");
  // }, [data]);
  return (
    <View style={{ flex: 1 }}>
      <ScrollView
        alwaysBounceVertical={false}
        showsVerticalScrollIndicator={false}
      >
        <View style={{ marginTop: "8%", marginLeft: "5%" }}>
          <Text
            style={{
              fontSize: 25,
              fontFamily: Platform.OS === "ios" ? "Arial" : "",
              fontWeight: "500",
            }}
          >
            Milestone
          </Text>
        </View>
        {data.length === 0 ? (
          <View style={{ alignItems: "center", marginTop: "40%" }}>
            <LottieView
              autoPlay={false}
              loop={false}
              ref={(animate) => {
                animation.current = animate;
              }}
              style={{
                width: 200,
                height: 200,
                backgroundColor: "#FFFFFF",
              }}
              source={require("../assets/no-data.json")}
            />
          </View>
        ) : (
          data.map((item, i) => {
            const name = [
              "Jan",
              "Feb",
              "March",
              "April",
              "May",
              "June",
              "July",
              "Aug",
              "Sept",
              "Oct",
              "Nov",
              "Dec",
            ];
            return (
              <View key={i}>
                <Card
                  id={item.id}
                  month={name[item.month - 1]}
                  prog={item.prog}
                  title={item.title}
                  by={item.by}
                // update_id={item.update_id}
                // my_camp={route.params.check_mycamp}
                />
              </View>
            );
          })
        )}
      </ScrollView>
    </View>
  );
};

const d = [
  {
    id: 1,
    month: 1,
    prog: 0.3,
    title: "Newest Update",
    by: "This is first update discription",

  },
  {
    id: 4,
    month: 2,
    prog: 0.9,
    title: "Newest Update",
    by: "This is second update discription",
  },
  {
    id: 23,
    month: 3,
    prog: 1,
    title: "Newest Update",
    by: "This is third update discription",
  }
]

