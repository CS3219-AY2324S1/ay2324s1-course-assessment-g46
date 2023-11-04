import { Table, TableContainer, Tbody, Th, Thead, Tr } from "@chakra-ui/react";
import React, { Fragment } from "react";
import QuestionTableRow from "../questions/QuestionTableRow";

export default function QuestionTable(props) {
  return (
    <TableContainer m={6}>
      <Table size="sm">
        <Thead>
          <Tr>
            <Th>Id</Th>
            <Th>Title</Th>
            <Th>Category</Th>
            <Th>Complexity</Th>
          </Tr>
        </Thead>
        <Tbody>
          {props.questions == null ? (
            <></>
          ) : (
            props.questions.map((data, index) => (
              <Fragment key={index}>
                <QuestionTableRow
                  {...data}
                  attemptQuestion={props.attemptQuestion}
                  updateQuestionsList={props.updateQuestionsList}
                  questions={props.questions}
                  isAdmin={props.isAdmin}
                />
              </Fragment>
            ))
          )}
        </Tbody>
      </Table>
    </TableContainer>
  );
}
