const express = require('express');
const {createClient} = require('@supabase/supabase-js');
const morgan = require('morgan')
const bodyParser = require("body-parser");

const supabaseUrl = "https://iwxacjmydxiforzrvurs.supabase.co"
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Iml3eGFjam15ZHhpZm9yenJ2dXJzIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTQ4NTAwMTksImV4cCI6MjAxMDQyNjAxOX0.KkiYYTJUNTD3K7OkHASV3_ZEv5NIFN-Farw9lT7QIfk"
exports.supabase = createClient(supabaseUrl, supabaseAnonKey)

const app = express();

// using morgan for logs
app.use(morgan('combined'));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

const user = require('./routes/user')
app.use('/user', user)

app.get('/', (req, res) => {
    res.send("Hello I am working my friend Supabase <3");
});

app.listen(3000, (err) => {
  if (!err) {
    console.log(`> Ready on http://localhost:3000`);
  } else {
    console.log("Error: " + err);
  }
});