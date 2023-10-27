import { Button, Flex, HStack, Select, Spinner, Stack } from "@chakra-ui/react";
import { Editor as MonacoEditor } from "@monaco-editor/react";
import React, { useEffect, useState } from "react";
import { MdOutlineError } from "react-icons/md";
import { postSubmission } from "../../api/codeExecutionClient";
import { getId, languageOptions } from "../../constants/langauges";

export default function Editor(props) {
  const [codeContent, setCodeContent] = useState("");
  const [isDisconnected, setIsDisconnected] = useState(false);
  const [language, setLanguage] = useState("javascript");
  const [isLoading, setIsLoading] = useState(false);

  let roomName = props.roomName;
  let socket = props.socket;

  function onUpdateCode(code) {
    setCodeContent(code);
  }

  function updateDisconnect() {
    setIsDisconnected(true);
  }

  function onUpdateLanguage(language) {
    setLanguage(language);
  }

  function switchLanguage(language) {
    setLanguage(language);
    socket.emit("sendLanguage", roomName, language);
  }

  async function runCode(e) {
    e.preventDefault();
    setIsLoading(true);
    try {
      let languageId = getId(language);
      let submission = await postSubmission(languageId, codeContent, "", "");
      props.setOutput(submission);
      socket.emit("sendConsole", roomName, submission);
    } catch (e) {
      console.log(e);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    socket.on("updateCode", onUpdateCode);
    socket.on("warnDisconnect", updateDisconnect);
    socket.on("updateLanguage", onUpdateLanguage);

    return () => {
      socket.off("updateCode", onUpdateCode);
      socket.off("warnDisconnect", updateDisconnect);
      socket.off("updateLanguage", onUpdateLanguage);
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
          onChange={(e) => switchLanguage(e.target.value)}
          width="150px"
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
