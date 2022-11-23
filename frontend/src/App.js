import logo from './logo.svg';
import './App.css';
import { useEffect } from 'react';

function App() {
    const handleMessage = ( e ) => {
        console.log( JSON.parse( e.data ) );
    };

    useEffect( () => {
        const url = new URL( 'http://localhost:1234/.well-known/mercure' );
        url.searchParams.append('topic','lien de mon topic privé');
        const eventSource = new EventSource(url, {withCredentials: true});
        eventSource.onmessage = handleMessage;
        return () => {
            eventSource.close();
        }
    }, []);
    return (
        <div className="App">
            <header className="App-header">
                <img src={logo} className="App-logo" alt="logo"/>
                <p>
                    Edit <code>src/App.js</code> and save to reload.
                </p>
                <a
                    className="App-link"
                    href="https://reactjs.org"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    Learn React
                </a>
            </header>
        </div>
    );
}

export default App;
