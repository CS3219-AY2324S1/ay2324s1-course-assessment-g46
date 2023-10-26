export const languageOptions = [
  {
    id: 53,
    label: "C++",
    value: "cpp",
  },
  {
    id: 49,
    label: "C",
    value: "c",
  },
  {
    id: 51,
    label: "C#",
    value: "csharp",
  },
  {
    id: 62,
    label: "Java",
    value: "java",
  },
  {
    id: 63,
    label: "JavaScript",
    value: "javascript",
  },
  {
    id: 71,
    label: "Python",
    value: "python",
  },
  {
    id: 60,
    label: "Go",
    value: "go",
  },
];

export function getId(language) {
  let res = languageOptions.find((o) => o.value === language);
  return res.id;
}
