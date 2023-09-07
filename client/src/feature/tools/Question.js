import React from "react";

export default function Question(props) {
  return (
    <>
      <p>{props.question.title}</p>
      <p>{props.question.description}</p>
      <p>{props.question.category}</p>
      <p>{props.question.complexity}</p>
    </>
  );
}
