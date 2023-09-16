import React, { useEffect, useState } from "react";
import "./App.css";
import Navbar from "./feature/navigation/Navbar";
import Home from "./feature/page/Home";
import Work from "./feature/page/Work";
import { Box, Flex } from "@chakra-ui/react";

function App() {
  const [isLoggedIn, setLoggedIn] = useState(false);
  const [question, setQuestion] = useState(-1);

  useEffect(() => {
    const loggedIn = JSON.parse(localStorage.getItem("loggedIn"));
    if (loggedIn) {
      setLoggedIn(true);
    } else {
      setLoggedIn(false);
    }
  }, []);

  function isHomePage() {
    return question === -1;
  }

  function getQuestion() {
    if (question !== -1) {
      return tempQuestions[question - 1];
    }
    return {};
  }

  return (
    <Flex height="$100vh" flexDirection="column">
      <Navbar
        isLoggedIn={isLoggedIn}
        setLoggedIn={setLoggedIn}
        isHomePage={isHomePage()}
        goHome={() => setQuestion(-1)}
      />
      <Box flex="1">
        {isHomePage() ? (
          <Home questions={tempQuestions} attemptQuestion={setQuestion} />
        ) : (
          <Work question={getQuestion()} />
        )}
      </Box>
    </Flex>
  );
}

export default App;

const tempQuestions = [
  {
    id: 1,
    title: "Reverse a String",
    description: "reverse string question",
    category: ["String, Algorithms"],
    complexity: "Easy",
  },
  {
    id: 2,
    title: "Linked List Cycle Detection",
    description: "ll cycle question",
    category: ["Data Structures", "Algorithms"],
    complexity: "Easy",
  },
  {
    id: 3,
    title: "Roman to Integer",
    description: "Roman to Integer question",
    category: ["Data Structures"],
    complexity: "Easy",
  },
];
