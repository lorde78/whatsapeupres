import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import TextInANest from './Component/TextInANest';
import Login from './Auth/Login';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import UserList from './Component/UserList';
import Profile from './Component/Profile';


const Stack = createNativeStackNavigator();

export default function App() {
    return (
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen
                name="Home"
                component={Login}
                options={{ title: 'Login' }}
            />
              <Stack.Screen
                  name="Contacts"
                  component={UserList}
                  options={{ title: 'Nos contacts' }}
              />
              <Stack.Screen
                  name="Mon Compte"
                  component={Profile}
                  options={{ title: 'Mon compte' }}
              />

          </Stack.Navigator>
        </NavigationContainer>

    );
}

const styles = StyleSheet.create( {
                                      container: {
                                          flex: 1,
                                          backgroundColor: '#fff',
                                          alignItems: 'center',
                                          justifyContent: 'center',
                                      },
                                  } );
