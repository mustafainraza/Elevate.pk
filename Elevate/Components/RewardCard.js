import { View, Text, Pressable, StyleSheet, Alert } from "react-native";
import React, { useState, useContext } from "react";
// import { StripeProvider, useStripe } from "@stripe/stripe-react-native";
// import AuthContextProvider, { AuthContext } from "../../store/auth-context";
import { useNavigation } from "@react-navigation/native";
// import axios from "axios";
export default function RewardCard(props) {
    // console.log("C_ID", props.C_ID);
    // console.log("C_ID", props.R_ID);

    //  const [amount, setAmount] = useState("0");
    //   const stripe = useStripe();
    //   const authCtx = useContext(AuthContext);
    //   const token = authCtx.token;

    const navigation = useNavigation();

    //   const add_payment = async () => {
    //     await axios
    //       .post(`https://crowd-funding-api.herokuapp.com/projects/backed`, {
    //         cid: parseInt(props.campaign_id),
    //         rid: parseInt(props.reward_id),
    //         amount: parseInt(props.price),
    //         token: token,
    //       })
    //       .then(function (response) {
    //         console.log(response.data);
    //         // console.log(props.campaign_id);
    //         // console.log(props.reward_id);
    //         Alert.alert("Project Funded", "Project Successfuly Funded");
    //         props.check();
    //         setTimeout(() => {
    //           navigation.popToTop();
    //         }, 1000);
    //       })
    //       .catch((error) => {
    //         console.log(error.response.data);
    //       });
    //   };

    //   const fund = async () => {
    //     try {
    //       const finalAmount = parseInt(props.price);
    //       // console.log(finalAmount);
    //       if (finalAmount < 1) return Alert.alert("You cannot donate below 1 INR");
    //       const response = await fetch("http://192.168.4.201:5000/donate", {
    //         method: "POST",
    //         headers: {
    //           "Content-Type": "application/json",
    //         },
    //         body: JSON.stringify({ amount: finalAmount, name: "Ali" }),
    //       });
    //       const data = await response.json();
    //       if (!response.ok) {
    //         return Alert.alert(data.message);
    //       }
    //       const initSheet = await stripe.initPaymentSheet({
    //         paymentIntentClientSecret: data.clientSecret,
    //         merchantDisplayName: "anything",
    //       });
    //       if (initSheet.error) {
    //         console.error(initSheet.error);
    //         return Alert.alert(initSheet.error.message);
    //       }
    //       const presentSheet = await stripe.presentPaymentSheet({
    //         clientSecret: data.clientSecret,
    //       });
    //       if (presentSheet.error) {
    //         console.error(presentSheet.error);
    //         return Alert.alert(presentSheet.error.message);
    //       }
    //       add_payment();
    //       console.log("Payment done");
    //     } catch (err) {
    //       console.error(err);
    //       Alert.alert("Payment failed!");
    //     }
    //   };
    return (
        // <StripeProvider publishableKey="pk_test_51LZXfZAFLH9ol2SnE26bxXEHWqfncfiDRfxi6EcjIE5Wgcf7ftr8vEzmc4ziNRARwOric43eiTzugpPg2ehClrrR00Dav1dFMq">
        <View style={styles.card}>
            <View style={{ height: "100%" }}>
                <Text style={styles.title_style}>
                    Reward Name:
                    <Text style={styles.body_style}>{"  " + props.title}</Text>
                </Text>

                <Text style={styles.title_style}>
                    Description:
                    <Text style={styles.body_style}>{"  " + props.disc}</Text>
                </Text>

                <Text style={styles.title_style}>
                    PRICE:
                    <Text style={styles.text}>{"  " + props.price}</Text>
                </Text>
                <Pressable
                    android_ripple={{
                        color: "lightgreen",
                        borderless: false,
                        radius: 95,
                    }}
                    style={styles.Pressable}
                    onPress={() => {
                        // fund();
                        console.log("Reward ", props.price)
                    }}
                >
                    <Text style={styles.text}>SELECT</Text>
                </Pressable>
            </View>
        </View>
        // </StripeProvider>
    );
}

const styles = StyleSheet.create({
    Pressable: {
        backgroundColor: "green",
        justifyContent: "center",
        alignItems: "center",
        alignSelf: "center",
        width: "80%",
        minHeight: "20%",
        height: "30%",
        borderRadius: 30,
    },
    text: {
        fontSize: 20,
        color: "white",
        fontStyle: "italic",
    },
    card: {
        marginTop: "10%",
        marginBottom: "4%",
        flex: 1,
        backgroundColor: "#0097FF",
        alignSelf: "center",
        width: "80%",
        height: "70%",
        borderRadius: 20,
        padding: 10,
    },
    title_style: {
        fontSize: 22,
        color: "white",
        fontWeight: "bold",
        fontFamily: Platform.OS === "ios" ? "Arial" : "serif",
    },
    body_style: {
        fontWeight: "400",
        fontSize: 18,
        color: "white",
        fontFamily: Platform.OS === "ios" ? "Arial" : "serif",
    },
});
