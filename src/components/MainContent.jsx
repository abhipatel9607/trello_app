import HeroSection from "./HeroSection";
// import { useEffect } from "react";

function MainContent() {
	const login = localStorage.getItem("trello_email");
	console.log(login);
	if (!login) return <HeroSection />;
	return (
		<div>
			<h1>Board</h1>
		</div>
	);
}

export default MainContent;
