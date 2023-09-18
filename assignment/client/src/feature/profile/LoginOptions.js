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
import { useAuth } from "../../context/AuthProvider";

export default function LoginOptions(props) {
  const { logout } = useAuth(); 

  async function submitLogout(e) {
    e.preventDefault();
    const { error } = await logout();
    if (error) {
        console.log(error);
    }
  }

  return (
    <>
      <Menu>
        <MenuButton as={IconButton} icon={<MdAccountCircle />} />
        <MenuList>
          <Profile />
          <MenuItem onClick={submitLogout}>Logout</MenuItem>
        </MenuList>
      </Menu>
    </>
  );
}
