import {
  Stack,
  Select,
  HStack,
  Button,
  Flex,
  Spinner,
  Spacer, 
  AlertDialog,
  AlertDialogOverlay,
  AlertDialogHeader,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  useDisclosure
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { Editor as MonacoEditor } from "@monaco-editor/react";
import { getId, languageOptions } from "../../constants/langauges";
import { postSubmission } from "../../api/codeExecutionClient";
import { MdOutlineError } from "react-icons/md";
import { insertNewAttempt } from "../../api/userClient";

export default function Editor(props) {
  const [codeContent, setCodeContent] = useState("");
  const [isDisconnected, setIsDisconnected] = useState(false);
  const [language, setLanguage] = useState("javascript");
  const [isLoading, setIsLoading] = useState(false);
  const {isOpen, onOpen, onClose} = useDisclosure();

  const token = localStorage.getItem("token");

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

    try {
      await insertNewAttempt(token, { question_id: props.questionId });
    } catch (e) {
      console.log(e);
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

  async function completeQuestion() {
    const token = localStorage.getItem("token");
    const { data, error } = await insertNewAttempt(token, {questionId: props.questionId});
    if (error != null) {
      console.log(data);
      console.log(error);
    }
    onClose();
  }

  return (
    <>
      <AlertDialog
        isOpen={isOpen}
        onClose={onClose}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize='lg' fontWeight='bold'>
              Mark as complete
            </AlertDialogHeader>

            <AlertDialogBody>
              Are you sure you want to mark this question as complete? You cannot undo this.
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button onClick={onClose}>
                Cancel
              </Button>
              <Button colorScheme='red' onClick={completeQuestion}>
                Mark as done
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
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

          <Spacer />
          <Button colorScheme="red" onClick={onOpen} >Mark as done</Button>

        </HStack>
        <MonacoEditor language={language} value={codeContent} onChange={update} />
      </Stack>
    </>
  );
}
