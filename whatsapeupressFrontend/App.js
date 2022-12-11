import "react-native-gesture-handler";
import { React, useState } from "react";
import { StyleSheet, TextBase, View, TextInput, Button } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Text } from "react-native-elements";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import axios from 'axios';
import base64 from 'react-native-base64'

import { Provider } from 'react-redux';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';

import store from './redux/store';

import { login, signUp, logout } from './redux/reducers/auth';

const [loginUserApp, setLoginUserApp] = useState(null);
// var base64 = require("base-64");

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();
export default function App() {
  return (
    <Provider store={store}>
        <AppScreen />
    </Provider>
  );
}
function HomeScreen() {
  return (
    <View>
      <Text>scsjdcnsdjn</Text>
    </View>
  );
}

function Profile() {
  return (
    <View>
      <Text>Profile</Text>
    </View>
  );
}

function Messages() {
  return (
    <View>
      <Text>Messages</Text>
    </View>
  );
}

function Contacts() {
  return (
    <View>
      <Text>Contacts</Text>
    </View>
  );
}

function MyTabs() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Messages" component={Messages} />
      <Tab.Screen name="Contacts" component={Contacts} />
      <Tab.Screen name="Profile" component={Profile} />
    </Tab.Navigator>
  );
}
function LoginUser() {

  // const dispatch = useDispatch();

  const user = useSelector(state => state.user);
  // const getJWT = useGetJWT()
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [jwt , setJWT] = useState("");
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
  
  function getJWT (username,password)  {
    const credentials = base64.encode(`${username}:${password}`);
    fetch('https://c19e-2001-861-5df0-6bd0-65d2-aa86-ad4f-bdf1.eu.ngrok.io/login', {
      method: 'get',
      credentials: "include",
      headers: {
        'Authorization': `Basic ${credentials}`
      }
    })
      .then(data => data.json())
      .then((data) => setJWT(data.jwt))
      .catch((e) => {
        console.error(e);
      });
    }
    const handleSubmit = (e) => {
      // getJWT(username, password);
      console.log('je valide!!!');
    }
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
}

function AppScreen() {
  return (
    <>
      <NavigationContainer initialRouteName="Login">
        <Tab.Navigator>
          <Tab.Screen name="Login" component={LoginUser} />
          <Tab.Screen name="Messages" component={Messages} />
          <Tab.Screen name="Profile" component={Profile} />
          <Tab.Screen name="Contacts" component={Contacts} />
        </Tab.Navigator>
      </NavigationContainer>
    </>
  );
}

// ...
