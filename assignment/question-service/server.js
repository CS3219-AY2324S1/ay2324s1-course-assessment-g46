require("dotenv").config();

const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const mongoose = require("mongoose");

mongoose.connect(process.env.MONGODB_URL, {
  useNewUrlParser: true,
  //   useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on("error", (error) => console.error(error));
db.once("open", () => console.log("Connected to Database"));

// app.use(bodyParser.urlencoded({ extended: true }))
// app.use(bodyParser.json())

app.use(express.json());
// Add Access Control Allow Origin headers
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

const questionsRouter = require("./routes/questions");
app.use("/questions", questionsRouter);

app.listen(8888, () => {
  console.log("Server is listening on port 8888");
});
