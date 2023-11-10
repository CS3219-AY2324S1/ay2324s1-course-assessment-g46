import React, { useEffect, useState } from "react";
import QuestionTable from "../questions/QuestionTable";
import AddQuestion from "../questions/AddQuestion";
import Match from "../match/match";
import { Text, Flex } from "@chakra-ui/react";
import { getQuestions } from "../../api/questionClient";

export default function Home(props) {
  // const [questions, setQuestions] = useState([]);

  // const updateQuestionsList = async () => {
  //   try {
  //     let data = await getQuestions();
  //     setQuestions(data);
  //   } catch (error) {
  //     setQuestions([]);
  //     console.log(error);
  //   }
  // };

  // useEffect(() => {
  //   updateQuestionsList();
  // }, []);

  return (
    <>
      <Flex justifyContent="space-between" alignItems="center" mx={10} my={3}>
        <Text as="b">Questions</Text>
        <Match />
        <AddQuestion
          updateQuestionsList={props.updateQuestionsList}
          questions={props.questions}
        />
      </Flex>
      <QuestionTable
        questions={props.questions}
        updateQuestionsList={props.updateQuestionsList}
        attemptQuestion={props.attemptQuestion}
      />
    </>
  );
}
