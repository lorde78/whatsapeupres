//import liraries
import React, { Component, useState, useEffect } from "react";
import { View, Text, StyleSheet, Touchable, Button, Alert } from "react-native";
import * as SecureStore from "expo-secure-store";

import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { startsession } from "../../redux/reducers/ChatBox";
import { stopsession } from "../../redux/reducers/ChatBox";

import { userListSet } from "../../redux/reducers/Contactsreducer";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";

import { useQuery } from "react-query";

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import chatBoxReducer from './../../redux/reducers/ChatBox';


// create a component
const Contacts = ({navigation}) => {
  const user = useSelector((state) => state.user);
  const [jwt, setJWT] = useState();
  const [contacts, setContacts] = useState();
  const [currentChatId, setCurrentChatId] = useState();
  const [currentContacts, setCurrentContacts] = useState();
  
  const session = useSelector(state => console.log(state.chatBoxReducer.session));
  const dispatch = useDispatch();
  


  const getToken =  () => {
    return SecureStore.getItemAsync("secure_token");
  };
  
  const getContacts = async (token) => {
     let response = await fetch("https://9ae0-81-185-172-212.eu.ngrok.io/users-list", {
     method: "get",
     mode: "cors",
     credentials: "include",
     headers: {
       "Content-type": "application/json",
       Authorization: `Bearer ${token}`, // notice the Bearer before your token
     },
   })

   let json = await response.json();
   setContacts(json.users);
   return json.users;
  
  };

  
  const getCurrentChat = async (token, userId) => {
     let response = await fetch(`https://9ae0-81-185-172-212.eu.ngrok.io/currentChatRoom/${userId}`, {
     method: "get",
     mode: "cors",
     credentials: "include",
     headers: {
       "Content-type": "application/json",
       Authorization: `Bearer ${token}`, // notice the Bearer before your token
     },
   })

   let json = await response.json();
   setCurrentChatId(json.currentChatRoom.id)
   console.log(json)
      return json;
  
  };

  const postChat = async (token, userId) => {
    let response = await fetch(`https://9ae0-81-185-172-212.eu.ngrok.io/chat/${userId}`, {
      method: 'POST',
      mode: "cors",
     credentials: "include",
     headers: {
       "Content-type": "application/json",
       Authorization: `Bearer ${token}`, // notice the Bearer before your token
     },
   })

   let json = await response.json();
      return json;
  
  };

  getToken().then((token) => setJWT(token));
  getContacts(jwt);


  const handlePress = (jwt, idUser, itemUsername,session,dispatch, startsession, currentChatId ) => {
    
    
    postChat(jwt, idUser)
    
    getCurrentChat(jwt, idUser);
    dispatch(startsession([itemUsername ,170 ]));
    

    // if(session !== undefined) {
    //   dispatch(stopsession());
    //   dispatch(startsession(itemUsername));
    // }



      navigation.navigate('ChatBox')
      
      
  }


  // useEffect(() => {
  //   // getContacts(jwt);
  //   // console.log(contacts);
  // });


  return (
    <View style={styles.container}>
        {contacts && contacts.map((item) => 
          <Button
        title={item.username}
        id={item.id}
        onPress={() =>handlePress(jwt, item.id,item.username, session, dispatch , startsession, currentChatId )}
      />
          )}
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
