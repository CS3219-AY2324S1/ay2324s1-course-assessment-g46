import axios from "axios";

const questionsApi =
  process.env.QUESTIONS_API_URL || "http://35.208.149.231:8888/questions";

const getHeader = () => {return {headers: {
  'Authorization': `Bearer ${localStorage.getItem('token')}`
}}};

export const getQuestions = async () => {
  let { data } = await axios.get(questionsApi, getHeader());
  return data;
};

export const getQuestion = async (id) => {
  try {
    let { data } = await axios.get(`${questionsApi}/${id}`, getHeader());
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const getLastQuestionId = async () => {
  try {
    let { data } = await axios.get(questionsApi, getHeader());
    return data.length;
  } catch (error) {
    console.log(error);
  }
};

export const getFirstMissingQuestionId = async () => {
  try {
    let { data } = await axios.get(questionsApi, getHeader());
    let idSet = new Set();
    for (let i in data) {
      idSet.add(data[i].id);
    }
    let value = 1
    while (true) {
      if (!idSet.has(value)) {
        return value;
      }
      value++;
    }
  } catch (error) {
    console.log(error);
  }
};

export const addQuestion = async (id, title, desc, categories, complexity) => {
  const question = {
    id: id,
    title: title,
    description: desc,
    category: categories,
    complexity: complexity,
  };
  let { data } = await axios.post(questionsApi, question, getHeader());
  return data;
};

export const updateQuestion = async (id, question) => {
  try {
    console.log(id, question);
    await axios.patch(`${questionsApi}/${id}`, question, getHeader());
  } catch (error) {
    console.log(error);
  }
};

export const deleteQuestion = async (id) => {
  try {
    await axios.delete(`${questionsApi}/${id}`, getHeader());
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
