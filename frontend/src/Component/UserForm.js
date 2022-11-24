import { useState } from "react";


export default function UserForm() {
	const [newusername, setNewusername] = useState("");
	const [newpassword, setNewpassword] = useState("");
	// const [loggedUser, setLoggedUser] = useContext();

    const handleNewUsername = (e) => {
        setNewusername(e.target.value);
        console.log(e.target.value);
    }

    const handleNewPassword = (e) => {
        setNewpassword(e.target.value);
        console.log(e.target.value);
    }

    const handleRegister = (e) => {
        e.preventDefault();
        
    }


	return (
		<div>
			<form onSubmit={handleRegister}>
				<h1>Please Register</h1>
				<div className="mb-3">
					<label htmlFor="newusername" className="form-label">
						Username
					</label>
					<input
						type="text"
						className="form-control"
						id="newusername"
                        onChange={handleNewUsername}
						value={newusername}
					/>
				</div>
				<div className="mb-3">
					<label htmlFor="newpassword" className="form-label">
						Password
					</label>
					<input
						type="password"
						className="form-control"
						id="newpassword"
						value={newpassword}
                        onChange={handleNewPassword}
					/>
				</div>
				<button type="submit" className="btn btn-primary" >
					Submit
				</button>
			</form>
		</div>
	);
}
