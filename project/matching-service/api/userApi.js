const axios = require("axios");

const userApi = process.env.USER_API_URL || "http://35.208.149.231:5100/user";

const questionsApi = 
  process.env.QUESTIONS_API_URL || "http://35.208.149.231:8888/questions"

const getQuestionAttempts = async (token) => {
  try {
    let { data } = await axios.get(`${userApi}/attempts`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    const attemptSet = new Set(data.attempts.map(question => question.question_id));
    return attemptSet;
  } catch (error) {
    console.log(error);
    return new Set();
  }
};

const getQuestionIds = async (complexity) => {
    try {
        const { data } = await axios.get(`${questionsApi}/complexity/${complexity}`);
        return data.questions.map(question => question.question_id);
    } catch (error) {
        console.log(error);
        return ["1"];
    }
}

module.exports = { getQuestionAttempts, getQuestionIds };