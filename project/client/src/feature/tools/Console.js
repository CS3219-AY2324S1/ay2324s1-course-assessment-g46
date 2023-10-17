import { Alert, AlertDescription, Box, Text } from "@chakra-ui/react";
import React from "react";

export default function Console(props) {
  return (
    <>
      <Text fontSize="lg" paddingBottom={2}>
        Console
      </Text>
      {props.hasOutputErr ? (
        <>
          <Text color="red" paddingBottom={2}>
            Runtime Error
          </Text>
          <Alert status="error">
            <AlertDescription>{props.output}</AlertDescription>
          </Alert>
        </>
      ) : props.output !== "" ? (
        <>
          <Text paddingBottom={2}>Stdout</Text>
          <Box bg="gray.100" borderRadius={10} p={3}>
            <pre>{props.output}</pre>
          </Box>
        </>
      ) : (
        <></>
      )}
    </>
  );
}
