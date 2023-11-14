import React, { Fragment } from "react";
import QuestionTableRow from "../questions/QuestionTableRow";
import { Table, Thead, Tbody, Tr, Th, TableContainer } from "@chakra-ui/react";

export default function QuestionTable(props) {
  return (
    <TableContainer m={6}>
      <Table size="sm">
        <Thead>
          <Tr>
            <Th>ID</Th>
            <Th>Title</Th>
            <Th>Description</Th>
            <Th>Category</Th>
            <Th>Complexity</Th>
          </Tr>
        </Thead>
        <Tbody>
          {props.questions.map((data) => (
            <Fragment key={data.id}>
              <QuestionTableRow
                {...data}
                attemptQuestion={props.attemptQuestion}
                updateQuestionsList={props.updateQuestionsList}
                questions={props.questions}
                isAdmin={props.isAdmin}
              />
            </Fragment>
          ))}
        </Tbody>
      </Table>
    </TableContainer>
  );
}
