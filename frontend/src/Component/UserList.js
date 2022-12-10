import { useEffect, useState } from 'react';
import useGetUserList from "../Hook/useGetUserList";
import useBackendPing from "../Hook/useBackendPing";
// import jwtDecode from 'jwt-decode';
// import {userContext} from "../Context/UserContext";

export default function UserList() {
    const [userList, setUserList] = useState([]);

    const getUserList = useGetUserList();
    const backendPing = useBackendPing();

    const handleSubmit = (e) => {
        e.preventDefault();
        const userId = e.target[0].value;
        console.log(userId);
        backendPing(userId).then(data => console.log(data))
    }

    const handleMessage = (e) => {
        document.querySelector('h1').insertAdjacentHTML('afterend', '<div class="alert alert-success w-75 mx-auto">Ping !</div>');
        window.setTimeout(() => {
            const $alert = document.querySelector('.alert');

            $alert.parentNode.removeChild($alert);
        }, 2000);
    }

    useEffect(() => {
        getUserList().then(data => setUserList(data.users));
        const url = new URL( 'http://localhost:9090/.well-known/mercure' );
        url.searchParams.append( 'topic', 'http://caddy/ping' );

        const eventSource     = new EventSource( url, { withCredentials: true } );
        eventSource.onmessage = handleMessage;

        return () => {
            eventSource.close();
        };
    }, [])


    return (
        <div>
            <h1 >Ping a user</h1>
            {userList.map((user) => (
                <form  onSubmit={handleSubmit} key={user.id}>
                    <button  type='submit' value={user.id}>{user.username}</button>
                </form>
            ))}
        </div>
    )
}