import {
  FormControl,
  FormLabel,
  Stack,
  Textarea,
  Select,
  HStack,
  Text,
  Flex,
  Box,
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

  useEffect(() => {
    socket.on("updateCode", onUpdateCode);
    socket.on("warnDisconnect", updateDisconnect);

    return () => {
      socket.off("updateCode", onUpdateCode);
      socket.off("warnDisconnect", updateDisconnect);
      socket.disconnect();
    };
  }, []);

  useEffect(() => {
    console.log("ree");
  }, [props.toggle]);

  function update(value) {
    setCodeContent(value);
    socket.emit("sendCode", roomName, value);
  }

  return (
    <Stack spacing={0} height="100%">
      {isDisconnected ? (
        <Alert status="error">
          <AlertIcon /> The other collaborator has disconnected.
        </Alert>
      ) : null}
      <HStack p={2}>
        <Select
          value={language}
          onChange={(e) => setLanguage(e.target.value)}
          width="10%"
          size="sm"
        >
          <option value="cpp">C++</option>
          <option value="java">Java</option>
          <option value="javascript">Javascript</option>
          <option value="python">Python</option>
        </Select>
      </HStack>
      <MonacoEditor
        language={language}
        value={codeContent}
        onChange={update}
        // options={{ automaticLayout: true }}
      />
    </Stack>
  );
}
