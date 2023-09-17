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

const questionsRouter = require("./routes/questions");
app.use("/questions", questionsRouter);

app.listen(3000, () => {
  console.log("Server is listening on port 3000");
});
