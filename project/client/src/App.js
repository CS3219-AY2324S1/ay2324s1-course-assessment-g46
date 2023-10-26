import React, { useEffect, useState } from "react";
import Navbar from "./feature/navigation/Navbar";
import Home from "./feature/page/Home";
import Work from "./feature/page/Work";
import "./App.css";
import Workbar from "./feature/navigation/Workbar";
import { Box } from "@chakra-ui/react";

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [questionId, setQuestionId] = useState(-1);
  const [roomName, setRoomName] = useState("");

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
    <Box height="100vh">
      {isHomePage() ? (
        <>
          <Navbar loggedIn={loggedIn} setLoggedIn={setLoggedIn} />
          <Box height="calc(100vh - 60px)">
            <Home
              attemptQuestion={setQuestionId}
              loggedIn={loggedIn}
              setLoggedIn={setLoggedIn}
              isAdmin={isAdmin}
              setRoomName={setRoomName}
            />
          </Box>
        </>
      ) : (
        <>
          <Workbar goHome={() => setQuestionId(-1)} />
          <Box height="calc(100vh - 40px)">
            <Work questionId={questionId} roomName={roomName} />
          </Box>
        </>
      )}
    </Box>
  );
}

export default App;
