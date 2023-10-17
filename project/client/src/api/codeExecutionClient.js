import axios from "axios";

const codeExecutionApi =
  process.env.CODE_EXECUTION_API_URL || "http://localhost:2358";

<<<<<<< HEAD
export const postSubmission = async (
  languageId,
  sourceCode,
  stdin,
  expected_output
) => {
=======
export const postSubmission = async (languageId, sourceCode, stdin) => {
>>>>>>> 54ba779 (add code execution on judge0)
  const code = {
    language_id: languageId,
    source_code: sourceCode,
    stdin: stdin,
<<<<<<< HEAD
    expected_output: expected_output,
=======
>>>>>>> 54ba779 (add code execution on judge0)
  };

  let { data } = await axios.post(`${codeExecutionApi}/submissions/`, code, {
    params: { base64_encoded: false, wait: true },
  });
  console.log(data);
  return data;
};

export const getSubmission = async (token) => {
<<<<<<< HEAD
  console.log(token);
  let { data } = await axios.get(`${codeExecutionApi}/submissions/${token}`, {
    params: { base64_encoded: false },
  });
  console.log(data);
=======
  let { data } = await axios.get(`${codeExecutionApi}/submissions/${token}`, {
    params: { base64_encoded: false, fields: "stdout,stderr" },
  });
>>>>>>> 54ba779 (add code execution on judge0)
  return data;
};
