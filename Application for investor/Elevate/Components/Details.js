import {
  View,
  Text,
  ScrollView,
  Modal,
  Platform,
  Pressable,
  StyleSheet,
  FlatList,
  TextInput,
} from "react-native";
import { AuthContext } from "../store/auth-context";
// import axios from "axios";
import React, { useEffect, useState, useContext } from "react";
import Project from "./project";
import { MaterialIcons } from "@expo/vector-icons";
import { color } from "react-native-reanimated";
import { LinearGradient } from "expo-linear-gradient"
import AppContext from "./AppContext";;
import axios from "axios";
import URL from '../config/env'
export default function Details({ navigation, route }) {
  const authCtx = useContext(AuthContext);
  const token = authCtx.token;
  const myContext = useContext(AppContext);

  const [set, setData] = useState(null);
  // const [email, set_email] = useState("");
  const [modalVisible1, setModalVisible1] = useState(false);
  const [modalVisible2, setModalVisible2] = useState(false);
  const [email, setEmail] = useState("");
  const [amount, setAmount] = useState(200);
  const props = route.params;
  // myContext.setEmail(email);

  useEffect(() => {
    sett();
  }, []);


  useEffect(() => {
    // setEmail(myContext.email);
  }, []);

  // useEffect(() => {
  //   let xd = Date.parse(props.hours);
  //   let z = new Date();
  //   let x = (xd - z) / (1000 * 60 * 60);
  //   if (x <= 0) {
  //     sethours(0);
  //   } else {
  //     sethours(Math.floor(x));
  //   }
  // }, [hours]);

  const track_update = false;

  const back_project = async () => {
    let isUnmounted = false;
    await axios
      .post(
        `http://${URL.SOMEPATH}/projects/backed`, {
        cid: props.C_ID,
        amount: amount,
        email: myContext.email,
      }
      )
      .then(function (response) {
        if (!isUnmounted) {

          if (response.data == 'already invested') {
            alert('You have already invested in this campaign')
          }
          else {
            alert("payment sucessful")
            setTimeout(() => {
              navigation.goBack();
            }, 2000);
          }


        }
      })
      .catch(function (error) {
        console.log(error);
      });
    return () => {
      isUnmounted = true;
    };
  };

  const sett = async () => {
    let isUnmounted = false;
    await axios
      .post(
        `http://${URL.SOMEPATH}/projects/getuser`, {
        cid: props.C_ID
      }
      )
      .then(function (response) {
        if (!isUnmounted) {
          let temp = [];
          for (var i = 0; i < response.data.length; i++) {
            temp.push(response.data[i]);
          }
          setData(temp);
        }
      })
      .catch(function (error) {
        console.log(error);
      });
    return () => {
      isUnmounted = true;
    };
  };



  const renderItem = ({ item }) => (
    <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
      <Text style={{ fontSize: 18, fontWeight: "400" }}>{item.name}</Text>
      <Text style={{ fontSize: 18, fontWeight: "400" }}>{item.funds}</Text>
    </View>
  );

  return (
    <View style={{ backgroundColor: "#003047", flex: 1 }}>
      <View
        style={{
          backgroundColor: "#003047",
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
            hours={props.hours}
            data={props.data}
            C_ID={props.C_ID}
          />
        </View>

        <View style={{ marginLeft: "13%" }}>
          <Text style={{ color: "white" }}>Goal : {props.GOAL}</Text>

          <Text style={{ color: "white" }}>
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
            <MaterialIcons name="campaign" size={50} color="#D6252E" />
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
              setModalVisible1(true)
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
              backgroundColor: "#D6252E",
            }}
          >
            <Text style={{ color: "white", position: "absolute" }}>
              View Backers
            </Text>
            <View style={styles.centeredView}>
              <Modal
                animationType="fade"
                transparent={true}
                visible={modalVisible1}
                onRequestClose={() => {
                  setModalVisible1(!modalVisible1);
                }}
                style={{ flex: 1 }}
              >
                <Pressable
                  style={styles.centeredView}
                  onPress={() => { setModalVisible1(false) }
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
        style={{ backgroundColor: "white", width: "100%", height: "0.75%" }}
      ></View>
      <Pressable
        style={{
          width: "100%",
          height: "11%",
        }}
        onPress={() => {
          navigation.navigate("Track Progress", {
            title: "Track Milestone",
          });
        }}
      >
        <LinearGradient
          // Button Linear Gradient
          colors={

            ["#D6252E", "#003047"]

          }
        >

          <Text
            style={{
              fontSize: 22,
              color: "white",
              fontFamily: Platform.OS === "ios" ? "Arial" : "serif",
              // position: "absolute",
              // paddingTop: "19%"
              width: "100%",
              height: "100%",
              // justifyContent: "center",
              // alignItems: "center",
              // alignSelf: "center",
              // alignContent: "center",
              paddingLeft: '35%',
              paddingTop: '5%'

            }}
          >
            Updates
          </Text>
        </LinearGradient>
      </Pressable>
      <View
        style={{ backgroundColor: "white", width: "100%", height: "0.75%" }}
      ></View>
      <Pressable
        style={{
          width: "100%",
          height: "11%",
        }}
        onPress={() => {
          console.warn("comments");
          // navigation.navigate("Commentss", props.C_ID);
        }}
      >
        <LinearGradient
          // Button Linear Gradient
          colors={

            ["#D6252E", "#003047"]

          }
        >

          <Text
            style={{
              fontSize: 22,
              color: "white",
              fontFamily: Platform.OS === "ios" ? "Arial" : "serif",
              // position: "absolute",
              // paddingTop: "19%"
              width: "100%",
              height: "100%",
              // justifyContent: "center",
              // alignItems: "center",
              // alignSelf: "center",
              // alignContent: "center",
              paddingLeft: '35%',
              paddingTop: '5%'

            }}
          >
            Comments
          </Text>
        </LinearGradient>
      </Pressable>

      <View
        style={{ backgroundColor: "white", width: "100%", height: "0.75%" }}
      ></View>

      <Pressable
        disabled={props.hours <= 0 ? true : false}
        style={{
          marginTop: "3%",
          backgroundColor: "#D6252E",
          justifyContent: "center",
          alignItems: "center",
          alignSelf: "center",
          width: "80%",
          height: "8%",
          borderRadius: 30,
        }}
        onPress={() => {
          // back_project();
          setModalVisible2(true)
        }
        }
      >

        {props.hours > 0 ? (

          <Text
            style={{
              fontSize: 20,
              color: "white",
              fontFamily: Platform.OS === "ios" ? "Arial" : "serif",
              fontWeight: "bold",
              marginTop: "5%",
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
              marginTop: "4%",
            }}
          >
            Campaign Ended
          </Text>
        )}
        <View style={styles.centeredView}>
          <Modal
            animationType="fade"
            transparent={true}
            visible={modalVisible2}
            onRequestClose={() => {
              setModalVisible2(!modalVisible2);
            }}
            style={{ flex: 1 }}
          >
            <Pressable
              style={styles.centeredView}
              onPress={() => { setModalVisible2(false) }
              }
            />
            <View
              style={[
                styles.modalView,
                {
                  position: "absolute",
                  alignSelf: "center",
                  marginTop: "60%",
                  minHeight: 250
                },
              ]}
            >
              <View
                style={{
                  // flexDirection: "row",
                  // justifyContent: "space-between",
                  flex: 1
                }}
              >
                <Text style={{ fontSize: 23, fontWeight: "bold", alignSelf: "center", color: '#003047' }}>
                  Amount
                </Text>
                <TextInput
                  placeholder="Enter Amount"
                  keyboardType="numeric"
                  maxLength={5}
                  style={{ alignSelf: "center", marginTop: '25%', marginLeft: amount.length > 0 ? '30%' : 0, fontSize: 20, color: '#003047' }}

                  value={amount}
                  onChangeText={(e) => {
                    e > 50000 ? alert("maximum amount to invest is 50K") :
                      setAmount(e);
                  }}
                />
              </View>
              <Pressable
                onPress={() => {
                  back_project();
                  setModalVisible2(false);
                }
                }
                style={{
                  height: "20%",
                  width: "70%",
                  borderColor: "black",
                  justifyContent: "center",
                  // marginEnd: 8,
                  alignSelf: "center",
                  alignItems: "center",
                  backgroundColor: "#D6252E",
                  borderRadius: 30,

                }}
              >
                <Text style={{ flex: 1, color: "white", position: "absolute", fontSize: 18 }}>
                  Back Project
                </Text>
              </Pressable>

            </View>
          </Modal>
        </View>
      </Pressable>

    </View >
  );
}

// const Set = [
//   {
//     first_name: 'Mustafain',
//     funds: 3000
//   },
//   {
//     first_name: 'Raza',
//     funds: 2000
//   },

// ]

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
    width: "70%",
    height: "25%",
    borderRadius: 20,
    padding: 15,
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
