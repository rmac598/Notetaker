const fs = require("fs");
const uuid = require ('../helpers/uuid.js');
const app = require('express').Router();
const {readFromFile, readAndAppend, deleteFromFile } = require('../helpers/fsUtils.js');

// GET Route for retrieving all the feedback
app.get('/notes', (req, res) =>
  readFromFile('./db/db.json').then((data) => res.json(JSON.parse(data)))
);

// POST Route for submitting feedback
 app.post('/notes', (req, res) => {
  // Destructuring assignment for the items in req.body
  const { title, text} = req.body;

  // If all the required properties are present
  if (title && text) {
    // Variable for the object we will save
    const newNote = {
      title,
      text,
      id: uuid()
    };
//add new note to the file
    readAndAppend(newNote, './db/db.json');

   //respond to the route 
    res.status(200).send("message recieved");
  } else {
    res.json('Error in posting note');
  }
});

//delete note
// fetch(`/api/notes/${id}`, {
//   method: 'DELETE',
//   headers: {
//     'Content-Type': 'application/json'
//   }
// });
app.delete('/notes/:id', (req, res) =>{
  const id = req.params.id;
  if (id){
  deleteFromFile('./db/db.json', id);
  res.status(200).send("yay");}
  else{
    res.status(400).json('this sucks')
  }
});



module.exports = app;
