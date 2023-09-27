import { Box, Flex } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import Navbar from "./feature/navigation/Navbar";
import Home from "./feature/page/Home";
import Work from "./feature/page/Work";
import { Box, Flex } from "@chakra-ui/react";
import { supabase } from "./supabaseClient";
import { useAuth } from "./context/AuthProvider";
import "./App.css";

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
      <Navbar
        auth={auth}
        // setLoggedIn={setLoggedIn}
        isHomePage={isHomePage()}
        goHome={() => setQuestionId(-1)}
      />
      <Box flex="1">
        {isHomePage() ? (
          <Home attemptQuestion={setQuestionId} />
        ) : (
          <Work questionId={questionId} />
        )}
      </Box>
    </Flex>
  );
}

export default App;
