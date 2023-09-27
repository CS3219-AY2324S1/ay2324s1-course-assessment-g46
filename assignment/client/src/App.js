import { Box, Flex } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import Navbar from "./feature/navigation/Navbar";
import Home from "./feature/page/Home";
import Work from "./feature/page/Work";
import { supabase } from "./supabaseClient";
import { useAuth } from "./context/AuthProvider";
import "./App.css";
import Workbar from "./feature/navigation/Workbar";

function App() {
  //   const [isLoggedIn, setLoggedIn] = useState(false);
  //   const [isLoggedIn, setLoggedIn] = useState(false);
  const { auth } = useAuth();
  const [question, setQuestion] = useState(-1);
  const [questions, setQuestions] = useState([]);
  //   const [session, setSession] = useState(null);
  const [isLoggedIn, setLoggedIn] = useState(false);
  const [questionId, setQuestionId] = useState(-1);

  //   useEffect(() => {
  // const loggedIn = JSON.parse(localStorage.getItem("loggedIn"));

  // if (loggedIn) {
  //   setLoggedIn(true);
  // } else {
  //   setLoggedIn(false);
  // }

  //     supabase.auth.getSession().then(({ data: {session} }) => {
  //         localStorage.setItem("session", JSON.stringify(session))
  //     })

  //     supabase.auth.onAuthStateChange((event, session) => {
  //         if (event === "SIGNED_IN") {
  //             localStorage.setItem("session", JSON.stringify(session))
  //             localStorage.setItem("loggedIn", JSON.stringify(true))
  //         } else if (event === "SIGNED_OUT") {
  //             localStorage.setItem("session", JSON.stringify(null))
  //             localStorage.setItem("loggedIn", JSON.stringify(false))
  //         }

  //     })
  //   }, []);

  function isHomePage() {
    return questionId === -1;
  }

  return (
    <Flex height="$100vh" flexDirection="column">
      {isHomePage() ? (
        <>
          <Navbar isLoggedIn={isLoggedIn} setLoggedIn={setLoggedIn} />
          <Box flex="1">
            <Home attemptQuestion={setQuestionId} />
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
