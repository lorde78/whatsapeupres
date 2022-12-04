
import {useContext, useState} from "react";
import useGetJWT from "../Hook/useGetJWT";
import { Button, Text, TextInput, View } from 'react-native';

export default function Login() {
/*    const navigate = useNavigate();
    let location = useLocation();
    let from = location.state?.from?.pathname || '/';*/

    const getJWT = useGetJWT()
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
/*    const [loggedUser, setLoggedUser] = useContext(userContext);*/

    const handleUsername = () => {
    }

    const handlePassword = () => {
    }

    const handleSubmit = (e) => {
/*        getJWT(username, password).then(data => {
            if (data) {
                console.log(data);
                setLoggedUser(data);
                navigate(from, {replace: true});

            } else {
                console.log(data)
            }
        })*/
    }

    return (
        <View >
            <Text>Please LogIn</Text>
            <View >
                <TextInput
                    onChangeText={handleUsername}
                    id={"username"}
                    className={'form-control'}
                    placeholder={"Username"}
                />
            </View>
            <View >
                <TextInput
                    onChangeText={handlePassword}
                    id={"password"}
                    className={'form-control'}
                    placeholder={"Password"}
                />
            </View>
            <Button
                onPress={handleSubmit} title={"Submit"}></Button>
        </View>
    )
}