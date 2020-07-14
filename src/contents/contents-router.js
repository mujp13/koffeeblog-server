const path = require('path');
const express = require('express');
const ContentsService = require('./contents-service');

const contentsRouter = express.Router();
const jsonParser = express.json();

contentsRouter
  .route('/')
  .get((req, res, next) => {
    ContentsService.getAllContents(req.app.get('db'))
      .then((contents) => {
        res.json(contents);
      })
      .catch(next);
  })
  .post(jsonParser, (req, res, next) => {
    const { typeid, title, imageurl, content, rating, location } = req.body;
    const newContent = { typeid, title, imageurl, content, rating, location };

    ContentsService.insertContent(req.app.get('db'), newContent)
      .then((ct) => {
        res
          .status(201)
          .location(path.posix.join(req.originalUrl, `/${ct.id}`))
          .json(ct);
      })
      .catch(next);
  });

module.exports = contentsRouter;
