import React, { useState } from "react";
import {
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  Text,
} from "@chakra-ui/react";
import { signUp } from "../../api/userClient";

export default function Signup(props) {
  const EMPTY_PASSWORD = "Password field is left empty";
  const EMPTY_NAME = "Fullname field is left empty";
  const INVALID_EMAIL = "Email address is invalid";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [show, setShow] = useState(false);

  const [missingName, setMissingName] = useState(false);
  const [missingEmail, setMissingEmail] = useState(false);
  const [missingPassword, setMissingPassword] = useState(false);
  const [userExists, setUserExists] = useState(false);

  async function submitSignup(e) {
    e.preventDefault();
    if (!validate()) {
      return;
    }

    try {
      await signUp({
        email: email,
        password: password,
        fullName: fullName,
      });
      props.toggleLoginSignup();
    } catch (error) {
      setUserExists(true);
      console.log(error);
    }
  }

  function validate() {
    resetValidation();
    let valid = true;
    if (fullName === "") {
      setMissingName(true);
      valid = false;
    }
    if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email)) {
      setMissingEmail(true);
      valid = false;
    }
    if (password === "") {
      setMissingPassword(true);
      valid = false;
    }
    return valid;
  }

  function resetValidation() {
    setMissingName(false);
    setMissingEmail(false);
    setMissingPassword(false);
    setUserExists(false);
  }

  return (
    <>
      <Text align="center" fontSize="lg" as="b">
        Sign Up
      </Text>
      <FormControl isInvalid={missingName}>
        <FormLabel>Full Name</FormLabel>
        <Input
          placeholder="Full Name"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
        />
        {missingName && <FormErrorMessage>{EMPTY_NAME}</FormErrorMessage>}
      </FormControl>

      <FormControl isInvalid={missingEmail}>
        <FormLabel>Email</FormLabel>
        <Input
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        {missingEmail && <FormErrorMessage>{INVALID_EMAIL}</FormErrorMessage>}
      </FormControl>

      <FormControl isInvalid={missingPassword}>
        <FormLabel>Password</FormLabel>
        <InputGroup>
          <Input
            placeholder="Password"
            value={password}
            type={show ? "text" : "password"}
            onChange={(e) => setPassword(e.target.value)}
          />
          <InputRightElement width="4.5rem">
            <Button h="1.75rem" size="sm" onClick={() => setShow(!show)}>
              {show ? "Hide" : "Show"}
            </Button>
          </InputRightElement>
        </InputGroup>
        {missingPassword && (
          <FormErrorMessage>{EMPTY_PASSWORD}</FormErrorMessage>
        )}
      </FormControl>

      {userExists && <Text color="red">User already exists.</Text>}

      <Button colorScheme="blue" mr={3} onClick={submitSignup} w="100%">
        Sign Up
      </Button>
    </>
  );
}
