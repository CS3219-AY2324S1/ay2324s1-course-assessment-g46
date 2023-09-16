import React from "react";
import EditQuestion from "./EditQuestion";
import ReadQuestion from "./ReadQuestion";
import DeleteQuestion from "./DeleteQuestion";
import { Td, Tr } from "@chakra-ui/react";

export default function QuestionTableRow(props) {
  return (
    <Tr>
      <Td>{props.id}</Td>
      <Td>
        <ReadQuestion {...props} />
      </Td>
      <Td>{props.description}</Td>
      <Td>{props.category}</Td>
      <Td>{props.complexity}</Td>
      <Td>
        <EditQuestion {...props} />
      </Td>
      <Td>
        <DeleteQuestion />
      </Td>
    </Tr>
  );
}
