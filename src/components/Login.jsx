/** @format */

import { Box, Button, Grid, Image, Text, Center } from "@chakra-ui/react";
import { FcGoogle } from "react-icons/fc";
import loginLeft from "../assets/login_left.png";
import loginRight from "../assets/login_right.png";
import { UserAuth } from "../googleSingIn/AuthContext";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

function Login() {
  // Get the user and googleSignIn function from the authentication context
  const { googleSingIn, user } = UserAuth();
  const navigate = useNavigate();

  // Handle Google Sign In
  const handleGoogleSingin = async () => {
    try {
      await googleSingIn();
    } catch (err) {
      console.error(err);
    }
  };

  // Redirect to the board page if the user is already authenticated
  useEffect(() => {
    if (user != null) {
      navigate("/board");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

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
            onClick={handleGoogleSingin}
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
