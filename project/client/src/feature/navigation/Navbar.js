import React from "react";
import LoginOptions from "../profile/LoginOptions";
import { Box, Flex, Spacer, Text } from "@chakra-ui/react";

export default function Navbar(props) {
  return (
    <>
      <Flex
        direction={"row"}
        spacing={4}
        mx={10}
        py={2}
        alignItems="center"
        height="80px"
      >
        <Box>
          <Text fontSize="lg" as="b" color="#006AFF">
            Peerprep
          </Text>
        </Box>
        <Spacer />
        <Box>
          {props.loggedIn && <LoginOptions setLoggedIn={props.setLoggedIn} />}
        </Box>
      </Flex>
    </>
  );
}
