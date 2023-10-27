import React from "react";
import ReadQuestion from "./ReadQuestion";
import { Td, Tr } from "@chakra-ui/react";

export default function HistoryTableRow(props) {
  console.log(props);
  return (
    <Tr height="60px">
      <Td width="100px">{props.id}</Td>
      <Td>
        <ReadQuestion {...props} />
      </Td>
    </Tr>
  );
}
