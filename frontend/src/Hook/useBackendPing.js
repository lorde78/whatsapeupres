export default function useBackendPing() {
	return function (userId) {
        console.log(userId);
		return fetch(`http://localhost:8245/ping/${userId}`, {
			method: "POST",
            // mode: "cors",
            // credentials: "include",
            // headers: {
            //     'Authorization': `Basic ${userId}`
            // }
		})
        // .then((res => console.log(res.data)))
        // .catch((err => console.log(err.res)))
			.then((data) => data.json())
			.then((data) => data.message);
	};
}
