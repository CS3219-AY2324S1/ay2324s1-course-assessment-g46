import axios from "axios";

const codeExecutionApi =
  process.env.CODE_EXECUTION_API_URL || "https://judge0-ce.p.rapidapi.com";

const headers = {
  "content-type": "application/json",
  "Content-Type": "application/json",
  "X-RapidAPI-Key": "d3d5afdcdfmshe1afe1206f4b2ebp1d268fjsn254e78a92e15",
  "X-RapidAPI-Host": "judge0-ce.p.rapidapi.com",
};


export const postSubmission = async (languageId, sourceCode) => {
  const code = {
    language_id: languageId,
    source_code: sourceCode,
  };

  let { data } = await axios.post(`${codeExecutionApi}/submissions/`, code, {
    params: { base64_encoded: false, wait: true },
    headers: headers,
  });
  return data;
};

export const getSubmission = async (token) => {
  console.log(token);
  let { data } = await axios.get(`${codeExecutionApi}/submissions/${token}`, {
    params: { base64_encoded: false },
  });
  console.log(data);
  return data;
};
