const { supabase } = require("../config/supabaseClient");

exports.getAllQuestions = async (req, res) => {
  let { data, error } = await supabase.from("questions").select();

  if (error) {
    res.status(500).json({ message: error.message });
  }

  if (data == null) {
    res.status(404).json({ message: "Cannot find questions" });
  }

  res.status(200).json({ questions: data });
};

exports.getOneQuestion = async (req, res) => {
  if (req.params.id == null) {
    res.status(400).json({ message: "Missing question id" });
    return;
  }
  // check if id is type uuid
  if (req.params.id.length != 36) {
    res.status(400).json({ message: "Invalid question id" });
    return;
  }

  let { data, error } = await supabase
    .from("questions")
    .select()
    .eq("question_id", req.params.id);

  if (error) {
    res.status(500).json({ message: error.message });
    return;
  }

  res.status(200).json(data[0]);
};

exports.createOneQuestion = async (req, res) => {
  const question = {
    title: req.body.title,
    description: req.body.description,
    complexity: req.body.complexity,
    category: req.body.category,
  };

  let { data, error } = await supabase
    .from("questions")
    .insert([question])
    .select();

  if (error) {
    return res.status(500).json({ message: error.message });
  }

  if (data == null) {
    return res.status(404).json({ message: "Cannot create question" });
  }

  return res.status(200).json({ question: data });
};

exports.updateOneQuestion = async (req, res) => {
  let { data, error } = await supabase
    .from("questions")
    .update(req.body)
    .eq("question_id", req.params.id)
    .select();

  if (error) {
    res.status(500).json({ message: error.message });
  }

  if (data == null) {
    res.status(404).json({ message: "Cannot update question" });
  }

  res.status(200).json({ question: data });
};

exports.deleteOneQuestion = async (req, res) => {
  let { error } = await supabase
    .from("questions")
    .delete()
    .eq("question_id", req.params.id);

  if (error) {
    res.status(500).json({ message: error.message });
  }

  res.status(200).json({ message: "Question deleted" });
};

exports.getQuestionsByComplexity = async (req, res) => {
  let { data, error } = await supabase
    .from("questions")
    .select()
    .eq("complexity", req.params.complexity);

  if (error) {
    res.status(500).json({ message: error.message });
  }

  if (data == null) {
    res.status(404).json({ message: "Cannot find question" });
  }

  // get a random question
  res.status(200).json(data[Math.floor(Math.random() * data.length)]);
};

exports.getQuestionByCategory = async (req, res) => {
  let { data, error } = await supabase
    .from("questions")
    .select()
    .contains("category", [req.params.category]);

  if (error) {
    res.status(500).json({ message: error.message });
  }

  if (data) {
    res.status(404).json({ message: "Cannot find question" });
  }

  res.status(200).json({ questions: data });
};
