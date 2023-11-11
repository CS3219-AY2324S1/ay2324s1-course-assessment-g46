const { supabase } = require("../config/supabaseClient");

exports.signup = async (req, res) => {
  const { email, password, fullName } = req.body; 
  if (email.length == 0) {
    return res.status(400).json({message: "Email field must be non-empty"})
  }
  if (password.length == 0) {
    return res.status(400).json({message: "Password field must be non-empty"})
  }
  if (fullName.length == 0) {
    return res.status(400).json({message: "Name field must be non-empty"})
  }
  if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email)) {
    return res.status(400).json({message: "Invalid email address"})
  }

  const { error } = await supabase.auth.signUp({ 
    email, 
    password, 
    options: {
      data: {
        full_name: fullName
      }
  }})

  if (error) {
    return res.status(500).json({message: error.message})
  } 
  return res.status(200).json({message: "Signed up!"});
};


exports.login = async (req, res) => {
  const { email, password } = req.body; 
  if (email.length == 0) {
    return res.status(400).json({message: "Email field must be non-empty"})
  }
  if (password.length == 0) {
    return res.status(400).json({message: "Password field must be non-empty"})
  }

  if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email)) {
    return res.status(400).json({message: "Invalid email address"})
  }

  const { data, error } = await supabase.auth.signInWithPassword({email, password});
  if (error) {
    return res.status(500).json({message: error.message})
  } 
  return res.status(200).json({access_token: data.session.access_token});
};

exports.logout = async (req, res) => {
  const { error } = await supabase.auth.signOut(); 
  if (error) {
    return res.status(500).json({message: error.message});
  } 
  return res.status(200).json({message: "Logged out!"});
};


exports.getProfile = async (req, res) => {
  const userId = req.user.id;

  const { data } = await supabase
  .from("profiles")
  .select()
  .eq("id", userId);

  if (data.length != 0) {
    return res.status(200).json({fullName: data[0].full_name, goal: data[0].goal})
  }

  return res.status(404).json({message: "User cannot be found"});
};

exports.getQuestionAttempts = async (req, res) => {
  const userId = req.user.id;

  const { data } = await supabase
  .from("question_attempts")
  .select('*')
  .eq("user_id", userId);

  return res.status(200).json({attempts: data})
};

exports.getLatestQuestionAttempts = async (req, res) => {
  const userId = req.user.id;

  const { data } = await supabase
  .from("latest_attempts")
  .select('*')
  .eq("user_id", userId);

  return res.status(200).json({attempts: data})
};

exports.insertAttempt = async (req, res) => {
  const userId = req.user.id;
  const { questionId } = req.body;

  const { error } = await supabase
  .from("question_attempts")
  .insert([
    {
      question_id: questionId, 
      user_id: userId
    }
  ])
  .select()

  if (error) {
    return res.status(500).json({message: error.message})
  }

  return res.status(200).json({message: "New attempt created!"})
};

exports.updateProfile = async (req, res) => {
  const userId = req.user.id;
  const { fullName, goal } = req.body;

  if (goal != null && goal.length > 100) {
    return res.status(400).json({message: "Goal field must be less than 100 characters"});
  }

  if (fullName == null ||  (fullName.length == 0)) {
    return res.status(400).json({message: "Full name is missing"});
  }

  const { data, error } = await supabase
  .from("profiles")
  .update({ 
    "full_name": fullName, 
    "goal": goal 
  })
  .eq('id', userId)
  .select();

  if (error) {
    return res.status(500).json({message: error.message});
  } 

  return res.status(200).json({user: data[0]});
};


exports.deleteAccount = async (req, res) => {
  const userId = req.user.id;

  const { error } = await supabase
  .from('profiles')
  .delete()
  .eq('id', userId);

  if (error) {
    return res.status(500).json({message: error.message});
  } 

  return res.status(204).json({message: "Account has been deleted!"});
};
