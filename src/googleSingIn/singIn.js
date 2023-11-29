import React, { useEffect, useState } from "react";
import { auth, provider } from "./config";
import { signInWithPopup } from "firebase/auth";

function singIn() {
	const [value, setValue] = useState("");

	function handleSingIn() {
		signInWithPopup(auth, provider).then((data) => {
			setValue(data.user.email);
			console.log(data);
			localStorage.setItem("trello_email", data.user.email);
		});
	}

	// useEffect(() => {
	// 	setValue(localStorage.getItem("trello_email"));
	// });
	return (
		<div>
			if(value)
			<button onClick={handleSingIn}>singin</button>
		</div>
	);
}
