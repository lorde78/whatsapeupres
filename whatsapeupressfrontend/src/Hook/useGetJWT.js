import axios from "axios";
import React from "react";

export default function useGetJWT() {
  return function (username, password) {
    const credentials = btoa(`${username}:${password}`);
    
    return axios
      .get(`http://localhost:8245/login`, {
        mode: "cors",
        credentials: "include",
        headers: {
            'Authorization': `Basic ${credentials}`
        }
      })
      .then((data) => data.json())
      .catch(function (error) {
        console.log(error);
      });
  };
}
