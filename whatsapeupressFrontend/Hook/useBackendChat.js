export default function useBackendPing() {
    return function ( userId ) {
        console.log( userId );
        return fetch( `http://localhost:8245/chat/${userId}`, {
            method: 'POST',
            mode: "cors",
            credentials: "include"
        } )
            .then( data => data.json() )
            .then( data => data.message );
    };
}