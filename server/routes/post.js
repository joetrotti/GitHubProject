const express = require('express');
const Post = require('../models/post');
const router = express.Router();

router
    .post ('/grabpost', async (res, res) => {
        try {
          const user = await User.login(req.body.username, req.body.password);
          res.send({...user, user_password: undefined});
        } catch (error) {
          res.status(401).send({message: error.message});
        }
      })