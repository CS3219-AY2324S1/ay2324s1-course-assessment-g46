import React, { useEffect, useState } from "react";
import WorkTools from "../navigation/WorkTools";
import Editor from "../editor/Editor";
import { Box, Flex } from "@chakra-ui/react";
import { getQuestion } from "../../api/questionClient";

import { io } from "socket.io-client";

const collabApi = process.env.COLLAB_API_URL || "34.121.234.55:8081";

const socket = io(collabApi);

export default function Work(props) {
  const [question, setQuestion] = useState({});
  const [output, setOutput] = useState({});

  useEffect(() => {
    if (props.questionId === -1) {
      setQuestion({});
    } else {
      getQuestion(props.questionId)
        .then((data) => {
          setQuestion(data);
        })
        .catch((err) => {
          console.error(err);
        });
    }
  }, [props.questionId]);

  useEffect(() => {
    socket.connect();
    socket.emit("joinRoom", props.roomName);
  }, []);

  return (
    <Flex height="100%" py={0.5} background="#e0e3eb">
      <WorkTools
        question={question}
        roomName={props.roomName}
        socket={socket}
        codeOutput={output}
        setOutput={setOutput}
      />
      <Box
        flex="1"
        background="white"
        m={0.5}
        borderRadius={5}
        overflow="hidden"
      >
        <Editor
          roomName={props.roomName}
          socket={socket}
          setOutput={setOutput}
          questionId={props.questionId}
        />
      </Box>
    </Flex>
  );
}
