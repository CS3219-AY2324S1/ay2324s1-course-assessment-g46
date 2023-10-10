import React, { useEffect, useState } from "react";
import QuestionTable from "../questions/QuestionTable";
import AddQuestion from "../questions/AddQuestion";
import Match from "../match/match";
import {
  Text,
  Flex,
  Center,
  AbsoluteCenter,
  VStack,
  Button,
  Divider,
  Box,
  HStack,
} from "@chakra-ui/react";
import { getQuestions } from "../../api/questionClient";
import Login from "../profile/Login";
import Signup from "../profile/Signup";

export default function Home(props) {
  const [questions, setQuestions] = useState([]);
  const [loginPage, setLoginPage] = useState(true);

  const updateQuestionsList = async () => {
    try {
      let data = await getQuestions();
      setQuestions(data);
    } catch (error) {
      setQuestions([]);
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
