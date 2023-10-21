const { supabase } = require("../config/supabaseClient");

exports.getAllQuestions = async (req, res) => {
  let { data, error } = await supabase.from("questions").select();

  if (error) {
    return res.status(500).json({ message: error.message });
  }

  return res.status(200).json({ questions: data });
};
