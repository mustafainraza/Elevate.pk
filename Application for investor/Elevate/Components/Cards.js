import {
  StyleSheet,
  Text,
  View,
  Pressable,
  Alert,
  Modal,
  TextInput,
  ToastAndroid,
} from "react-native";
import React, { useState, useContext } from "react";
import { LinearGradient } from "expo-linear-gradient";
import ProgressBar from "react-native-progress/Bar";
import { MaterialIcons } from "@expo/vector-icons";
import axios from "axios";

const Card = (props) => {

  // const [progress, setProgress] = useState(props.prog);
  const [modalIsVisible, SetModal] = useState(false);
  // const [check, setCheck] = useState(props.prog);

  // const update_progress = async () => {
  //   await axios
  //     .patch(`https://crowd-funding-api.herokuapp.com/projects/setprogress`, {
  //       uid: props.update_id,
  //       progress: check,
  //       token: token,
  //     })
  //     .then(function (response) {
  //       setProgress(parseFloat(check));
  //       Alert.alert(response.data);
  //     })
  //     .catch((error) => {
  //       console.log(error.response.data);
  //     });
  // };

  // const setProgressHandler = () => {
  //   SetModal(!modalIsVisible);
  // };
  // const submit = () => {
  //   if (parseFloat(check) > progress) {
  //     if (parseFloat(check) <= 1) {
  //       update_progress();
  //       SetModal(!modalIsVisible);
  //     } else {
  //       Alert.alert("The  Value should be less than 1");
  //     }
  //   } else {
  //     Alert.alert("The Updated Value should be Greater than Current Value");
  //   }
  // };
  return (
    <Pressable style={styles.container} >
      <View style={props.prog === 1 ? styles.box : styles.box1}>
        <LinearGradient
          // Button Linear Gradient
          colors={
            props.prog === 1
              ? ["#D6252E", "#003047"] :
              props.prog >= 0.5
                ? ["#fff", "#fff", "#003047"]

                : ["white", "white", "white"]
          }
          style={{ flex: 1, borderRadius: Platform.OS === "ios" ? "8%" : 8 }}
        >
          <View style={{ flexDirection: "row" }}>
            <Text
              style={[
                styles.text,
                props.prog === 1 ? { color: "white" } : { color: "black" },
              ]}
            >
              {props.id}
            </Text>
            <Text
              style={[
                { fontSize: 18, marginTop: "40%", marginLeft: "2%" },
                props.prog === 1 ? { color: "white" } : { color: "black" },
              ]}
            >
              {props.month}
            </Text>
          </View>
          <Text
            style={[
              { fontSize: 10, marginHorizontal: 10 },
              props.prog === 1 ? { color: "white" } : { color: "black" },
            ]}
          >
            {props.prog === 1 ? "Completed" : "Progress: " + props.prog * 100 + "%"}
          </Text>
          <View style={{ marginHorizontal: 10, marginTop: 10 }}>
            <ProgressBar
              progress={props.prog === 1 ? props.prog : props.prog + 0.02}
              width={80}
              color={props.prog === 1 ? "white" : "#E7614A"}
              borderWidth={0}
              height={3}
            />
          </View>
        </LinearGradient>
      </View>
      <View style={styles.text_box}>
        <Text
          adjustsFontSizeToFit={true}
          style={{ fontSize: 20, fontWeight: "300" }}
        >
          {props.title}
        </Text>
        <Text style={{ marginTop: "2%", fontSize: 13, fontWeight: "100" }}>
          {props.by}
        </Text>
      </View>
      {/* {props.my_camp ? (
        <Modal visible={modalIsVisible} animationType="fade" transparent={true}>
          <View style={styles.inputcontainer}>
            <View style={styles.modalbox}>
              <Pressable
                style={{
                  alignSelf: "flex-end",
                  marginRight: "3%",
                  marginTop: "3%",
                }}
                onPress={setProgressHandler}
              >
                <MaterialIcons name="cancel" size={24} color="black" />
              </Pressable>
              <Text
                style={{ alignSelf: "center", fontWeight: "600", fontSize: 20 }}
              >
                Update Milestone Progress
              </Text>
              <View style={{ height: "15%" }} />
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <Text style={{ marginLeft: "5%", fontSize: 15 }}>
                  Enter Updated Progress:
                </Text>
                <TextInput
                  keyboardType="numeric"
                  style={{
                    marginLeft: "5%",
                    borderBottomColor: "black",
                    borderBottomWidth: 1,
                    width: "30%",
                    height: 30,
                  }}
                  value={check.toString()}
                  onChangeText={(e) => {
                    setCheck(e);
                  }}
                />
              </View>
              <Pressable
                style={{
                  alignSelf: "center",
                  justifyContent: "center",
                  marginTop: "10%",
                  height: "15%",
                  width: "20%",
                }}
                onPress={submit}
              >
                <Text
                  style={{ alignSelf: "center", color: "orange", fontSize: 20 }}
                >
                  Submit
                </Text>
              </Pressable>
            </View>
          </View>
        </Modal>
      ) : null} */}
    </Pressable>
  );
};

export default Card;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    marginTop: 20,
    height: 120,
    //   marginBottom: "2%",
    //  backgroundColor: "red",
  },
  box: {
    width: 100,
    marginLeft: "5%",
  },
  text: {
    fontSize: 30,
    marginTop: "25%",
    marginLeft: "10%",
  },
  box1: {
    width: 100,
    marginLeft: "5%",
    shadowOpacity: 0.2,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 0 },
    shadowColor: "grey",
    elevation: 10,
    backgroundColor: "white",
    borderRadius: Platform.OS === "android" ? 10 : "10",
  },
  text_box: {
    marginLeft: "5%",
    width: 220,
    paddingTop: "8%",
  },
  inputcontainer: {
    backgroundColor: "#000000aa",
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  modalbox: {
    height: "30%",
    width: "80%",
    backgroundColor: "white",
    borderRadius: Platform.OS === "android" ? 10 : "10",
  },
});
