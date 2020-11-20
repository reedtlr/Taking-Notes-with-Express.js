// Dependencies
const express = require("express");
const fs = require("fs");
const db = require('./db/db.json');

const app = express();

// process.env is being used so it can be deployed on Heroku
const PORT = process.env.PORT || 8080;

// add data parsing to Express
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Routes
app.get("/notes", function(req, res) {
    res.sendFile(path.join(__dirname, "public/notes.html"));
  });
  
app.get("*", function(req, res) {
    res.sendFile(path.join(__dirname, "public/index.html"));
  });
// open listing port for server
app.listen(PORT, function() {

    // servier side log with a browser link to local host 
    console.log("Server listening on: http://localhost:" + PORT);
  });