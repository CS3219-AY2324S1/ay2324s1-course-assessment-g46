import React from "react";
import Login from "../profile/Login";
import LoginOptions from "../profile/LoginOptions";
import { Box, Flex, Icon, Spacer } from "@chakra-ui/react";
import Signup from "../profile/Signup";
import { MdHome } from "react-icons/md";

export default function Navbar(props) {
  return (
    <>
      <Flex direction={"row"} spacing={4} mx={10} py={2} alignItems="center">
        <Box>
          <Icon
            as={MdHome}
            boxSize={6}
            onClick={props.goHome}
            _hover={{ cursor: "pointer" }}
          />
        </Box>
        <Spacer />
        <Box>
          {props.auth ? (
            <LoginOptions />
          ) : (
            <>
              <Login />
              <Signup />
            </>
          )}
        </Box>
      </Flex>
    </>
  );
}
