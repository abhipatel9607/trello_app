/** @format */

import { Box, Flex, Button } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import logo from "../assets/Trello-logo-blue.svg.png";
import ProfileLogout from "./ProfileLogout";
import { UserAuth } from "../googleSingIn/AuthContext";

export default function AppHeader() {
  const { user } = UserAuth();

  return (
    <Box bg="#fff" position="sticky" top={0} zIndex={1000}>
      <Flex justify="space-between" p="4">
        <Link to="/">
          <img src={logo} alt="logo" width="130px" />
        </Link>
        {user?.displayName ? (
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
