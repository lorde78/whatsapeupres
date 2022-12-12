//import liraries
import React, { Component, useState } from 'react';
import { View, Text, StyleSheet, TextInput, Button } from 'react-native';

import { useSelector } from 'react-redux';
import * as SecureStore from "expo-secure-store";


// create a component
const ChatBox = () => {

    const [contentMessage, setContentMessage] = useState();

    const session = useSelector(state => state.chatBoxReducer.session);
    const [jwt, setJWT] = useState();

    
    const getToken =  () => {
        return SecureStore.getItemAsync("secure_token");
      };

    getToken().then((token) => setJWT(token));
    

    const postMessage =  (token, userId , idChat, data) => {
         fetch(`https://9ae0-81-185-172-212.eu.ngrok.io/chat/${idChat}/${userId}`, {
         method: 'POST',
         body: data,
         mode: "cors",
        credentials: "include",
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }).then(data => data.JSON());
     
     };

    const handleMessage = (e) => {
        let valueMessage = e;
        setContentMessage(valueMessage);
        return contentMessage;

    };
    const handleSubmit = (e) => {

        postMessage(jwt, session[0], session[1], contentMessage)
    };
    return (
        <View style={styles.container}>
            <Text>ChatBox {session} </Text>

            <TextInput placeholder='message' onChangeText={handleMessage}></TextInput>
            <Button onPress={handleSubmit} title={"Submit"}></Button>
        </View>
    );
};

// define your styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#2c3e50',
    },
});

//make this component available to the app
export default ChatBox;
