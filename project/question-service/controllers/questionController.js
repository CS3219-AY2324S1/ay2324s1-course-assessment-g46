const { supabase } = require("../config/supabaseClient");

exports.getAllQuestions = async (req, res) => {
  let { data, error } = await supabase.from("questions").select();

  if (error) {
    res.status(500).json({ message: error.message });
  }

  res.status(200).json({ questions: data });
};

exports.getOneQuestion = async (req, res) => {
  let { data, error } = await supabase
    .from("questions")
    .select()
    .eq("question_id", req.params.id);
  if (error) {
    res.status(500).json({ message: error.message });
  }

  if (data == null) {
    res.status(404).json({ message: "Cannot find question" });
  }

  res.status(200).json({ question: data });
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
    res.status(500).json({ message: error.message });
  }

  if (data == null) {
    res.status(404).json({ message: "Cannot create question" });
  }

  res.status(200).json({ question: data });
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

  res.status(200).json({ questions: data });
};

exports.getQuestionByCategory = async (req, res) => {
  let { data, error } = await supabase
    .from("questions")
    .select()
    .contains("category", [req.params.category]);

  if (error) {
    res.status(500).json({ message: error.message });
  }

  res.status(200).json({ questions: data });
};
