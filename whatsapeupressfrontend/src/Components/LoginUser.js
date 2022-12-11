//import liraries
import React, { Component, useState } from "react";
import { View, Text, StyleSheet, TextInput, Button } from "react-native";
import base64 from 'react-native-base64';

import { Provider } from 'react-redux';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';

import { login } from './../../redux/reducers/auth';
import { logout } from './../../redux/reducers/auth';

import * as SecureStore from 'expo-secure-store';
// create a component

const setToken = (token) => {
  return SecureStore.setItemAsync('secure_token', token);
};

const getToken = () => {
  return SecureStore.getItemAsync('secure_token');
};


const LoginUser = () => {
  const dispatch = useDispatch();
  
  const user = useSelector(state => state.user);
  // const getJWT = useGetJWT()
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [ respJWT, setRespJWT] = useState(null);
  // const [jwt , setJWT] = useState("");
  /*    const [loggedUser, setLoggedUser] = useContext(userContext);*/
  
  const handleUsername = (e) => {
    let valueUsername = e;
    setUsername(valueUsername);
    return username;
  };
  
  const handlePassword = (e) => {
    let valuePassword = e;
    setPassword(valuePassword);
    return password;
  };
  
  const getJWT = (username, password) => {
    const credentials = base64.encode(`${username}:${password}`);
    fetch(
      "https://49b3-81-185-169-94.eu.ngrok.io/login",
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
    const handleSubmit = (e) => {
      
      getJWT(username, password);

      if(respJWT !== null) {
        setToken(respJWT.jwt);
        getToken().then(token => console.log(token));
        getToken().then(token => console.log(token));
      }
      // if(user !== null) {
      //   setToken(user);
      //   getToken().then(token => console.log(token));
      // }
      
    };
    return (
      <View>
      <Text>Please LogIn</Text>
      <View>
        <TextInput
          onChangeText={handleUsername}
          id={"username"}
          className={"form-control"}
          placeholder={"Username"}
        />
      </View>
      <View>
        <TextInput
          onChangeText={handlePassword}
          id={"password"}
          className={"form-control"}
          placeholder={"Password"}
        />
      </View>
      <Button onPress={handleSubmit} title={"Submit"}></Button>
    </View>
  );
};

// define your styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#2c3e50",
  },
});

//make this component available to the app
export default LoginUser;
