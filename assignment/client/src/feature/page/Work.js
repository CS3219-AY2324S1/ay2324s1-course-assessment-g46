import React from "react";
import WorkTools from "../navigation/WorkTools";
import Editor from "../editor/Editor";
import { Box, Flex } from "@chakra-ui/react";

export default function Work(props) {
  return (
    <Flex height="100%" py={0.5} background="#e0e3eb">
      <WorkTools {...props} />
      <Box flex="1" background="white" m={0.5} borderRadius={5}>
        <Editor />
      </Box>
    </Flex>
  );
}
