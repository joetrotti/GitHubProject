const express = require('express');
const Post = require('../models/post');
const router = express.Router();

router
    .post ('/grabpost', async (req, res) => {
        try {
          const posts = await Post.getPosts();
          res.send(posts);
        } catch (error) {
          res.status(401).send({message: error.message});
        }
      })