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
import React, { useState } from "react";
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
  const [err, setErr] = useState("");

  async function submitSignup(e) {
    e.preventDefault();
    if (!validate()) {
      return;
    }

    const {data, error} = await signUp({
      email: email,
      password: password,
      fullName: fullName,
    });

    if (error != null) {
      setErr(error.message);
    } else {
      props.toggleLoginSignup();
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
    setErr("");
  }

  function handleKeyDown(e) {
    if (e.key === "Enter") {
      submitSignup(e);
    }
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
          onKeyDown={handleKeyDown}
        />
        {missingName && <FormErrorMessage>{EMPTY_NAME}</FormErrorMessage>}
      </FormControl>

      <FormControl isInvalid={missingEmail}>
        <FormLabel>Email</FormLabel>
        <Input
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          onKeyDown={handleKeyDown}
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
            onKeyDown={handleKeyDown}
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

      {err.length != 0 && <Text color="red">{err}.</Text>}

      <Button colorScheme="blue" mr={3} onClick={submitSignup} w="100%">
        Sign Up
      </Button>
    </>
  );
}
