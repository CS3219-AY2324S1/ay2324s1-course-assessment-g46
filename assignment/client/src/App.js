import React, { useEffect, useState } from "react";
import Navbar from "./feature/navigation/Navbar";
import Home from "./feature/page/Home";
import Work from "./feature/page/Work";
import "./App.css";
import Workbar from "./feature/navigation/Workbar";
import { Box, Flex } from "@chakra-ui/react";

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [questionId, setQuestionId] = useState(-1);
  const [questions, setQuestions] = useState([]);

  // useEffect(() => {
  //   const token = localStorage.getItem("token");
  //   if (token) {
  //     setLoggedIn(true);
  //   } else {
  //     setLoggedIn(false);
  //   }
  // }, []);

  useEffect(() => {
    const storedQns = localStorage.getItem("questions");
    if (storedQns === null) {
      setQuestions([]);
    } else {
      let qns = JSON.parse(storedQns);
      setQuestions(qns);
    }
  }, []);

  function updateQuestionsList(qn, del) {
    let filtered = questions.filter((x) => x.id !== qn.id);
    if (!del) {
      filtered.push(qn);
    }
    filtered.sort((a, b) => a.id - b.id);
    setQuestions(filtered);

    const stringifiedQns = JSON.stringify(filtered);
    localStorage.setItem("questions", stringifiedQns);
  }

  function isHomePage() {
    return questionId === -1;
  }

  return (
    <Flex height="$100vh" flexDirection="column">
      {isHomePage() ? (
        <>
          <Navbar loggedIn={loggedIn} setLoggedIn={setLoggedIn} />
          <Box flex="1">
            <Home
              attemptQuestion={setQuestionId}
              questions={questions}
              updateQuestionsList={updateQuestionsList}
            />
          </Box>
        </>
      ) : (
        <>
          <Workbar goHome={() => setQuestionId(-1)} />
          <Work questionId={questionId} questions={questions} />
        </>
      )}
    </Flex>
  );
}

export default App;
