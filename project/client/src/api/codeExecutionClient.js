import axios from "axios";

const codeExecutionApi =
  process.env.CODE_EXECUTION_API_URL || "http://localhost:2358";

const tempAccept = {
  stdout: "hi\n",
  time: "0.073",
  memory: 32960,
  stderr: null,
  token: "25a889ba-8e1f-4cfb-8c91-13c2ec7fea60",
  compile_output: null,
  message: null,
  status: {
    id: 3,
    description: "Accepted",
  },
};

const tempErr = {
  stdout: null,
  time: "0.05",
  memory: 33452,
  stderr:
    '/box/script.js:1\nconsole.log("hi)\n            ^^^^\n\nSyntaxError: Invalid or unexpected token\n    at Module._compile (internal/modules/cjs/loader.js:895:18)\n    at Object.Module._extensions..js (internal/modules/cjs/loader.js:995:10)\n    at Module.load (internal/modules/cjs/loader.js:815:32)\n    at Function.Module._load (internal/modules/cjs/loader.js:727:14)\n    at Function.Module.runMain (internal/modules/cjs/loader.js:1047:10)\n    at internal/main/run_main_module.js:17:11\n',
  token: "c9d38125-c00a-4e69-a69e-f9c1e863570a",
  compile_output: null,
  message: "Exited with error status 1",
  status: {
    id: 11,
    description: "Runtime Error (NZEC)",
  },
};

export const postSubmission = async (languageId, sourceCode) => {
  return tempErr;
  const code = {
    language_id: languageId,
    source_code: sourceCode,
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
