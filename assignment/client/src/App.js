import React, { useEffect, useState } from "react";
import Navbar from "./feature/navigation/Navbar";
import Home from "./feature/page/Home";
import Work from "./feature/page/Work";
import "./App.css";
import Workbar from "./feature/navigation/Workbar";
import { Box, Flex } from "@chakra-ui/react";

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [questionId, setQuestionId] = useState(-1);

  useEffect(() => {
    const admin = localStorage.getItem("admin");
    setIsAdmin(admin === "admin");
    const token = localStorage.getItem("token");
    if (token) {
      setLoggedIn(true);
    } else {
      setLoggedIn(false);
    }
  }, []);

  useEffect(() => {
    const admin = localStorage.getItem("admin");
    setIsAdmin(admin === "admin");
  }, [loggedIn]);

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
              loggedIn={loggedIn}
              setLoggedIn={setLoggedIn}
              isAdmin={isAdmin}
            />
          </Box>
        </>
      ) : (
        <>
          <Workbar goHome={() => setQuestionId(-1)} />
          <Work questionId={questionId} />
        </>
      )}
    </Flex>
  );
}

export default App;
