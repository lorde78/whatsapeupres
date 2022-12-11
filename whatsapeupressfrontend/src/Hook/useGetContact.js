import { base64 } from "react-native-base64";
import baseURL from "./baseUrl";

const usegetContacts = (token) => {
  let currentBaseUrl = baseURL();
  fetch(currentBaseUrl + "/users-list", {
    method: "get",
    mode: "cors",
    credentials: "include",
    headers: {
      "Content-type": "application/json",
      Authorization: `Bearer ${token}`, // notice the Bearer before your token
    },
  })
    .then((data) => data.json())
    .then((data) => setContacts(data))
    .then((data) => console.log(data))
    .catch((e) => {
      console.error(e);
    });
};

export default usegetContacts;
