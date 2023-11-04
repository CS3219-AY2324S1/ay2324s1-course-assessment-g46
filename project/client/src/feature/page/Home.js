import {
  AbsoluteCenter,
  Box,
  Button,
  Divider,
  Flex,
  HStack,
  Text,
  VStack,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { getQuestions } from "../../api/questionClient";
import Match from "../match/match";
import Login from "../profile/Login";
import Signup from "../profile/Signup";
import AddQuestion from "../questions/AddQuestion";
import QuestionTable from "../questions/QuestionTable";

// opening questions tab with this will result in error as this is not in db
const tempquestion = {
  id: 1,
  title: "title1",
  description: "desc1",
  category: ["cat1", "cat2"],
  complexity: "Easy",
};

export default function Home(props) {
  const [questions, setQuestions] = useState([]);
  const [loginPage, setLoginPage] = useState(true);

  const updateQuestionsList = async () => {
    try {
      let data = await getQuestions();
      let questions = data.questions;

      // sort question by created date
      questions.sort((a, b) => {
        return new Date(a.created_at) - new Date(b.created_at);
      });

      questions.forEach((q, i) => {
        q.id = i + 1;
      });
      setQuestions(questions);
    } catch (error) {
      console.log(error);
    }
  };

  const toggleLoginSignup = () => {
    setLoginPage((p) => !p);
  };

  useEffect(() => {
    updateQuestionsList();
  }, [props]);

  return props.loggedIn ? (
    <>
      <Flex justifyContent="space-between" alignItems="center" mx={10} my={3}>
        <Text as="b">Questions</Text>
        <Match
          setQuestionId={props.attemptQuestion}
          setRoomName={props.setRoomName}
        />
        {props.isAdmin ? (
          <AddQuestion
            updateQuestionsList={updateQuestionsList}
            questions={questions}
          />
        ) : (
          <Box />
        )}
      </Flex>
      <QuestionTable
        questions={questions}
        updateQuestionsList={updateQuestionsList}
        attemptQuestion={props.attemptQuestion}
        isAdmin={props.isAdmin}
      />
    </>
  ) : (
    <AbsoluteCenter>
      <VStack align="stretch" spacing={4}>
        {loginPage ? (
          <>
            <Login setLoggedIn={props.setLoggedIn} />
            <Box position="relative" padding="4">
              <Divider />
              <AbsoluteCenter bg="white" px="4">
                Or
              </AbsoluteCenter>
            </Box>
            <HStack alignSelf="center">
              <Text>Not a user?</Text>
              <Button variant="link" onClick={toggleLoginSignup}>
                signup
              </Button>
            </HStack>
          </>
        ) : (
          <>
            <Signup
              setLoggedIn={props.setLoggedIn}
              toggleLoginSignup={toggleLoginSignup}
            />
            <Box position="relative" padding="4">
              <Divider />
              <AbsoluteCenter bg="white" px="4">
                Or
              </AbsoluteCenter>
            </Box>
            <HStack alignSelf="center">
              <Text>Already a user?</Text>
              <Button variant="link" onClick={toggleLoginSignup}>
                login
              </Button>
            </HStack>
          </>
        )}
      </VStack>
    </AbsoluteCenter>
  );
}
