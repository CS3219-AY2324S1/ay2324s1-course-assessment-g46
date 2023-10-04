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
import { signIn } from "../../api/userClient";

export default function Login(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [show, setShow] = useState(false);

  const [missingEmail, setMissingEmail] = useState(false);
  const [missingPassword, setMissingPassword] = useState(false);
  const [invalidUser, setInvalidUser] = useState(false);

  async function submitLogin(e) {
    e.preventDefault();
    if (!validate()) {
      return;
    }
    try {
      const res = await signIn({ email: email, password: password });
      localStorage.setItem("token", res.data.access_token);
      props.setLoggedIn(true);
    } catch (error) {
      setInvalidUser(true);
      console.log(error);
    }
  }

  function validate() {
    resetValidation();
    let valid = true;
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
    setMissingEmail(false);
    setMissingPassword(false);
    setInvalidUser(false);
  }

  return (
    <>
      <FormControl isInvalid={missingEmail}>
        <FormLabel>Email</FormLabel>
        <Input
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        {missingEmail && <FormErrorMessage>Invalid Email.</FormErrorMessage>}
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
          <FormErrorMessage>Password cannot be empty.</FormErrorMessage>
        )}
      </FormControl>

      {invalidUser && <Text color="red">Invalid email or password.</Text>}

      <Button colorScheme="blue" mr={3} onClick={submitLogin} w="100%">
        Login
      </Button>
    </>
  );
}
