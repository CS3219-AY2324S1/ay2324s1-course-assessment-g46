import React, { useEffect, useState } from "react";
import QuestionTable from "../questions/QuestionTable";
import AddQuestion from "../questions/AddQuestion";
import Match from "../match/match";
import { Text, Flex } from "@chakra-ui/react";
import { getQuestions } from "../../api/questionClient";

export default function Home(props) {
  const [questions, setQuestions] = useState([]);

  const updateQuestionsList = async () => {
    try {
      let data = await getQuestions();
      setQuestions(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    updateQuestionsList();
  }, []);

  return (
    <>
      <Flex justifyContent="space-between" alignItems="center" mx={10} my={3}>
        <Text as="b">Questions</Text>
        <Match />
        <AddQuestion
          updateQuestionsList={updateQuestionsList}
          questions={questions}
        />
      </Flex>
      <QuestionTable
        questions={questions}
        updateQuestionsList={updateQuestionsList}
        attemptQuestion={props.attemptQuestion}
      />
    </>
  );
}
