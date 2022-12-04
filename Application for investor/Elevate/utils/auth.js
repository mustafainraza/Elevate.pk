import { Alert } from "react-native";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
export async function createUser({ email, password, name, CNIC, contactno }) {
  const response = await axios.post(
    "http://192.168.100.78:3000/Investors/register",
    {
      email: email,
      password: password,
      name: name,
      CNIC: CNIC,
      contactno: contactno,
    }
  );
  const token = response.data;
  return token;
}

export async function loginUser(email, password) {
  const response = await axios.post("http://192.168.100.78:3000/Investors/login", {
    email: email,
    password: password,
  });
  const token = response.data;
  return token;
}
