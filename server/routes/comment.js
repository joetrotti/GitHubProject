const express = require('express');
const Post = require('../models/comment');
const router = express.Router();

router
    .post ('/grabpost', async (req, res) => {
        try {
          const posts = await Post.getComment();
          res.send(comment);
        } catch (error) {
          res.status(401).send({message: error.message});
        }
      })