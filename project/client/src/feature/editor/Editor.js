import { Stack, Select, HStack, AlertTitle } from "@chakra-ui/react";
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
      <HStack p={2}>
        <Select
          value={language}
          onChange={(e) => setLanguage(e.target.value)}
          width="10%"
        >
          {languageOptions.map((language) => (
            <option value={language.value}>{language.label}</option>
          ))}
        </Select>
        {isDisconnected ? (
          <Alert status="error" justifyContent="center">
            <AlertIcon />
            The other collaborator has disconnected.
          </Alert>
        ) : null}
      </HStack>
      <MonacoEditor language={language} value={codeContent} onChange={update} />
    </Stack>
  );
}

const languageOptions = [
  {
    label: "C++",
    value: "cpp",
  },
  {
    label: "C",
    value: "c",
  },
  {
    label: "C#",
    value: "csharp",
  },
  {
    label: "Java",
    value: "java",
  },
  {
    label: "JavaScript",
    value: "javascript",
  },
  {
    label: "Python",
    value: "python",
  },
  {
    label: "Go",
    value: "go",
  },
];
