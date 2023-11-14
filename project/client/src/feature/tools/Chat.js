import React, { useState } from "react";

import { Button, Flex, Input } from "@chakra-ui/react";

import Messages from "./chat/Messages";

export default function Chat(props) {
  const [sendMessage, setSendMessage] = useState("");

  const setMessages = props.setMessages;

  const roomName = props.roomName;
  const socket = props.socket;

  function handleSendMessage() {
    if (sendMessage === "") {
      return;
    }
    socket.emit("sendMessage", roomName, sendMessage);
    setMessages((old) => [...old, { fromSelf: true, text: sendMessage }]);
    setSendMessage("");
  }

  return (
    <Flex flexDir="column" h="100%" justifyContent="space-between">
      <Messages messages={props.messages} />
      <Flex>
        <Input
          placeholder="Type message here"
          value={sendMessage}
          onChange={(e) => setSendMessage(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleSendMessage();
            }
          }}
        />
        <Button onClick={handleSendMessage}>Send</Button>
      </Flex>
    </Flex>
  );
}
