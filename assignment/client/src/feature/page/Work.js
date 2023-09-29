import React, { useEffect, useState } from "react";
import WorkTools from "../navigation/WorkTools";
import Editor from "../editor/Editor";
import { Box, Flex } from "@chakra-ui/react";
import { getQuestion } from "../../api/questionClient";

export default function Work(props) {
  const [question, setQuestion] = useState({});

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

  return (
    <Flex height="100%" py={0.5} background="#e0e3eb">
      <WorkTools question={question} />
      <Box flex="1" background="white" m={0.5} borderRadius={5}>
        <Editor />
      </Box>
    </Flex>
  );
}
