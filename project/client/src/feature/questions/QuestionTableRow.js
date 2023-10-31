import React from "react";
import EditQuestion from "./EditQuestion";
import ReadQuestion from "./ReadQuestion";
import DeleteQuestion from "./DeleteQuestion";
import { HStack, Tag, Td, Tr } from "@chakra-ui/react";

export default function QuestionTableRow(props) {
  function truncate(str) {
    if (str == null) return "";
    return str.length > 50 ? str.substring(0, 50) + "..." : str;
  }

  return (
    <Tr>
      <Td>
        <ReadQuestion {...props} />
      </Td>
      <Td>{truncate(props.description)}</Td>
      <Td>
        <HStack spacing={4}>
          { props.category == null 
          ? <> </>
          : props.category.length <= 3 ? (
            props.category.map((c, i) => <Tag key={i}>{c}</Tag>)
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
      {props.isAdmin && (
        <>
          <Td>
            <EditQuestion {...props} />
          </Td>
          <Td>
            <DeleteQuestion {...props} />
          </Td>
        </>
      )}
    </Tr>
  );
}
