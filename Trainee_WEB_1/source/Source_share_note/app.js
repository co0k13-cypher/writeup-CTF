const express = require("express");
const lodash = require("lodash");
const escapeHTML = require("escape-html");
const { v4: uuidv4 } = require("uuid");

const app = express();
app.use(express.urlencoded({ extended: false }));

let note = [];

// Homepage
app.get("/", async (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

// API
app.post("/add-note", (req, res) => {
  let content = req.body.content;
  let note_id = uuidv4();
  let n = {
    id: note_id,
    content: content,
  };
  note.push(n);
  const compiled = lodash.template("Note ID: " + note_id);
  res.status(200).send(compiled());
});

app.post("/view-note", (req, res) => {

  const note_id = req.body.id;

  let content = lodash.find(note, { id: note_id });

  if (content) {
    const compiled = lodash.template(escapeHTML(content["content"]));
    res.status(200).send(compiled());
  } else {
    const compiled = lodash.template("ID not found");
    res.status(200).send(compiled());
  }
});

app.listen(1499, () => {
  console.log("Note app listening on port 8000!");
});
