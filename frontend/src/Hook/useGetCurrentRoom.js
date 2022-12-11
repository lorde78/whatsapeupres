export default function useGetUserList() {
    return async function (userId) {
        /*get list chats by userId*/
        return await fetch(`http://localhost:8245/currentChatRoom/${userId}`, {
            method: 'GET',
            mode: "cors",
            credentials: "include"
        })
            .then(data => data.json())
    }
}