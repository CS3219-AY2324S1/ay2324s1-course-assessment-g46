import axios from "axios";

export const getQuestions = async () => {
  try {
    let { data } = await axios.get("http://localhost:8888/questions");
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const getLastQuestionId = async () => {
  try {
    let { data } = await axios.get("http://localhost:8888/questions");
    return data.length;
  } catch (error) {
    console.log(error);
  }
};

export const addQuestion = async (question) => {
  try {
    let { data } = await axios.post(
      "http://localhost:8888/questions",
      question
    );
    return data;
  } catch (error) {
    console.log(error);
  }
};
