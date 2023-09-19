const { supabase } = require('../index.js');
const jwt_decode = require('jwt-decode');

// Check if input token is valid 
exports.auth = async (req, res, next) => {
    // var token = req.headers.authorization.split(" ")[1]; 
    var token = req.headers.authorization; 
    if (!token) {
      return res.status(401).json({message: "No token is present"}); 
    }

    const decoded = jwt_decode(token);
    const { data, error } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", decoded.sub);

    if (error) {
      res.status(401).json({message: error.message}); 
    }

    if (data.length != 0) {
      req.user = data[0]; 
      next(); 
    } else {
      res.status(401).json({message: "Invalid token"}); 
    }
}; 