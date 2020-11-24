const express = require("express");
const fs = require("fs");
const path = require("path");
const app = express();
const { v4: uuidv4 } = require('uuid');

let dbJson = require("./db/db.json");

// process.env is being used so it can be deployed on Heroku
const PORT = process.env.PORT || 8080;

// add data parsing to Express
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));

// let jsonData = {}
// fs.readFile('db/db.json', 'utf-8', (err, data) => {
//   if (err) throw err
  
//   jsonData = JSON.parse(data)
// })

// Routes
app.get("/notes", function(req, res) {
    res.sendFile(path.join(__dirname, "public/notes.html"));
  });
  
app.get("/", function(req, res) {
    res.sendFile(path.join(__dirname, "public/index.html"));
  });

app.get("/api/notes", function(req,res) {
  res.json(dbJson);
})

app.post("/api/notes", function(req, res) {
    let newNotes = req.body;
    let id = uuidv4();
    newNotes.id = id;
    
    dbJson.push(newNotes);
    fs.writeFileSync("./db/db.json", JSON.stringify(dbJson));
    res.json(dbJson);
});

app.delete('/api/notes/:id', function(req, res) {
    let currentNotes = dbJson.filter(note => note.id != req.params.id)
    dbJson = currentNotes
    fs.writeFileSync('./db/db.json', JSON.stringify(dbJson));
    res.json(dbJson);
})

// open listing port for server
app.listen(PORT, function() {

    // servier side log with a browser link to local host 
    console.log("Server listening on: http://localhost:" + PORT);
  });