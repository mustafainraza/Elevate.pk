import {
  View,
  Text,
  ScrollView,
  Modal,
  Platform,
  Pressable,
  StyleSheet,
  FlatList,
} from "react-native";
// import axios from "axios";
import React, { useEffect, useState } from "react";
import Project from "./project";
import { MaterialIcons } from "@expo/vector-icons";
import { color } from "react-native-reanimated";

export default function Details({ navigation, route }) {
  const [set, setData] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const props = route.params;
  const [hours, sethours] = useState(0);

  useEffect(() => {
    let xd = Date.parse(props.hours);
    let z = new Date();
    let x = (xd - z) / (1000 * 60 * 60);
    if (x <= 0) {
      sethours(0);
    } else {
      sethours(Math.floor(x));
    }
  }, [hours]);

  const track_update = false;

  // const sett = async () => {
  //   let isUnmounted = false;
  //   await axios
  //     .get(
  //       `https://crowd-funding-api.herokuapp.com/projects/getbackers/${props.C_ID}`
  //     )
  //     .then(function (response) {
  //       if (!isUnmounted) {
  //         let temp = [];
  //         for (var i = 0; i < response.data.length; i++) {
  //           temp.push(response.data[i]);
  //         }
  //         setData(temp);
  //       }
  //     })
  //     .catch(function (error) {
  //       console.log(error);
  //     });
  //   return () => {
  //     isUnmounted = true;
  //   };
  // };
  // useEffect(() => {
  //   sett();
  // }, []);

  useEffect(() => {
    setData(Set);
  }, []);

  const renderItem = ({ item }) => (
    <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
      <Text style={{ fontSize: 18, fontWeight: "400" }}>{item.first_name}</Text>
      <Text style={{ fontSize: 18, fontWeight: "400" }}>{item.funds}</Text>
    </View>
  );

  return (
    <View style={{ backgroundColor: "white", flex: 1 }}>
      <View
        style={{
          backgroundColor: "grey",
          width: "100%",
          height: "65%",
        }}
      >
        <View style={{ height: "75%" }}>
          <Project
            title={props.title}
            disc={props.disc}
            funded={props.funded}
            backed={props.backed}
            hours={hours}
            // data={"data:image/jpeg;base64," + item.C_IMAGE}
            data={props.data}
            C_ID={props.C_ID}
          />
        </View>

        <View style={{ marginLeft: "13%" }}>
          <Text style={{ color: "springgreen" }}>Goal : {props.GOAL}</Text>

          <Text style={{ color: "springgreen" }}>
            Total Funded: {props.total}
          </Text>
        </View>
        <View
          style={{
            flex: 1,
            paddingLeft: "2%",
            paddingTop: "2%",
            flexDirection: "row",
            height: "100%",
          }}
        >
          <View style={{ flex: 1, height: "100%" }}>
            <MaterialIcons name="campaign" size={50} color="#F23B25" />
          </View>
          <View style={{ flex: 4, height: "50%", paddingTop: "2%" }}>
            <Text
              style={{
                fontWeight: "500",
                fontSize: 12,
                color: "white",
                fontFamily: Platform.OS === "ios" ? "Arial" : "serif",
              }}
            >
              Created by
            </Text>
            <Text
              style={{
                fontWeight: "500",
                fontSize: 18,
                color: "white",
                fontFamily: Platform.OS === "ios" ? "Arial" : "serif",
              }}
            >
              {props.Name}
            </Text>
          </View>
          <Pressable
            onPress={() => {
              setModalVisible(true)
            }
            }
            style={{
              height: "55%",
              width: "28%",
              borderColor: "black",
              justifyContent: "center",
              marginEnd: 8,
              alignSelf: "center",
              alignItems: "center",
              backgroundColor: "green",
            }}
          >
            <Text style={{ color: "white", position: "absolute" }}>
              View Backers
            </Text>
            <View style={styles.centeredView}>
              <Modal
                animationType="fade"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                  setModalVisible(!modalVisible);
                }}
                style={{ flex: 1 }}
              >
                <Pressable
                  style={styles.centeredView}
                  onPress={() => { setModalVisible(false) }
                  }
                />
                <View
                  style={[
                    styles.modalView,
                    {
                      position: "absolute",
                      alignSelf: "center",
                      marginTop: "45%",
                    },
                  ]}
                >
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "space-between",
                    }}
                  >
                    <Text style={{ fontSize: 18, fontWeight: "bold" }}>
                      Name
                    </Text>
                    <Text style={{ fontSize: 18, fontWeight: "bold" }}>
                      Amount
                    </Text>
                  </View>
                  <View
                    style={{
                      marginTop: "5%",
                      height: "5%",
                      borderTopWidth: 1,
                    }}
                  />
                  <FlatList
                    data={set}
                    renderItem={renderItem}
                  // keyExtractor={item => item.C_ID}
                  />
                </View>
              </Modal>
            </View>
          </Pressable>
        </View>
      </View>
      <View
        style={{ backgroundColor: "black", width: "100%", height: "0.75%" }}
      ></View>
      <Pressable
        style={{
          backgroundColor: "grey",
          justifyContent: "center",
          alignItems: "center",
          width: "100%",
          height: "11%",
        }}
        onPress={() => {
          navigation.navigate("Track Progress", {
            title: "Track Milestone",
          });
        }}
      >
        <Text
          style={{
            fontSize: 22,
            color: "white",
            fontFamily: Platform.OS === "ios" ? "Arial" : "serif",
          }}
        >
          Updates
        </Text>
      </Pressable>
      <View
        style={{ backgroundColor: "black", width: "100%", height: "0.75%" }}
      ></View>
      <Pressable
        android_ripple={{ borderless: false, color: "lightgrey" }}
        style={{
          backgroundColor: "grey",
          justifyContent: "center",
          alignItems: "center",
          width: "100%",
          height: "11%",
        }}
        onPress={() => {
          console.warn("comments");
          // navigation.navigate("Commentss", props.C_ID);
        }}
      >
        <Text
          style={{
            fontSize: 22,
            color: "white",
            fontFamily: Platform.OS === "ios" ? "Arial" : "serif",
          }}
        >
          Comments
        </Text>
      </Pressable>
      <View
        style={{ backgroundColor: "black", width: "100%", height: "0.75%" }}
      ></View>

      <Pressable
        disabled={hours <= 0 ? true : false}
        android_ripple={{ color: "lightgreen" }}
        style={{
          marginTop: "3%",
          backgroundColor: "green",
          justifyContent: "center",
          alignItems: "center",
          alignSelf: "center",
          width: "80%",
          height: "8%",
          borderRadius: 30,
        }}
        onPress={() => {
          navigation.navigate("Rewards", {
            C_ID: props.C_ID,
          });
        }}
      >
        {hours > 0 ? (
          <Text
            style={{
              fontSize: 20,
              color: "white",
              fontFamily: Platform.OS === "ios" ? "Arial" : "serif",
              fontWeight: "bold",
            }}
          >
            Back This Project
          </Text>
        ) : (
          <Text
            style={{
              fontSize: 22,
              color: "white",
              fontFamily: Platform.OS === "ios" ? "Arial" : "serif",
              fontWeight: "bold",
            }}
          >
            Campaign Ended
          </Text>
        )}
      </Pressable>

      <View style={{ backgroundColor: "white", height: "2%" }}></View>
    </View>
  );
}

const Set = [
  {
    first_name: 'Mustafain',
    funds: 3000
  },
  {
    first_name: 'Raza',
    funds: 2000
  },

]

const styles = StyleSheet.create({
  centeredView: {
    justifyContent: "center",
    alignItems: "center",
    // marginTop: '50%',
    backgroundColor: "#000000aa",
    flex: 1,
  },
  modalView: {
    backgroundColor: "white",
    width: "80%",
    height: "50%",
    borderRadius: 20,
    padding: 20,
    // alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 10,
  },

  modalText: {
    fontSize: 18,
    color: "green",
  },
});
