const axios = require("axios");

export const getQuestions = async () => {
  try {
    let res = await axios.get("https://reqres.in/api/users?page=1");
    let { data } = res.data;
    return data;
  } catch (error) {
    console.log(error);
  }
};
