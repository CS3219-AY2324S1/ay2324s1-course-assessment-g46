import React from "react";
import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  IconButton,
  Button,
  useDisclosure,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
} from "@chakra-ui/react";
import { MdAccountCircle } from "react-icons/md";
import Profile from "./Profile";
import { signOut, deleteAccount } from "../../api/userClient";

export default function LoginOptions(props) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const token = localStorage.getItem("token");

  async function submitLogout(e) {
    e.preventDefault();
    const { data, error } = await signOut();
    if (error != null) {
      alert(error.message);
    } else {
      localStorage.removeItem("token");
      localStorage.removeItem("admin");
      props.setLoggedIn(false);
    }
  }

  async function submitDelete(e) {
    e.preventDefault();

    const { data, error } = await deleteAccount(token);
    if (error != null) {
      alert(error.message);
    } else {
      onClose(e);
      submitLogout(e);
    }
  }

  return (
    <>
      <Menu>
        <MenuButton as={IconButton} icon={<MdAccountCircle />} />
        <MenuList>
          <Profile />
          <MenuItem onClick={submitLogout}>Logout</MenuItem>
          <MenuItem onClick={onOpen}>Delete account</MenuItem>
          <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
              <ModalHeader> Delete your account </ModalHeader>
              <ModalCloseButton />
              <ModalBody>
                <Text>
                  This action will permanently delete your account and is
                  irreversible. Do you still want to do it?
                </Text>
              </ModalBody>
              <ModalFooter>
                <Button colorScheme="red" mr={3} onClick={submitDelete}>
                  Confirm
                </Button>
              </ModalFooter>
            </ModalContent>
          </Modal>
        </MenuList>
      </Menu>
    </>
  );
}
