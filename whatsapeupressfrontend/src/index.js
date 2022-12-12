
import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Messages from './pages/Messages';
import Contacts from './pages/Contacts';
import Profile from './pages/Profile';
import ChatBox from './pages/ChatBox';
import LoginUser from './Components/LoginUser';
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";


const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

// create a component
const Index = () => {
    return (
        <NavigationContainer initialRouteName="Login">
        <Tab.Navigator>
          <Tab.Screen name="Login" component={LoginUser} />
          <Tab.Screen name="Messages" component={Messages} />
          <Tab.Screen name="Profile" component={Profile} />
          <Tab.Screen name="Contacts" component={Contacts} />
          <Tab.Screen name="ChatBox" component={ChatBox} />
        </Tab.Navigator>
      </NavigationContainer>
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
export default Index;



