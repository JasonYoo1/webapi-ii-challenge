const db = require('./data/db.js') 
const express = require('express');


const server = express();

server.use(express.json());

// Server test on the root url without /api extension.
server.get('/', (req, res) => {
  res.status(200).json({message: 'it works?'})
})

module.exports = server