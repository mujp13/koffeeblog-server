//const path = require('path');
const express = require('express');
const ContentsService = require('./contents-service');

const contentsRouter = express.Router();
//const jsonParser = express.json();

contentsRouter.route('/').get((req, res, next) => {
  ContentsService.getAllContents(req.app.get('db'))
    .then((contents) => {
      res.json(contents);
    })
    .catch(next);
});

module.exports = contentsRouter;
