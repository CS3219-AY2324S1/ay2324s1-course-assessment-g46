import axios from "axios";

const questionsApi =
  process.env.QUESTIONS_API_URL || "http://localhost:8888/questions";

export const getQuestions = async () => {
  try {
    let { data } = await axios.get(questionsApi);
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const getQuestion = async (id) => {
  try {
    let { data } = await axios.get(`${questionsApi}/${id}`);
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const getLastQuestionId = async () => {
  try {
    let { data } = await axios.get(questionsApi);
    return data.length;
  } catch (error) {
    console.log(error);
  }
};

export const addQuestion = async (question) => {
  try {
    let { data } = await axios.post(questionsApi, question);
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const updateQuestion = async (id, question) => {
  try {
    console.log(id, question);
    await axios.patch(`${questionsApi}/${id}`, question);
  } catch (error) {
    console.log(error);
  }
};

export const deleteQuestion = async (id) => {
  try {
    await axios.delete(`${questionsApi}/${id}`);
  } catch (error) {
    console.log(error);
  }
};

export const questionCategories = [
  "Array",
  "Binary Search",
  "Binary Tree",
  "Dynamic Programming",
  "Graph",
  "Hash Table",
  "Heap",
  "Linked List",
  "Matrix",
  "Recursion",
  "Stack",
  "String",
  "Trie",
];
