const express = require("express");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();

// using morgan for logs
app.use(morgan("combined"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

const user = require("./routes/user");
app.use("/user", user);

app.get("/", (req, res) => {
  res.send("Hello I am working my friend Supabase <3");
});


app.listen(5100, (err) => {
  if (!err) {
    console.log(`> Ready on http://localhost:5100`);
  } else {
    console.log("Error: " + err);
  }
});
