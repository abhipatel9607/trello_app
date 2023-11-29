// import { Link as ChakraLink } from "@chakra-ui/react";
import { Box, Flex, Text, Button } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import logo from "../assets/Trello-logo-blue.svg.png";
import ProfileLogout from "./ProfileLogout";

export default function AppHeader() {
	const login = localStorage.getItem("trello_email");
	return (
		<Box bg="white" position="sticky" top={0} zIndex={1000}>
			<Flex justify="space-between" p="4">
				<Link to="/">
					<img src={logo} alt="logo" width="130px" />
				</Link>
				{login ? (
					<ProfileLogout />
				) : (
					<Link to="/login">
						<Button colorScheme="blue">Login</Button>
					</Link>
				)}
			</Flex>
		</Box>
	);
}
