import React from "react";
import EditQuestion from "./EditQuestion";
import ReadQuestion from "./ReadQuestion";
import DeleteQuestion from "./DeleteQuestion";
import { HStack, Tag, Td, Tr } from "@chakra-ui/react";

export default function QuestionTableRow(props) {
  function truncate(str) {
    return str.length > 50 ? str.substring(0, 50) + "..." : str;
  }

  return (
    <Tr>
      <Td>{props.id}</Td>
      <Td>
        <ReadQuestion {...props} />
      </Td>
      <Td>{truncate(props.description)}</Td>
      <Td>
        <HStack spacing={4}>
          {props.category.length <= 3 ? (
            props.category.map((c) => <Tag>{c}</Tag>)
          ) : (
            <>
              <Tag>{props.category[0]}</Tag>
              <Tag>{props.category[1]}</Tag>
              <Tag>{props.category.length - 2}+</Tag>
            </>
          )}
        </HStack>
      </Td>
      <Td>{props.complexity}</Td>
      <Td>
        <EditQuestion {...props} questions={props.questions} />
      </Td>
      <Td>
        <DeleteQuestion {...props} />
      </Td>
    </Tr>
  );
}
