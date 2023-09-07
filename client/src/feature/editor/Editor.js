import { Box, Textarea } from "@chakra-ui/react";
import React from "react";

export default function Editor(props) {
  return (
    <Box p={3} height="100%">
      <Textarea placeholder="Write code here" height="100%" />
    </Box>
  );
}
