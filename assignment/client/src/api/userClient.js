import axios from "axios";

export const signIn = async (userDetails) => {
  try {
    let { data } = await axios.post("http://localhost:3000/user/login", 
      userDetails
    );
    return { data };
  } catch (error) {
    return { error: error.response.data };
  }
};

export const signUp = async (userDetails) => {
  try {
    let { data } = await axios.post("http://localhost:3000/user/signup", 
      userDetails
    );
    return { data };
  } catch (error) {
    return { error: error.response.data };
  }
};

export const signOut = async () => {
  try {
    let { data } = await axios.post("http://localhost:3000/user/logout");
    return { data };
  } catch (error) {
    return { error: error.response.data };
  }
};

export const updateProfile = async (userDetails, token) => {
  try {
    let { data } = await axios.put(
      "http://localhost:3000/user/updateProfile", 
      userDetails, 
      {
        headers: 
        { Authorization: `Bearer ${token}` }
      }
    );

    return { data };
  } catch (error) {
    return { error: error.response.data };
  }
};

export const getProfile = async (token) => {
  try {
    let { data } = await axios.get(
      "http://localhost:3000/user/me", 
      {
        headers: 
        { Authorization: `Bearer ${token}` }
      }
    );

    return { data };
  } catch (error) {
    return { error: error.response.data };
  }
};

export const deleteAccount = async (token) => {
  try {
    let { data } = await axios.delete(
      "http://localhost:3000/user/deleteAccount", 
      {
        headers: 
        { Authorization: `Bearer ${token}` }
      }
    );

    return { data };
  } catch (error) {
    return { error: error.response.data };
  }
};


