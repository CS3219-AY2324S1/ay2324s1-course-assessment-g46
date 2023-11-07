import axios from "axios";

const userApi = process.env.USER_API_URL || "http://34.123.170.74:5100/user";

export const signIn = async (userDetails) => {
  let { data } = await axios.post(`${userApi}/login`, userDetails);
  return { data };
};

export const signUp = async (userDetails) => {
  try {
    let { data } = await axios.post(`${userApi}/signup`, userDetails);
    return { data: data, error: null };
  } catch (error) {
    return { data: null, error: error.response.data };
  }
};

export const signOut = async () => {
  try {
    let { data } = await axios.post(`${userApi}/logout`);
    return { data: data, error: null };
  } catch (error) {
    return { data: null, error: error.response.data };
  }
};

export const updateProfile = async (userDetails, token) => {
  try {
    let { data } = await axios.put(`${userApi}/profile`, userDetails, {
      headers: { Authorization: `Bearer ${token}` },
    });

    return { data: data, error: null };
  } catch (error) {
    return { data: null, error: error.response.data };
  }
};

export const getProfile = async (token) => {
  try {
    let { data } = await axios.get(`${userApi}/profile`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    return { data: data, error: null };
  } catch (error) {
    return { data: null, error: error.response.data };
  }
};

export const deleteAccount = async (token) => {
  try {
    let { data } = await axios.delete(`${userApi}/profile`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    return { data: data, error: null };
  } catch (error) {
    return { data: null, error: error.response.data };
  }
};

export const getQuestionAttempts = async (token) => {
  try {
    let { data } = await axios.get(`${userApi}/attempts`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    return { data: data, error: null };
  } catch (error) {
    return { data: null, error: error.response.data };
  }
};

export const insertNewAttempt = async (token, userDetails) => {
  try {
    let { data } = await axios.post(`${userApi}/attempts`, userDetails, {
      headers: { Authorization: `Bearer ${token}` },
    });

    return { data: data, error: null };
  } catch (error) {
    return { data: null, error: error.response.data };
  }
};
