import { HStack, Stack, Tag, Text, Wrap } from "@chakra-ui/react";
import React from "react";

export default function Question(props) {
  const { id, title, description, category, complexity } = props.question;

  function getComplexity() {
    if (complexity === "Easy") {
      return "green";
    }
    if (complexity === "Medium") {
      return "tomato";
    }
    if (complexity === "Hard") {
      return "red";
    }
  }

  return (
    <>
      <Stack spacing={4}>
        <Text fontSize="lg">
          {id}. {title}
        </Text>
        <Wrap spacing={4}>
          {category.map((c) => (
            <Tag key={c}>{c}</Tag>
          ))}
        </Wrap>
        <Text color={getComplexity()}>{complexity}</Text>
        <Text>{description}</Text>
      </Stack>
    </>
  );
}
