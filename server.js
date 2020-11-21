const express = require("express");
const fs = require("fs");

const app = express();

// process.env is being used so it can be deployed on Heroku
const PORT = process.env.PORT || 8080;

// add data parsing to Express
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

let jsonData = {}
fs.readFile('db/db.json', 'utf-8', (err, data) => {
  if (err) throw err
  
  jsonData = JSON.parse(data)
})

// Routes
app.get("/notes", function(req, res) {
    res.sendFile(path.join(__dirname, "public/notes.html"));
  });
  
app.get("*", function(req, res) {
    res.sendFile(path.join(__dirname, "public/index.html"));
  });

app.get(`/api/notes`, function(req,res) {
    res.sendFile(path.join(__dirname, "db/db.json"));
})

app.post('/api/notes', function(req, res) {
    let newNotes = req.body;
  
    newNotes.routeName = newNotes.name.replace(/\s+/g, "").toLowerCase();
  
    console.log(newNotes);
  
    db.push(newNotes);
  
    res.json(newNotes);
});

app.delete('/api/notes/:id', function(req, res) {
    let removeUser = req.body.id;
    console.log(req.body, "left is req body", req.body.id, "left of this is req body id")
    let data = fs.readFileSync('db/db.json');
    let json = JSON.parse(data);
    let id = json.id;
    json.id = id.filter((id) => { return id.id !== removeUser });
    fs.writeFileSync('results.json', JSON.stringify(json, null, 2));
})

// open listing port for server
app.listen(PORT, function() {

    // servier side log with a browser link to local host 
    console.log("Server listening on: http://localhost:" + PORT);
  });