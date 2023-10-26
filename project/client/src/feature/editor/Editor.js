import { Stack, Select, HStack, Button, Flex, Spinner } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { Editor as MonacoEditor } from "@monaco-editor/react";
import { getId, languageOptions } from "../../constants/langauges";
import { getSubmission, postSubmission } from "../../api/codeExecutionClient";
import { MdOutlineError } from "react-icons/md";

export default function Editor(props) {
  const [codeContent, setCodeContent] = useState("");
  const [isDisconnected, setIsDisconnected] = useState(false);
  const [language, setLanguage] = useState("python");
  const [isLoading, setIsLoading] = useState(false);

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
    setIsLoading(true);
    try {
      let languageId = getId(language);
      let submission = await postSubmission(languageId, codeContent, "", "");
      props.setOutput(submission);
    } catch (e) {
      console.log(e);
    } finally {
      setIsLoading(false);
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

        {isLoading && <Spinner />}
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
