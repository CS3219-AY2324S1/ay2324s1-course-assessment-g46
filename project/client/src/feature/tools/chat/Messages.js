import React, { useEffect, useRef } from "react";

import { Flex, Text } from "@chakra-ui/react";

export default function Messages(props) {
  function AlwaysScrollToBottom() {
    const elementRef = useRef();
    useEffect(() => elementRef.current.scrollIntoView());
    return <div ref={elementRef} />;
  }

  return (
    <Flex overflowY="auto" flexDirection="column" marginBottom={3}>
      {props.messages.map((message, index) => {
        let sender = "Them: ";
        if (message.fromSelf) {
          sender = "You: ";
        }
        return <Text key={index}>{sender + message.text}</Text>;
      })}
      <AlwaysScrollToBottom />
    </Flex>
  );
}
