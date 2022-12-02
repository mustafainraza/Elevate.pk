import { Alert } from "react-native";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
export async function createUser({ email, password, name, CNIC, contactno }) {
  const response = await axios.post(
    "http://192.168.1.5:3080/Investors/register",
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
  const response = await axios.post("http://192.168.1.5:3080/Investors/login", {
    email: email,
    password: password,
  });
  const token = response.data;
  return token;
}

// export async function CreateCampaign(credentials) {
//   let { title, subtitle, description, risks, budget, picture, rewards, token } =
//     credentials;

//   const response = await axios.post(
//     "https://crowd-funding-api.herokuapp.com/projects/campaign",
//     {
//       campaign_info: {
//         title: title,
//         subtitle: subtitle,
//       },
//       total_funds: budget,
//       project_story: {
//         description: description,
//         factors: risks,
//       },
//       rewards_list: rewards,
//       image: picture,
//       token: token,
//     }
//   );
//   const data = response.data;
//   return data;
// }
