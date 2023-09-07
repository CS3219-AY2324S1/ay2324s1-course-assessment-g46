import React from "react";
import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  IconButton,
} from "@chakra-ui/react";
import { MdAccountCircle } from "react-icons/md";
import Profile from "./Profile";

export default function LoginOptions(props) {
  function logout(e) {
    props.logout();
    localStorage.setItem("loggedIn", "false");
  }

  return (
    <>
      <Menu>
        <MenuButton as={IconButton} icon={<MdAccountCircle />} />
        <MenuList>
          <Profile />
          <MenuItem onClick={logout}>Logout</MenuItem>
        </MenuList>
      </Menu>
    </>
  );
}
