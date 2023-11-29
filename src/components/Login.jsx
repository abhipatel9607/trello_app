// import React, { useContext, useEffect, useState } from "react";
import { useContext } from "react";
import { UserContext } from "../routes";
import { auth, provider } from "../googleSingIn/config";
import { signInWithPopup } from "firebase/auth";
import { Box, Button, Grid, Image, Text, Center } from "@chakra-ui/react";
import { FcGoogle } from "react-icons/fc";
import loginLeft from "../assets/login_left.png";
import loginRight from "../assets/login_right.png";

function Login() {
	// const [user, isLoading, error] = useAuthState(auth);
	const { userData, setUserData } = useContext(UserContext);
	console.log(userData);

	function handleSingIn() {
		signInWithPopup(auth, provider).then((data) => {
			localStorage.setItem("trello_email", data.user.email);
			console.log({
				name: data.user.displayName,
				photoURL: data.user.photoURL,
				email: data.user.email,
			});
			console.log(data);
			setUserData({
				name: data.user.displayName,
				photoURL: data.user.photoURL,
				email: data.user.email,
			});
			setUserData(data);
			window.location = "/";
		});
	}

	return (
		<Grid
			templateColumns={{ sm: "1fr", md: "1fr 1fr 1fr" }}
			gap={{ sm: 4, md: 8 }}
			alignItems="end"
			justifyContent="center"
			height="100vh"
		>
			<Box gridColumn={{ sm: "span 1", md: "span 1" }}>
				<Image src={loginLeft} alt="logo" width="100%" />
			</Box>
			<Box
				gridColumn={{ sm: "span 1", md: "span 1" }}
				display="flex"
				flexDirection="column"
				alignItems="center"
				paddingBottom="60vh"
			>
				<Center p={8}>
					<Button
						w={"full"}
						maxW={"md"}
						variant={"outline"}
						leftIcon={<FcGoogle />}
						border="1px solid black"
						bg="white.500"
						_hover={{ bg: "blue.200" }}
						onClick={handleSingIn}
					>
						<Center>
							<Text>Sign in with Google</Text>
						</Center>
					</Button>
				</Center>
			</Box>
			<Box gridColumn={{ sm: "span 1", md: "span 1" }}>
				<Image src={loginRight} alt="logo" width="100%" />
			</Box>
		</Grid>
	);
}

export default Login;
