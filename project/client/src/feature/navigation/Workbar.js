import React from "react";
import { Box, Button, Flex } from "@chakra-ui/react";
import { MdOutlineWest } from "react-icons/md";

export default function Workbar(props) {
  return (
    <>
      <Flex direction={"row"} spacing={4} mx={10} py={2} alignItems="center">
        <Box>
          <Button
            leftIcon={<MdOutlineWest />}
            colorScheme="black"
            variant="link"
            size="sm"
            onClick={props.goHome}
          >
            Back
          </Button>
        </Box>
      </Flex>
    </>
  );
}
