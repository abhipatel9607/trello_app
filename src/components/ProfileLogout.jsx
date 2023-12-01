/** @format */

import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Image,
  Button,
} from "@chakra-ui/react";
import { ChevronDownIcon } from "@chakra-ui/icons";
import { Flex } from "@chakra-ui/react";

import { UserAuth } from "../googleSingIn/AuthContext";
import { Link } from "react-router-dom";

function ProfileLogout() {
  const { user, logOut } = UserAuth();

  const handleLogOut = async () => {
    try {
      await logOut();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Flex justifyContent="end">
      <Image src={user?.photoURL} alt="logo" width="15%" borderRadius="8px" />
      <Menu>
        <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
          {user?.displayName}
        </MenuButton>

        <MenuList>
          <Link to="/board">
            <MenuItem minH="40px">
              <span>Board</span>
            </MenuItem>
          </Link>
          <MenuItem minH="40px">
            <span>{user?.email}</span>
          </MenuItem>
          <MenuItem minH="40px" onClick={handleLogOut}>
            <span>Logout</span>
          </MenuItem>
        </MenuList>
      </Menu>
    </Flex>
  );
}

export default ProfileLogout;
