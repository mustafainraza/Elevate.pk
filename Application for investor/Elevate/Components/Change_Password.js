import react, { useState, useEffect, useContext } from "react";
import { View, Text, Button, TextInput } from "react-native";
import AppContext from "./AppContext";
import axios from "axios";
import { Platform } from "react-native";
function Change_Password() {
  const edit = async () => {
    await axios
      .patch(`http://192.168.1.5:3080/profile/changepass`, {
        password: newpassword,
        currpass: currpassword,
        //token: token,
        token:
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImJidkBnbWFpbC5jb20iLCJuYW1lIjoiYXNhZCIsImlhdCI6MTY2OTk5NzM4MiwiZXhwIjoxNzAxNTMzMzgyfQ.2zu4wIzWEOrLxihR_A8tuY8bMjmS_6qqWtREhZT2xdg",
      })
      .then(function (response) {
        //console.log(new Date().toString());
        alert(response.data);
      })
      .catch(function (error) {
        console.log(error);
        seterrprompt({
          ...errprompt,
          currpassword:
            "Your old password was entered incorrectly. Please enter it again.",
        });
      });
  };
  useEffect(() => {}, [errprompt]);
  const [newpassword, setnewpassword] = useState("");
  const [currpassword, setcurrpassword] = useState("");
  const [conpass, setconpass] = useState("");
  const [text, settext] = useState(true);
  const myContext = useContext(AppContext);
  const [errprompt, seterrprompt] = useState({});
  function checkcredentials(e1, e2, e3) {
    let errors = {};
    if (e1 === "") {
      errors.currpassword = "Current Password is required";
      settext(false);
    }
    if (e2.length < 6) {
      errors.newpassword = "Password must be atleast 6 characters long";
      settext(false);
    } else if (e2 !== e3) {
      errors.conpass = "Password didnt match";
      settext(false);
    }
    return errors;
  }
  const save = () => {
    settext(true);
    seterrprompt(checkcredentials(currpassword, newpassword, conpass));
    if (
      Object.keys(checkcredentials(currpassword, newpassword, conpass))
        .length === 0
    ) {
      edit();
    }
  };
  return (
    <View>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          marginTop: 15,
        }}
      >
        <Text style={{ marginLeft: "3%", fontSize: 17 }}>Current Password</Text>
        <TextInput
          value={currpassword}
          secureTextEntry={true}
          onChangeText={(element) => {
            setcurrpassword(element);
          }}
          placeholder="Enter your current password"
          style={{
            marginLeft: "6%",
            backgroundColor: "#ffffff",
            width: "80%",
            height: 40,
            borderBottomWidth: 1,
            borderColor: "#dcdcdc",
          }}
        />
      </View>
      <View style={{ marginLeft: "40%", marginTop: "1%" }}>
        <Text style={{ color: "red", fontSize: 14, fontWeight: "bold" }}>
          {errprompt.currpassword}
        </Text>
      </View>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        <Text style={{ marginLeft: "3%", fontSize: 17 }}>New Password</Text>
        <TextInput
          value={newpassword}
          secureTextEntry={true}
          onChangeText={(element) => {
            setnewpassword(element);
          }}
          placeholder="New Password"
          style={{
            marginLeft: "6%",
            backgroundColor: "#ffffff",
            width: "80%",
            borderBottomWidth: 1,
            height: 40,
            borderColor: "#dcdcdc",
          }}
        />
      </View>
      <View style={{ marginLeft: "36%", marginTop: "1%" }}>
        <Text style={{ color: "red", fontSize: 14, fontWeight: "bold" }}>
          {errprompt.newpassword}
        </Text>
      </View>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        <Text style={{ marginLeft: "3%", fontSize: 17 }}>Confirm Password</Text>
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
            borderBottomWidth: 1,
            borderColor: "#dcdcdc",
          }}
        />
      </View>
      <View style={{ marginLeft: "42%", marginTop: "1%" }}>
        <Text style={{ color: "red", fontSize: 14, fontWeight: "bold" }}>
          {errprompt.conpass}
        </Text>
      </View>
      {Platform.OS === "ios" ? (
        <View
          style={
            {
              // marginTop: "5%",
              //justifyContent: "center",
              //alignContent: "center",
              //alignItems: "center",
            }
          }
        >
          <Button title="Save" color={"#D6252E"} onPress={save}></Button>
        </View>
      ) : (
        <View style={{ width: "20%", alignSelf: "center" }}>
          <Button title="Submit" color={"#D6252E"} onPress={save}></Button>
        </View>
      )}
    </View>
  );
}
export default Change_Password;
