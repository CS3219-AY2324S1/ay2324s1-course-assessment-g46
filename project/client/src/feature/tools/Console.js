import {
  Alert,
  AlertDescription,
  Box,
  Divider,
  HStack,
  Text,
} from "@chakra-ui/react";
import React from "react";

export default function Console(props) {
  let status = props.output.status || null;
  let stdout = props.output.stdout || null;
  let stderr = props.output.stderr || null;
  let time = props.output.time || null;
  let token = props.output.token || null;

  return (
    <>
      <Text fontSize="lg" paddingBottom={2}>
        Console
      </Text>
      <Divider />
      {token != null && (
        <>
          <HStack paddingBottom={2}>
            {status.description === "Accepted" ? (
              <Text color="green">{status.description}</Text>
            ) : (
              <Text color="red">{status.description}</Text>
            )}
            {time !== null && <Text color="gray">Runtime: {time} s</Text>}
          </HStack>
          {stderr !== null ? (
            <Alert status="error">
              <AlertDescription>{stderr}</AlertDescription>
            </Alert>
          ) : (
            <>
              <Text paddingBottom={2}>Input</Text>
              <Box bg="gray.100" borderRadius={10} p={3}>
                <pre>some input</pre>
              </Box>
              <br />
              <Text paddingBottom={2}>Stdout</Text>
              <Box bg="gray.100" borderRadius={10} p={3}>
                <pre>{stdout === null ? " " : stdout}</pre>
              </Box>
              <br />
              <Text paddingBottom={2}>Expected</Text>
              <Box bg="gray.100" borderRadius={10} p={3}>
                <pre>some expected output</pre>
              </Box>
            </>
          )}
        </>
      )}
    </>
  );
}
