import React from "react";
import QuestionTable from "../questions/QuestionTable";
import AddQuestion from "../questions/AddQuestion";
import Match from "../match/match";
import { Text, Flex } from "@chakra-ui/react";

export default function Home(props) {
  return (
    <>
      <Flex justifyContent="space-between" alignItems="center" mx={10} my={3}>
        <Text as="b">Questions</Text>
        <Match />
        <AddQuestion />
      </Flex>
      <QuestionTable {...props} />
    </>
  );
}
