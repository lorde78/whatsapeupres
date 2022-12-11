//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';

// create a component


const getMessages = (token) => {
    const [messages, setMessages] = useState();
    fetch("https://49b3-81-185-169-94.eu.ngrok.io/chats-list/9", {
      method: "get",
      mode: "cors",
      credentials: "include",
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${token}`, // notice the Bearer before your token
      },
    })
      .then((data) => data.json())
      .then((data) => setMessages(data))
      .then((data) => console.log(data))
      .catch((e) => {
        console.error(e);
      });
  };


const Messages = () => {
    return (
        <View style={styles.container}>
            <Text>Messages</Text>
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
export default Messages;
