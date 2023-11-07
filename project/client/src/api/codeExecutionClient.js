import axios from "axios";

const codeExecutionApi =
  process.env.CODE_EXECUTION_API_URL || "http://localhost:2358";

export const postSubmission = async (
  languageId,
  sourceCode,
  stdin,
  expected_output
) => {
  const code = {
    language_id: languageId,
    source_code: sourceCode,
    stdin: stdin,
    expected_output: expected_output,
  };

  let { data } = await axios.post(`${codeExecutionApi}/submissions/`, code, {
    params: { base64_encoded: false, wait: true },
  });
  console.log(data);
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
