import axios from "axios";

const userApi = process.env.USER_API_URL || "http://localhost:5000/user";

export const signIn = async (userDetails) => {
  let { data } = await axios.post(`${userApi}/login`, userDetails);
  return { data };
};

export const signUp = async (userDetails) => {
  let { data } = await axios.post(`${userApi}/signup`, userDetails);
  return { data };
};

export const signOut = async () => {
  try {
    let { data } = await axios.post(`${userApi}/logout`);
    return { data };
  } catch (error) {
    return { error: error.response.data };
  }
};

export const updateProfile = async (userDetails, token) => {
  try {
    let { data } = await axios.put(`${userApi}/profile`, userDetails, {
      headers: { Authorization: `Bearer ${token}` },
    });

    return { data };
  } catch (error) {
    return { error: error.response.data };
  }
};

export const getProfile = async (token) => {
  try {
    let { data } = await axios.get(`${userApi}/profile`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    return { data };
  } catch (error) {
    console.log("Below")
    console.log(error)
    return { error: error.response.data, status: error.response.status };
  }
};

export const deleteAccount = async (token) => {
  try {
    let { data } = await axios.delete(`${userApi}/profile`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    return { data };
  } catch (error) {
    return { error: error.response.data };
  }
};

export const getQuestionAttempts = async (token) => {
  try {
    let { data } = await axios.get(`${userApi}/attempts`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    return { data };
  } catch (error) {
    return { error: error.response.data };
  }
};


export const insertNewAttempt = async (token, userDetails) => {
  try {
    let { data } = await axios.get(`${userApi}/attempts`, userDetails, {
      headers: { Authorization: `Bearer ${token}` },
    });

    return { data };
  } catch (error) {
    return { error: error.response.data };
  }
};