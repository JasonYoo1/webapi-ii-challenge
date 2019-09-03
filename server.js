const db = require("./data/db.js");
const express = require("express");

const server = express();

server.use(express.json());

server.get("/", (req, res) => {
  res.status(200).json({ message: "it works?" });
});

//all posts
server.get("/api/posts", (req, res) => {
  db.find()
    .then(result => res.status(201).json(result))
    .catch(error =>
      res
        .status(500)
        .json({ error: "The posts information could not be retrieved." })
    );
});

//posting title and content
server.post("/api/posts", (req, res) => {
  const postBody = req.body;
  console.log("Post", req.body);
  if (postBody.title && postBody.contents) {
    db.insert(postBody)
      .then(result => {
        db.findById(result.id)
          .then(result => {
            res.status(201).json(result);
          })
          .catch(err => {
            console.log(err);
          });
      })
      .catch(err => {
        res.status(500).json({ error: "There was an error saving db" });
      });
  } else {
    res.status(400).json({ err: "Title and content needed" });
  }
});

//delete
server.delete("/api/posts/:id", (req, res) => {
  const id = req.params.id;
  db.findById(id)
    .then(result => {
      const postDelete = result;
      if (result.length > 0) {
        db.remove(id)
          .then(results => {
            res.status(200).json(postDelete);
          })
          .catch(err => {
            res.status(500).json({ error: "something went wrong deleting" });
          });
      } else {
        res
          .status(404)
          .json({ message: "that ID does not exist" });
      }
    })
    .catch(error => {
      console.log(error);
    });
});

//

module.exports = server;
