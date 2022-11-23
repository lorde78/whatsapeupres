import logo from './logo.svg';
import './App.css';
import { useEffect } from 'react';
import { BrowserRouter, Routes, Route  } from 'react-router-dom';
import { Redirect } from 'react-router-dom';
import NeedAuth from "./Auth/NeedAuth";
import UserList from "./Component/UserList";
import Login from "./Auth/Login";
import UserProvider from "./Context/UserContext";

function App() {
    let eventSource;
    const handleMessage = ( e ) => {
        console.log( JSON.parse( e.data ) );
    };

    useEffect( () => {
        fetch('http://localhost:8245/login', {
            method: 'GET',
            credentials: 'include',
            mode: 'cors'

        })

            .then(()=> {
                const url = new URL( 'http://localhost:9090/.well-known/mercure' );
                url.searchParams.append( 'topic', 'https://example.com/my-private-topic' );
                const eventSource     = new EventSource( url, { withCredentials: true } );
                eventSource.onmessage = handleMessage;

        return () => {
            eventSource.close();
        }
            })
    }, []);
    return (
        <UserProvider>
            <BrowserRouter>
                <Routes>
                    <Route path='/' element={<NeedAuth><UserList/></NeedAuth>}>User list</Route>
                    <Route path='/login' element={<Login/>  }> Login </Route>
                </Routes>
            </BrowserRouter>
        </UserProvider>
    );
}

export default App;
