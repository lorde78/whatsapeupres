import { useEffect, useState } from "react";
import useGetUserList from "../Hook/useGetUserList";
import useBackendPing from "../Hook/useBackendPing";
import Typewriter from "typewriter-effect";
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
		backendPing(userId).then((data) => console.log(data));
	};

	const handleMessage = (e) => {
		document
			.querySelector("h1")
			.insertAdjacentHTML(
				"afterend",
				'<div class="alert alert-success w-75 mx-auto">Ping !</div>'
			);
		window.setTimeout(() => {
			const $alert = document.querySelector(".alert");

			$alert.parentNode.removeChild($alert);
		}, 2000);
	};

	useEffect(() => {
		getUserList().then((data) => setUserList(data.users));
		const url = new URL("http://localhost:9090/.well-known/mercure");
		url.searchParams.append("topic", "http://caddy/ping");

		const eventSource = new EventSource(url, { withCredentials: true });
		eventSource.onmessage = handleMessage;

		return () => {
			eventSource.close();
		};
	}, []);

    setTimeout(() => {
		document.querySelector("h2 .Typewriter__cursor").classList.add("remove");
	}, 5000);

	return (
		<div class="user-list-wrap">
			<div class="margin-separator"></div>
			<div class="user-list">
				<h2><Typewriter
					onInit={(typewriter) => {
						typewriter
							.typeString("Hackers successfully listed")
							.start();
					}}
				/></h2>
				<span>
					======================================================================
				</span>
				<div class="user-list-container">
					{userList.map((user) => (
						<form onSubmit={handleSubmit} key={user.id}>
							<button type="submit" value={user.id}>
								<span class="nickname">{user.username}</span>
								<span class="message">text</span>
							</button>
						</form>
					))}
				</div>
			</div>
		</div>
	);
}
