import { Stack, Tag, Text, Wrap } from "@chakra-ui/react";
import React from "react";
import Markdown from "react-markdown";

export default function Question(props) {
  const { title, description, category, complexity } = props.question.question[0];

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
          {title}
        </Text>
        <Wrap spacing={4}>
          {category.map((c, index) => (
            <Tag key={index}>{c}</Tag>
          ))}
        </Wrap>
        <Text color={getComplexity()}>{complexity}</Text>
        <Markdown>{description}</Markdown>
      </Stack>
    </>
  );
}
