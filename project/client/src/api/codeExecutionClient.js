import axios from "axios";

const codeExecutionApi =
  process.env.CODE_EXECUTION_API_URL || "http://localhost:2358";

export const postSubmission = async (languageId, sourceCode, stdin) => {
  const code = {
    language_id: languageId,
    source_code: sourceCode,
    stdin: stdin,
  };

  let { data } = await axios.post(`${codeExecutionApi}/submissions/`, code, {
    params: { base64_encoded: false, wait: true },
  });
  console.log(data);
  return data;
};

export const getSubmission = async (token) => {
  let { data } = await axios.get(`${codeExecutionApi}/submissions/${token}`, {
    params: { base64_encoded: false, fields: "stdout,stderr" },
  });
  return data;
};
