import React from "react";
import Login from "../profile/Login";
import LoginOptions from "../profile/LoginOptions";
import { Box, Flex, Icon, Spacer, Text } from "@chakra-ui/react";
import Signup from "../profile/Signup";
import { MdHome } from "react-icons/md";

export default function Navbar(props) {
  return (
    <>
      <Flex direction={"row"} spacing={4} mx={10} py={2} alignItems="center">
        <Box>
          <Text fontSize="lg" as="b" color="#006AFF">
            Peerprep
          </Text>
        </Box>
        <Spacer />
        <Box>
          {props.loggedIn ? (
            <LoginOptions setLoggedIn={props.setLoggedIn}/>
          ) : (
            <>
              <Login setLoggedIn={props.setLoggedIn}/>
              <Signup setLoggedIn={props.setLoggedIn}/>
            </>
          )}
        </Box>
      </Flex>
    </>
  );
}
