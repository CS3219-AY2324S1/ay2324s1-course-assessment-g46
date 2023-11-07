import React, { Fragment, useEffect, useState } from "react";
import { Table, Thead, Tbody, Tr, Th, TableContainer } from "@chakra-ui/react";
import { getQuestionAttempts } from "../../api/userClient";
import QuestionTableRow from "./QuestionTableRow";

export default function HistoryTable(props) {
  const [history, setHistory] = useState([]);
  const token = localStorage.getItem("token");

  function getQuestion(id) {
    let question = props.questions.find((q) => q.question_id === id);
    return question;
  }

  useEffect(() => {
    getQuestionAttempts(token)
      .then((res) => {
        if (res.data != null) {
          setHistory(res.data.attempts);
        } else {
          setHistory([]);
        }
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
            <Th>Attempt number</Th>
            <Th>Title</Th>
            <Th>Description</Th>
            <Th>Category</Th>
            <Th>Complexity</Th>
          </Tr>
        </Thead>
        <Tbody>
          {props.questions == null ? (
            <></>
          ) : (
            // history.length > 0 &&
            history.map((data) => (
              <Fragment key={data.question_id}>
                <QuestionTableRow
                  {...getQuestion(data.question_id)}
                  attemptQuestion={props.attemptQuestion}
                  questions={props.questions}
                  isAdmin={false}
                  isAttempt={true}
                  attemptNumber={data.attempt}
                />
              </Fragment>
            ))
          )}
        </Tbody>
      </Table>
    </TableContainer>
  );
}
