import logo from './logo.svg';
import './App.css';
import { useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import NeedAuth from "./Auth/NeedAuth";
import UserList from "./Component/UserList";
import Login from "./Auth/Login";
import UserProvider from "./Context/UserContext";

function App() {
    const handleMessage = ( e ) => {
        console.log( JSON.parse( e.data ) );
    };

    useEffect( () => {
        const url = new URL( 'http://localhost:3000/.well-known/mercure' );
        url.searchParams.append('topic','lien de mon topic privé');
        const eventSource = new EventSource(url, {withCredentials: true});
        eventSource.onmessage = handleMessage;
        return () => {
            eventSource.close();
        }
    }, []);
    return (
        <UserProvider>
            <BrowserRouter>
                <Routes>
                    <Route path='/' element={<NeedAuth><UserList/></NeedAuth>}></Route>
                    <Route path='/login' element={<Login/>}></Route>
                </Routes>
            </BrowserRouter>
        </UserProvider>
    );
}

export default App;
