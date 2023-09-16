import React, { useState } from "react";
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

export default function WorkTools(props) {
  const [curTool, setTool] = useState("");

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
        return <Question {...props} />;
      case "chat":
        return <Chat />;
      case "list":
        return <QuestionList />;
      case "ai":
        return <p>ai</p>;
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
        <IconButton icon={<MdPsychology />} onClick={() => toggleTool("ai")} />
      </VStack>

      {curTool === "" ? null : (
        <Box w="25vw" p={2} m={0.5} background="white" borderRadius={5}>
          {renderTool()}
        </Box>
      )}
    </Flex>
  );
}
