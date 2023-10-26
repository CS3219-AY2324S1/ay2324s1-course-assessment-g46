import { Stack, Textarea } from "@chakra-ui/react";
import { Alert, AlertIcon } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";

export default function Editor(props) {
  const [codeContent, setCodeContent] = useState("");
  const [isDisconnected, setIsDisconnected] = useState(false);

  let roomName = props.roomName;
  let socket = props.socket;

  function onUpdateCode(code) {
    setCodeContent(code);
  }

  function updateDisconnect() {
    setIsDisconnected(true);
  }
  
  useEffect( () => {
    socket.on("updateCode", onUpdateCode);
    socket.on("warnDisconnect", updateDisconnect);

    return () => {
      socket.off("updateCode", onUpdateCode);
      socket.off("warnDisconnect", updateDisconnect);
      socket.disconnect();
    };
  }, []);

  function update(e) {
    setCodeContent(e.target.value);
    socket.emit("sendCode", roomName, e.target.value);
  }

  return (
    <Stack spacing={0} height="100%">
      {isDisconnected ? (<Alert status='error'>
        <AlertIcon /> The other collaborator has disconnected.
      </Alert>) : null}
      <Textarea 
        placeholder="Write code here" 
        value={codeContent} 
        onChange={update} 
        height="100%" 
      />
    </Stack>
  );
}
