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

export default function Signup(props) {
  const EMPTY_EMAIL = "Email field is left empty"
  const EMPTY_PASSWORD = "Password field is left empty"
  const EMPTY_NAME = "Fullname field is left empty"
  const INVALID_EMAIL = "Email address is invalid"

  const { isOpen, onOpen, onClose } = useDisclosure();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const { signup } = useAuth(); 

  async function submitSignup(e) {
    e.preventDefault();

    // Check if email address and password are valid 
    if (email.length == 0) {
      alert(EMPTY_EMAIL);
    }
    if (password.length == 0) {
      alert(EMPTY_PASSWORD);
    }
    if (fullName.length == 0) {
      alert(EMPTY_NAME);
    }
    if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email)) {
      alert(INVALID_EMAIL);
    }

    const { error } = await signup(email, password, fullName);
    if (error) {
      alert(error.message)
    } 
}

  return (
    <>
      <Button onClick={onOpen} ml={3}>
        Sign Up
      </Button>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Sign Up</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl>
              <FormLabel>Full Name</FormLabel>
              <Input
                placeholder="Full Name"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
              />
            </FormControl>

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
            <Button colorScheme="blue" mr={3} onClick={submitSignup}>
              Sign Up
            </Button>
            <Button onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
