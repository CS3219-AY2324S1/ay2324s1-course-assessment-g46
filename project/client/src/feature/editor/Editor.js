import {
  Stack,
  Select,
  HStack,
  AlertTitle,
  Button,
  Box,
  Flex,
} from "@chakra-ui/react";
import { Alert, AlertIcon } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { Editor as MonacoEditor } from "@monaco-editor/react";

export default function Editor(props) {
  const [codeContent, setCodeContent] = useState("");
  const [isDisconnected, setIsDisconnected] = useState(false);
  const [language, setLanguage] = useState("cpp");

  let roomName = props.roomName;
  let socket = props.socket;

  function onUpdateCode(code) {
    setCodeContent(code);
  }

  function updateDisconnect() {
    setIsDisconnected(true);
  }

  async function runCode(e) {
    e.preventDefault();
    try {
      let languageId = getId(language);
      let submission = await postSubmission(languageId, codeContent, "");
      // let result = await getSubmission(submission.token);
      parseExecution(submission);
    } catch (e) {
      console.log(e);
    }
  }

  function parseExecution(output) {
    if (output.stderr) {
      props.setOutput(output.stderr);
      props.setHasOutputErr(true);
    } else {
      props.setOutput(output.stdout);
      props.setHasOutputErr(false);
    }
  }

  useEffect(() => {
    socket.on("updateCode", onUpdateCode);
    socket.on("warnDisconnect", updateDisconnect);

    return () => {
      socket.off("updateCode", onUpdateCode);
      socket.off("warnDisconnect", updateDisconnect);
      socket.disconnect();
    };
  }, []);

  function update(value) {
    setCodeContent(value);
    socket.emit("sendCode", roomName, value);
  }

  return (
    <Stack spacing={0} height="100%">
      <HStack p={2}>
        <Select
          value={language}
          onChange={(e) => setLanguage(e.target.value)}
          width="10%"
        >
          {languageOptions.map((language) => (
            <option value={language.value} key={language.id}>
              {language.label}
            </option>
          ))}
        </Select>
        <Button onClick={(e) => runCode(e)}>Run Code</Button>
        <Flex flex="1" justifyContent="center">
          {isDisconnected ? (
            <Button
              leftIcon={<MdOutlineError color="red" />}
              colorScheme="red"
              variant="outline"
            >
              The other collaborator has disconnected.
            </Button>
          ) : null}
        </Flex>
      </HStack>
      <MonacoEditor language={language} value={codeContent} onChange={update} />
    </Stack>
  );
}
