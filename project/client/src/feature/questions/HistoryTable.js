import React, { Fragment, useEffect, useState } from "react";
import { Table, Thead, Tbody, Tr, Th, TableContainer } from "@chakra-ui/react";
import HistoryTableRow from "./HistoryTableRow";
import { getQuestionAttempts } from "../../api/userClient";

export default function HistoryTable(props) {
  const [questions, setQuestions] = useState([]);
  const token = localStorage.getItem("token");

  function getQuestion(id) {
    let question = props.questions.find((q) => q.id === id);
    return question;
  }

  useEffect(() => {
    getQuestionAttempts(token)
      .then((data) => {
        setQuestions(data);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  return (
    <TableContainer m={6}>
      <Table size="sm">
        <Thead>
          <Tr>
            <Th>ID</Th>
            <Th>Title</Th>
          </Tr>
        </Thead>
        <Tbody>
          {props.questions == null ? (
            <></>
          ) : (
            questions.map((data) => (
              <Fragment key={data.question_id}>
                <HistoryTableRow
                  {...getQuestion(data.question_id)}
                  attemptQuestion={props.attemptQuestion}
                />
              </Fragment>
            ))
          )}
        </Tbody>
      </Table>
    </TableContainer>
  );
}
