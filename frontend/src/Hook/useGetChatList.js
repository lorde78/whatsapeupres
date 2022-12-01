export default function useGetUserList() {
    return function () {
        /*get list chats by userId*/
        return fetch(`http://localhost:8245/chats-list/${userId}`, {
            method: 'GET',
            mode: "cors",
            credentials: "include"
        })
            .then(data => data.json())
    }
}