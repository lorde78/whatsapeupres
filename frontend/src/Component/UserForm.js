import { useState } from "react";

export default function UserForm() {
	const [newusername, setNewusername] = useState("");
	const [newpassword, setNewpassword] = useState("");
	// const [loggedUser, setLoggedUser] = useContext();

	const handleNewUsername = (e) => {
		setNewusername(e.target.value);
		console.log(e.target.value);
	};

	const handleNewPassword = (e) => {
		setNewpassword(e.target.value);
		console.log(e.target.value);
	};

	const handleRegister = (e) => {
		e.preventDefault();
	};

	return (
		<div>
			<form onSubmit={handleRegister}>
				<h1>Please Register</h1>
				<div>
					<label htmlFor="newusername">Username</label>
					<input
						type="text"
						id="newusername"
						onChange={handleNewUsername}
						value={newusername}
					/>
				</div>
				<div>
					<label htmlFor="newpassword">Password</label>
					<input
						type="password"
						id="newpassword"
						value={newpassword}
						onChange={handleNewPassword}
					/>
				</div>
				<button type="submit">Submit</button>
			</form>
		</div>
	);
}
