const db = require('./data/db.js') 
const express = require('express');


const server = express();

server.use(express.json());


server.get('/', (req, res) => {
  res.status(200).json({message: 'it works?'})
});

//all posts
server.get('/api/posts', (req, res) => {
  db.find() 
    .then(result => res.status(201).json(result))
    .catch(error => res.status(500).json({ error: "The posts information could not be retrieved." }))
});


module.exports = server