const { supabase } = require('../index.js');
const jwt = require('jsonwebtoken');
const secret = "WmpSVc7vwoUSN/SGtFd1PQO67csTZbX+MmwodyxRnwoJ+fZH750P7WNVYQbK1S7bD+oYikZRGQwvvU2UOj5vzg=="

// Check if input token is valid 
exports.auth = async (req, res, next) => {
    if (!req.headers.authorization) {
      return res.status(401).json({message: "No token is present"}); 
    }
    var token = req.headers.authorization.split(" ")[1]; 
    if (!token) {
      return res.status(401).json({message: "No token is present"}); 
    }

    let decoded;
    let errFlag;
    jwt.verify(token, secret, (err, user) => {    
        console.log(process.env.SECRET)
        if (err) errFlag = err
        else decoded = user
    })
    if (errFlag) return res.status(401).json({message: "Token is not verified"}); 

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