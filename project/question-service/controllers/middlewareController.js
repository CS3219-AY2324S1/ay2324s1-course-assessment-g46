const { supabase } = require("../config/supabaseClient");
const jwt_decode = require("jwt-decode");

const clientUrl = process.env.CLIENT_URL || "http://localhost:3000";
const matchingUrl = process.env.MATCHING_URL || "http://localhost:8080";

exports.checkQuestion = async (req, res, next) => {
  let { data, error } = await supabase
    .from("questions")
    .select()
    .eq("question_id", req.params.id);

  if (data == null) {
    res.status(404).json({ message: "Cannot find question" });
  } else if (error) {
    res.status(500).json({ message: error.message });
  } else {
    res.question = data;
    next();
  }
};

exports.checkWriteAuthorization = (isAdmin) => {
  const authorize = (req, res, next) => {
    if (req.headers.origin != clientUrl) {
      res.status(401).json({ message: "Unallowed origin" });
    }
    if (!req.headers.authorization) {
      res.status(401).json({ message: "No token is present" });
    }
    role = jwt_decode(req.headers.authorization)?.role;
    if (role == "admin" || (role == "authenticated" && !isAdmin)) {
      next();
    } else {
      let errMsg;
      if (isAdmin) {
        errMsg = "No authorization to modify questions";
      } else {
        errMsg = "No authorization to view questions";
      }
      res.status(403).json({ message: errMsg });
    }
  };

  return authorize;
};
