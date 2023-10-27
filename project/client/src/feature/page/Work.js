import { Box, Flex } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { getQuestion } from "../../api/questionClient";
import Editor from "../editor/Editor";
import WorkTools from "../navigation/WorkTools";

import { io } from "socket.io-client";
import Question from "../tools/Question";

const collabApi = process.env.COLLAB_API_URL || "http://localhost:8081";

const socket = io(collabApi);

const questionTemplate = {
  title: "",
  description: "",
  category: [],
  complexity: "",
};

export default function Work(props) {
  const [question, setQuestion] = useState(questionTemplate);
  const [output, setOutput] = useState({});

  useEffect(() => {
    if (props.questionId === -1) {
      setQuestion({});
    } else {
      getQuestion(props.questionId)
        .then((data) => {
          console.log(data);
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
      <Box
        flex="1"
        background="white"
        m={0.5}
        borderRadius={10}
        overflow="hidden"
      >
        <Question question={question} />
      </Box>
      <Box
        flex="1"
        background="white"
        m={0.5}
        borderRadius={10}
        overflow="hidden"
      >
        <Editor
          roomName={props.roomName}
          socket={socket}
          setOutput={setOutput}
        />
      </Box>
    </Flex>
  );

  // return (
  //   <Flex height="100%" py={0.5} background="#e0e3eb">
  //     <WorkTools
  //       question={question}
  //       roomName={props.roomName}
  //       socket={socket}
  //       codeOutput={output}
  //       setOutput={setOutput}
  //     />
  //     <Flex>
  //       <Box></Box>

  //     </Flex>
  //     <Box
  //       flex="1"
  //       background="white"
  //       m={0.5}
  //       borderRadius={5}
  //       overflow="hidden"
  //     >
  //       <Editor
  //         roomName={props.roomName}
  //         socket={socket}
  //         setOutput={setOutput}
  //       />
  //     </Box>
  //   </Flex>
  // );
}
