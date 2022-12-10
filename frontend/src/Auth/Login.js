
import { useLocation, useNavigate, Navigate } from "react-router-dom";
import { useContext, useState } from "react";
import { userContext } from "../Context/UserContext";
import useGetJWT from "../Hook/useGetJWT";

export default function Login() {
	const navigate = useNavigate();
	let location = useLocation();
	let from = location.state?.from?.pathname || "/";

	const getJWT = useGetJWT();
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [loggedUser, setLoggedUser] = useContext(userContext);

	const handleUsername = (e) => {
		setUsername(e.target.value);
	};

	const handlePassword = (e) => {
		setPassword(e.target.value);
	};
    

	const handleSubmit = (e) => {
		e.preventDefault();
		getJWT(username, password).then((data) => {
			if (data) {
				console.log(data);
				setLoggedUser(data);
				navigate(from, { replace: true });
			} else {
				console.log(data);
			}
		});
	};

    

	return (
		<div class="landing-page">
			<h1>Welcome to WhatsHack</h1>
			<span>Welcome to the most insecure chat app on internet...</span>
			<form class="landing-page-login" onSubmit={handleSubmit} >
				<div>
					<div class="landing-page-login-username">
						<label htmlFor="username">Please enter your nickname : </label>
						<input
							type="text"
							id="username"
							onChange={handleUsername}
							value={username}
                           
						/>
					</div>
					<div class="landing-page-login-password">
						<label htmlFor="password">Please enter your label : </label>
						<input
							type="password"
							id="password"
							onChange={handlePassword}
							value={password}
                           
						/>
					</div>
				</div>
				<div class="form-submit-redirect">
					<button class="main-button" type="submit">
						login
					</button>

					{/* <a class="main-button" href="">
						Register
					</a> */}
				</div>
			</form>
		</div>
	);
}
