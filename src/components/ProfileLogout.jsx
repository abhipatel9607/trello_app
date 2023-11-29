import {
	Menu,
	MenuButton,
	MenuList,
	MenuItem,
	Image,
	Button,
} from "@chakra-ui/react";
import { ChevronDownIcon } from "@chakra-ui/icons";
import { useContext } from "react";
import { UserContext } from "../routes";
import { Flex } from "@chakra-ui/react";

// const userData = {
// 	name: "Abhishek Patel",
// 	photoURL:
// 		"https://lh3.googleusercontent.com/a/ACg8ocKg2ZPUoeuQ_xU5uAGLjoBCTSXhRPPB1mPc2GdP5pVI7VI=s96-c",
// 	email: "abhipatel9607@gmail.com",
// };

function ProfileLogout() {
	const { userData, setUserData } = useContext(UserContext);
	console.log(userData);

	function handleLogout() {
		localStorage.removeItem("trello_email");
		window.location = "/";
	}

	return (
		<Flex justifyContent="end">
			<Image
				src={userData.photoURL}
				alt="logo"
				width="15%"
				borderRadius="8px"
			/>
			<Menu>
				<MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
					{userData.name}
				</MenuButton>

				<MenuList>
					<MenuItem minH="40px">
						<span>{userData.email}</span>
					</MenuItem>
					<MenuItem minH="40px" onClick={handleLogout}>
						<span>Logout</span>
					</MenuItem>
				</MenuList>
			</Menu>
		</Flex>
	);
}

export default ProfileLogout;
