import React, { useState, useEffect } from "react";
import Question from "../tools/Question";
import Chat from "../tools/Chat";
import { VStack, Flex, Box, IconButton } from "@chakra-ui/react";
import QuestionList from "../tools/QuestionList";
import {
  MdChatBubbleOutline,
  MdList,
  MdPsychology,
  MdQuestionMark,
} from "react-icons/md";
import Console from "../tools/Console";

export default function WorkTools(props) {
  const [curTool, setTool] = useState("list");
  const [messages, setMessages] = useState([]);

  const socket = props.socket;

  function onReceiveMessage(message) {
    setMessages((old) => [...old, { fromSelf: false, text: message }]);
  }

  function onUpdateConsole(execution) {
    props.setOutput(execution);
  }

  useEffect(() => {
    socket.on("receiveMessage", onReceiveMessage);
  }, []);

  useEffect(() => {
    socket.on("updateConsole", onUpdateConsole);
  }, []);

  function toggleTool(tool) {
    if (tool === curTool) {
      setTool("");
    } else {
      setTool(tool);
    }
  }

  function renderTool() {
    switch (curTool) {
      case "question":
        return <Question question={props.question} />;
      case "chat":
        return (
          <Chat
            roomName={props.roomName}
            socket={props.socket}
            messages={messages}
            setMessages={setMessages}
          />
        );
      case "list":
        return <QuestionList />;
      case "console":
        return <Console output={props.codeOutput} />;
      default:
        return null;
    }
  }

  return (
    <Flex>
      <VStack p={2} m={0.5} background="white" borderRadius={5}>
        <IconButton
          icon={<MdQuestionMark />}
          onClick={() => toggleTool("question")}
        />
        <IconButton
          icon={<MdChatBubbleOutline />}
          onClick={() => toggleTool("chat")}
        />
        <IconButton icon={<MdList />} onClick={() => toggleTool("list")} />
        <IconButton
          icon={<MdPsychology />}
          onClick={() => toggleTool("console")}
        />
      </VStack>

      {curTool === "" ? null : (
        <Box width="25vw" p={3} m={0.5} background="white" borderRadius={5}>
          {renderTool()}
        </Box>
      )}
    </Flex>
  );
}
