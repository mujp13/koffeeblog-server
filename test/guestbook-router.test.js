const knex = require('knex');
const app = require('../src/app');
const helpers = require('./test-helpers');

describe('Guestbook Endpoints', function () {
  let db;

  before('make knex instance', () => {
    db = knex({
      client: 'pg',
      connection: process.env.TEST_DB_URL,
    });
    app.set('db', db);
  });

  after('disconnect from db', () => db.destroy());

  before('cleanup', () => helpers.cleanTables(db));

  afterEach('cleanup', () => helpers.cleanTables(db));

  describe(`GET /api/guestbook`, () => {
    context(`Given no guestbook`, () => {
      it(`responds with 200 and an empty list`, () => {
        return supertest(app).get('/api/guestbook').expect(200, []);
      });
    });
  });
  describe(`POST /api/guestbook`, () => {
    it(`creates an article, responding with 201 and the new content`, function () {
      return supertest(app)
        .post('/api/guestbook')
        .send({
          name: 'Test new type',
          comment: 'Test new content',
        })
        .expect(201);
    });
  });
});
