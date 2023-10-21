const express = require("express");
const bodyParser = require("body-parser");

const app = express();

app.use(express.json());
// Add Access Control Allow Origin headers
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  res.header(
    "Access-Control-Allow-Methods",
    "GET, PUT, POST, PATCH, DELETE, OPTIONS, CONNECT"
  );
  next();
});

const questionsRouter = require("./routes/questions");
app.use("/questions", questionsRouter);

app.listen(8888, () => {
  console.log("Server is listening on port 8888");
});
