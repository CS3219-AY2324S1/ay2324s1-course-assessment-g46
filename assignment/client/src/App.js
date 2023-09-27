import { Box, Flex } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import "./App.css";
import { getQuestions } from "./api/questionClient";
import Navbar from "./feature/navigation/Navbar";
import Home from "./feature/page/Home";
import Work from "./feature/page/Work";
import { Box, Flex } from "@chakra-ui/react";
import { supabase } from "./supabaseClient";
import { useAuth } from "./context/AuthProvider";

function App() {
  //   const [isLoggedIn, setLoggedIn] = useState(false);
  //   const [isLoggedIn, setLoggedIn] = useState(false);
  const { auth } = useAuth();
  const [question, setQuestion] = useState(-1);
  const [questions, setQuestions] = useState([]);
  //   const [session, setSession] = useState(null);

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

  useEffect(() => {
    console.log("Getting questions");
    getQuestions()
      .then((data) => {
        setQuestions(data);
      })
      .catch((err) => {
        console.error(err);
      });
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
        auth={auth}
        // setLoggedIn={setLoggedIn}
        isHomePage={isHomePage()}
        goHome={() => setQuestion(-1)}
      />
      <Box flex="1">
        {isHomePage() ? (
          <Home questions={questions} attemptQuestion={setQuestion} />
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
