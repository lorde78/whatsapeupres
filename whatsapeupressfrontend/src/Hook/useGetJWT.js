import axios from "axios";
import React from "react";
import baseURL from "./baseUrl";
import base64 from "react-native-base64";

const useGetJWT = (username, password,setRespJWT) => {
  let currentBaseUrl = baseURL()
  const credentials = base64.encode(`${username}:${password}`);
  fetch(
    currentBaseUrl+"/login",
    {
      method: "get",
      credentials: "include",
      headers: {
        Authorization: `Basic ${credentials}`,
      },
    }
    )
    .then((response) => response.json())
    .then((responseData) => {
      setRespJWT(responseData);
      return responseData;
    })
    .catch((e) => {
      console.error(e);
    });
  };


  export default useGetJWT
