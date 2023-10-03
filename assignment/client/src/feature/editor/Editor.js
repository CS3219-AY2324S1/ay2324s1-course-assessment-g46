import { Box, Textarea } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";

import { io } from "socket.io-client";

const collabApi =
  process.env.COLLAB_API_URL || "http://localhost:8081";

const socket = io(collabApi);

export default function Editor(props) {
  const [codeContent, setCodeContent] = useState("");

  let roomName = props.roomName;

  function onUpdateCode(code) {
    setCodeContent(code);
  }
  
  useEffect( () => {
    socket.connect();
    socket.on("updateCode", onUpdateCode);
    socket.emit("joinRoom", roomName);

    return () => {
      socket.off("updateCode", onUpdateCode);
      socket.disconnect();
    };
  }, []);

  function update(e) {
    setCodeContent(e.target.value);
    socket.emit("sendCode", roomName, e.target.value);
  }

  return (
    <Box p={3} height="100%">
      <Textarea 
        placeholder="Write code here" 
        value={codeContent} 
        onChange={update} 
        height="100%" 
      />
    </Box>
  );
}
