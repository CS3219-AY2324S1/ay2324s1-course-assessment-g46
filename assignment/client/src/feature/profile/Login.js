import React, { useState } from "react";
import {
    Button,
    FormControl,
    FormLabel,
    Input,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
    useDisclosure,
} from "@chakra-ui/react";
import { useAuth } from "../../context/AuthProvider";

export default function Login(props) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useAuth();

  async function submitLogin(e) {
    e.preventDefault();
    const { error } = await login(email, password);
    if (error) {
        alert(error.message);
    } 
  }
    
  return (
    <>
      <Button onClick={onOpen} colorScheme="messenger">
        Log In
      </Button>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Log In</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl>
              <FormLabel>Email</FormLabel>
              <Input
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              />
            </FormControl>

            <FormControl>
              <FormLabel>Password</FormLabel>
              <Input
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              />
            </FormControl>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={submitLogin}>
              Login
            </Button>
            <Button onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
