import "react-native-gesture-handler";
import { React, useState } from "react";
import { StyleSheet, TextBase, View, TextInput, Button } from "react-native";
import { Text } from "react-native-elements";
import axios from 'axios';

import Index from "./src";
import { Provider } from 'react-redux';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import store from './redux/store';

// var base64 = require("base-64");



export default function App() {
  return (
    <Provider store={store}>
        <Index />
    </Provider>
  );
}






