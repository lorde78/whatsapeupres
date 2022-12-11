//import liraries
import React, { Component, useState, useEffect } from "react";
import { View, Text, StyleSheet, Touchable } from "react-native";
import * as SecureStore from "expo-secure-store";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { userListSet } from "../../redux/reducers/Contactsreducer";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";
// const getToken = () => {
//     return SecureStore.getItemAsync('secure_token');
//   };

//   const token = getToken().then(token => console.log(token));

//   console.log(token+'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaajesuisla');

// create a component
const Contacts = () => {
  const user = useSelector((state) => state.user);
  const [jwt, setJWT] = useState();
  const [contacts, setContacts] = useState();
  const [currentContacts, setCurrentContacts] = useState();

  const getContacts = (token) => {
    fetch("https://49b3-81-185-169-94.eu.ngrok.io/users-list", {
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

  const getToken = () => {
    return SecureStore.getItemAsync("secure_token");
  };

  getToken().then((token) => setJWT(token));

  useEffect(() => {
    getContacts(jwt);
    console.log(contacts.users);
    if(contacts !== undefined) {
        setCurrentContacts(contacts);
    }}
  );
  return (
    <View style={styles.container}>
        
    </View>
  );

};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#2c3e50",
  },
});

//make this component available to the app
export default Contacts;
