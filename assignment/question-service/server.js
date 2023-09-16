const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const dbConfig = require('./config/database.config.js');
const mongoose = require('mongoose');

mongoose.connect(dbConfig.url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log("Database Connected Successfully!!");    
}).catch(err => {
    console.log('Could not connect to the database', err);
    process.exit();
});

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.get('/', (req, res) => {
    res.json({"message": "Hello Crud Node Express"});
});
app.listen(3000, () => {
    console.log("Server is listening on port 3000");
});