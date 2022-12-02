import React, { useState, useContext, useEffect } from "react";
import {
  View,
  Text,
  Pressable,
  SafeAreaView,
  Button,
  ActivityIndicator,
  Modal,
} from "react-native";
import AppContext from "./AppContext";
import { Avatar, TextInput } from "react-native-paper";
import * as ImagePicker from "expo-image-picker";
import { Platform } from "react-native";
//import axios from "axios";
function Edit_Profile_Screen({ navigation }) {
  const edit = async () => {
    // console.log(new Date().toString());
    // await axios
    //   .patch(
    //     `https://crowd-funding-api.herokuapp.com/profile/editprofile/'sm0076@gmail.com'`,
    //     {
    myContext.setname(name);
    myContext.setcontactno(contactno);
    myContext.setpassword(password);
    //   }
    // )
    // .then(function (response) {
    //   console.log(new Date().toString());
    //   // console.log(firstname);
    //   // console.log(lastname);
    //   alert(response.data);
    // })
    // .catch(function (error) {
    //   console.log(error);
    // });
  };
  // const edit_image = async () => {
  //   await axios
  //     .patch(
  //       `https://crowd-funding-api.herokuapp.com/profile/editprofile/'sm0076@gmail.com'`,
  //       {
  //         image: myContext.pickedImagePath,
  //       }
  //     )
  //     .then(function (response) {
  //       alert(response.data);
  //     })
  //     .catch(function (error) {
  //       console.log(error);
  //     });
  // };

  useEffect(() => {
    setname(myContext.name);
    setcontactno(myContext.contactno);
    setcnic(myContext.cnic);
    setpassword(myContext.password);
    setEmail(myContext.email);
  }, []);
  useEffect(() => {}, [errprompt]);

  const showImagePicker = async () => {
    myContext.setimageset(true);
    myContext.setPickedImagePath(null);
    const permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (permissionResult.granted === false) {
      alert("You've refused to allow this appp to access your photos!");
      return;
    }
    const result = await ImagePicker.launchImageLibraryAsync();
    if (!result.cancelled) {
      myContext.setPickedImagePath(result);
    }
  };
  const myContext = useContext(AppContext);
  const [name, setname] = useState("");
  const [email, setEmail] = useState("");
  const [text, settext] = useState(true);
  const [contactno, setcontactno] = useState("");
  const [password, setpassword] = useState("");
  const [cnic, setcnic] = useState("");
  const [conpass, setconpass] = useState("");
  const [errprompt, seterrprompt] = useState({});
  function checkcredentials(e1, e2, e3, e4) {
    errors = {};
    if (e1 === "") {
      errors.name = "Name is required";
      settext(false);
    }
    if (e2.lenght !== 11) {
      errors.contactno = "contact number must be 11 numbers";
      settext(false);
    } else if (e2 === "") {
      errors.contactno = "Contact number is required";
      settext(false);
    }
    if (e3 === "") {
      errors.password = "Password is required";
      settext(false);
    } else if (e3.length < 8 && e3.length > 15) {
      errors.password = "Password length should be between 8 and 15";
      settext(false);
    } else if (e3 !== e4) {
      errors.conpass = "Password didnt match";
      settext(false);
    }
    return errors;
  }
  const submit = () => {
    settext(true);
    seterrprompt(checkcredentials(name, contactno, password, conpass));
    if (text) {
      edit();
    }

    // settext(true);
  };
  const [show, setshow] = useState(false);
  return (
    <SafeAreaView style={{ flex: 1 }}>
      {Platform.OS === "ios" ? (
        <View style={{ flex: 1, alignItems: "center", marginTop: "4%" }}>
          {myContext.imageset ? (
            myContext.pickedImagePath !== null ? (
              <Avatar.Image size={100} source={myContext.pickedImagePath} />
            ) : (
              <Avatar.Image
                size={100}
                source={require("../assets/Userr.png")}
              />
            )
          ) : (
            (myContext.setPickedImagePath(null),
            (
              <Avatar.Image
                size={100}
                source={require("../assets/Userr.png")}
              />
            ))
          )}
          <Button
            title="Change Profile Photo"
            color={"#D6252E"}
            onPress={() => {
              setshow(true);
            }}
          />
        </View>
      ) : (
        <View style={{ flex: 1, alignItems: "center", marginTop: "4%" }}>
          {myContext.imageset ? (
            myContext.pickedImagePath !== null ? (
              <Avatar.Image size={100} source={myContext.pickedImagePath} />
            ) : (
              <Avatar.Image
                size={100}
                source={require("../assets/Userr.png")}
              />
            )
          ) : (
            (myContext.setPickedImagePath(null),
            (
              <Avatar.Image
                size={100}
                source={require("../assets/Userr.png")}
              />
            ))
          )}
          <View style={{ marginBottom: "2%" }}></View>
          <Button
            color={"#D6252E"}
            title="Change Profile Photo"
            onPress={() => {
              setshow(true);
            }}
          />
        </View>
      )}
      <View
        style={{
          flex: 3,
          backgroundColor: "#ffffff",
          borderTopWidth: 1,
          borderColor: "#dcdcdc",
        }}
      >
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginTop: "4%",
          }}
        >
          <Text style={{ marginLeft: "3%", fontSize: 17 }}>Name</Text>
          <TextInput
            value={name}
            onChangeText={(element) => {
              setname(element);
            }}
            placeholder="Enter Name"
            style={{
              marginLeft: "10%",
              backgroundColor: "#ffffff",
              width: "80%",
              height: 40,
            }}
          />
        </View>
        <View style={{ marginLeft: "25%", marginTop: "1%" }}>
          <Text style={{ color: "red", fontSize: 14, fontWeight: "bold" }}>
            {errprompt.name}
          </Text>
        </View>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginTop: 15,
          }}
        >
          <Text style={{ marginLeft: "3%", fontSize: 17 }}>Contact</Text>
          <TextInput
            value={contactno}
            onChangeText={(element) => {
              setcontactno(element);
            }}
            placeholder="Enter Contact Number"
            style={{
              marginLeft: "6%",
              backgroundColor: "#ffffff",
              width: "80%",
              height: 40,
            }}
          />
        </View>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginTop: 15,
          }}
        >
          <Text style={{ marginLeft: "3%", fontSize: 17 }}>Password</Text>
          <TextInput
            value={password}
            secureTextEntry={true}
            onChangeText={(element) => {
              setpassword(element);
            }}
            placeholder="Enter Password"
            style={{
              marginLeft: "6%",
              backgroundColor: "#ffffff",
              width: "80%",
              height: 40,
            }}
          />
        </View>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginTop: 15,
          }}
        >
          <Text style={{ marginLeft: "3%", fontSize: 17 }}>
            Confirm Password
          </Text>
          <TextInput
            value={conpass}
            secureTextEntry={true}
            onChangeText={(element) => {
              setconpass(element);
            }}
            placeholder="Confirm Password"
            style={{
              marginLeft: "6%",
              backgroundColor: "#ffffff",
              width: "80%",
              height: 40,
            }}
          />
        </View>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginTop: "4%",
            marginBottom: "4%",
          }}
        >
          <View
            style={{
              flexDirection: "row",
              marginTop: "2%",
            }}
          >
            <Text style={{ marginLeft: "3%", fontSize: 17 }}>CNIC</Text>
            <Text
              style={{
                marginLeft: "13%",
                backgroundColor: "#ffffff",
                width: "80%",
                height: 40,
                fontSize: 16,
                color: "#708090",
              }}
            >
              {cnic}
            </Text>
          </View>
        </View>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginTop: "-3%",
            marginBottom: "4%",
          }}
        >
          <View
            style={{
              flexDirection: "row",
              marginTop: "2%",
            }}
          >
            <Text style={{ marginLeft: "3%", fontSize: 17 }}>Email</Text>
            <Text
              style={{
                marginLeft: "13%",
                backgroundColor: "#ffffff",
                width: "80%",
                height: 40,
                fontSize: 16,
                color: "#708090",
              }}
            >
              {email}
            </Text>
          </View>
        </View>
        <View
          style={{
            marginTop: "-2%",
            marginBottom: "5%",
            borderTopWidth: 1,
            borderColor: "#dcdcdc",
          }}
        ></View>
        {Platform.OS === "ios" ? (
          <View>
            <Button title="Submit" color={"#D6252E"} onPress={submit}></Button>
          </View>
        ) : (
          <View style={{ width: "20%", alignSelf: "center" }}>
            <Button title="Submit" color={"#D6252E"} onPress={submit}></Button>
          </View>
        )}
      </View>

      <Modal visible={show} animationType="slide" transparent={true}>
        <View
          style={{
            backgroundColor: "#000000aa",
            flex: 1,
            flexDirection: "column",
          }}
        >
          {Platform.OS === "ios" ? (
            <View
              style={{
                marginLeft: "5%",
                marginRight: "5%",
                marginTop: "83%",
                marginBottom: "8%",
                backgroundColor: "#ffffff",
                borderRadius: 9,
                flex: 4,
              }}
            >
              <View style={{ alignItems: "center", marginTop: "5%" }}>
                {myContext.imageset ? (
                  myContext.pickedImagePath !== null ? (
                    <Avatar.Image
                      size={100}
                      source={myContext.pickedImagePath}
                    />
                  ) : (
                    <Avatar.Image
                      size={100}
                      source={require("../assets/Userr.png")}
                    />
                  )
                ) : (
                  <Avatar.Image
                    size={100}
                    source={require("../assets/Userr.png")}
                  />
                )}
              </View>
              <View style={{ alignItems: "center", marginTop: "4%" }}>
                <Text
                  style={{
                    fontWeight: "bold",
                    fontFamily: Platform.OS === "ios" ? "Arial" : "serif",
                    fontSize: 14,
                  }}
                >
                  Synced Profile Photo
                </Text>
              </View>
              <Pressable
                style={{
                  backgroundColor: "#003047",
                  height: "23%",
                  borderColor: "#dcdcdc",
                  borderTopWidth: 1,
                  borderBottomWidth: 1,
                  marginTop: "5%",
                }}
                onPress={() => myContext.setimageset(false)}
              >
                <Text
                  style={{
                    fontWeight: "normal",
                    fontFamily: Platform.OS === "ios" ? "Arial" : "serif",
                    fontSize: 18,
                    textAlign: "center",
                    marginTop: "5.5%",
                    color: "#f5f5f5",
                  }}
                >
                  Remove Photo
                </Text>
              </Pressable>
              <Pressable
                style={{
                  backgroundColor: "#003047",
                  height: "23%",
                  borderColor: "#dcdcdc",
                }}
                onPress={showImagePicker}
              >
                <Text
                  style={{
                    fontWeight: "normal",
                    fontFamily: Platform.OS === "ios" ? "Arial" : "serif",
                    fontSize: 18,
                    textAlign: "center",
                    marginTop: "5.5%",
                    color: "#f5f5f5",
                  }}
                >
                  Upload Photo
                </Text>
              </Pressable>
            </View>
          ) : (
            <View
              style={{
                marginLeft: "5%",
                marginRight: "5%",
                marginTop: "89%",
                marginBottom: "8%",
                backgroundColor: "#ffffff",
                borderRadius: 9,
                flex: 4,
              }}
            >
              <View style={{ alignItems: "center", marginTop: "5%" }}>
                {myContext.imageset ? (
                  myContext.pickedImagePath !== null ? (
                    <Avatar.Image
                      size={100}
                      source={myContext.pickedImagePath}
                    />
                  ) : (
                    <Avatar.Image
                      size={100}
                      source={require("../assets/Userr.png")}
                    />
                  )
                ) : (
                  <Avatar.Image
                    size={100}
                    source={require("../assets/Userr.png")}
                  />
                )}
              </View>
              <View style={{ alignItems: "center", marginTop: "4%" }}>
                <Text
                  style={{
                    fontWeight: "bold",
                    fontFamily: Platform.OS === "ios" ? "Arial" : "serif",
                    fontSize: 14,
                  }}
                >
                  Synced Profile Photo
                </Text>
              </View>
              <Pressable
                style={{
                  backgroundColor: "#003047",
                  height: "23%",
                  borderColor: "#dcdcdc",
                  borderTopWidth: 1,
                  borderBottomWidth: 1,
                  marginTop: "5%",
                }}
                onPress={() => myContext.setimageset(false)}
              >
                <Text
                  style={{
                    fontWeight: "normal",
                    fontFamily: Platform.OS === "ios" ? "Arial" : "serif",
                    fontSize: 18,
                    textAlign: "center",
                    marginTop: "5.5%",
                    color: "#f5f5f5",
                  }}
                >
                  Remove Photo
                </Text>
              </Pressable>
              <Pressable
                style={{
                  backgroundColor: "#003047",
                  height: "25%",
                  borderColor: "#dcdcdc",
                }}
                onPress={showImagePicker}
              >
                <Text
                  style={{
                    fontWeight: "normal",
                    fontFamily: Platform.OS === "ios" ? "Arial" : "serif",
                    fontSize: 18,
                    textAlign: "center",
                    marginTop: "5.5%",
                    color: "#f5f5f5",
                  }}
                >
                  Upload Photo
                </Text>
              </Pressable>
            </View>
          )}
          <Pressable
            style={{
              borderRadius: 9,
              marginLeft: "5%",
              marginRight: "5%",
              marginBottom: "2%",
              height: "5.5%",
              backgroundColor: "#D6252E",
            }}
            onPress={() => edit_image()}
          >
            <Text
              style={{
                fontWeight: "normal",
                fontFamily: Platform.OS === "ios" ? "Arial" : "serif",
                fontSize: 18,
                textAlign: "center",
                marginTop: "2%",
                color: "#f5f5f5",
              }}
            >
              Save
            </Text>
          </Pressable>
          <Pressable
            style={{
              backgroundColor: "#ffffff",
              borderRadius: 10,
              marginLeft: "5%",
              marginRight: "5%",
              marginBottom: "3%",
              height: "5%",
            }}
            onPress={() => setshow(false)}
          >
            <Text
              style={{
                fontWeight: "normal",
                fontFamily: Platform.OS === "ios" ? "Arial" : "serif",
                fontSize: 18,
                textAlign: "center",
                marginTop: "1.5%",
              }}
            >
              Cancel
            </Text>
          </Pressable>
        </View>
      </Modal>
    </SafeAreaView>
  );
}
export default Edit_Profile_Screen;
