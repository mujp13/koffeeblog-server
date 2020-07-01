const path = require('path');
const express = require('express');
const GuestbookService = require('./guestbook-service');

const guestbookRouter = express.Router();
const jsonParser = express.json();

guestbookRouter
  .route('/')
  .get((req, res, next) => {
    GuestbookService.getAllGuestbook(req.app.get('db'))
      .then((gb) => {
        res.json(gb);
      })
      .catch(next);
  })
  .post(jsonParser, (req, res, next) => {
    const { name, comment } = req.body;
    const newGuestbook = { name, comment };

    GuestbookService.insertGuestbook(req.app.get('db'), newGuestbook)
      .then((gb) => {
        res
          .status(201)
          .location(path.posix.join(req.originalUrl, `/${gb.id}`))
          .json(gb);
      })
      .catch(next);
  });

module.exports = guestbookRouter;
