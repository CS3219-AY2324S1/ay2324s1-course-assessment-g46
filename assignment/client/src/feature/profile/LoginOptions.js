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
  Text
} from "@chakra-ui/react";
import { MdAccountCircle } from "react-icons/md";
import Profile from "./Profile";
import { useAuth } from "../../context/AuthProvider";
import { supabase } from "../../supabaseClient";

export default function LoginOptions(props) {
  const { session, logout } = useAuth(); 
  const { isOpen, onOpen, onClose } = useDisclosure();

  async function submitLogout(e) {
    e.preventDefault();
    const { error } = await logout();
    if (error) {
      alert(error.message);
    }
  }

  async function deleteAccount(e) {
    e.preventDefault();

    const { error } = await supabase
    .from('profiles')
    .delete()
    .eq('id', session.user.id);

    onClose(e);
    submitLogout(e);

    if (error) {
      alert(error.message);
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
                  This action will permanently delete your account and is irreversible. 
                  Do you still want to do it?
                </Text>
              </ModalBody>
              <ModalFooter>
                <Button
                  colorScheme="red"
                  mr={3}
                  onClick={deleteAccount}>
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
