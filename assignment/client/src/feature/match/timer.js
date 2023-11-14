import React, { useState, useEffect } from "react";

import { Text } from "@chakra-ui/react";

export default function Timer(props) {
  const [timeLeft, setTimeLeft] = useState(props.duration);

  let interval;

  useEffect(() => {
    interval = setInterval(() => {
      if (timeLeft <= 0) {
        clearInterval(interval);
        return;
      }
      setTimeLeft((old) => old - 1);
    }, 1000);
  }, [])

  return (<Text>{timeLeft}</Text>);
}