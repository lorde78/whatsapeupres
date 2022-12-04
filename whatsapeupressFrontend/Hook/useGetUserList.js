export default function useGetUserList() {
    return function () {
        return fetch('http://localhost:8245/users-list', {
            method: 'GET',
            mode: "cors",
            credentials: "include"
        })
            .then(data => data.json())
    }
}