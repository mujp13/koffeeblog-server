const knex = require('knex');
const app = require('../src/app');
const helpers = require('./test-helpers');

describe('Contents Endpoints', function () {
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

  describe(`GET /api/contents`, () => {
    context(`Given no contents`, () => {
      it(`responds with 200 and an empty list`, () => {
        return supertest(app).get('/api/contents').expect(200, []);
      });
    });
  });
  describe(`POST /api/contents`, () => {
    it(`creates an article, responding with 201 and the new content`, function () {
      return supertest(app)
        .post('/api/contents')
        .send({
          typeid: 'Test new type',
          title: 'Test new content',
          imageurl: 'test new imageurl',
          content: 'Test new article content...',
          rating: 'Test new rating',
          location: 'Test new location',
        })
        .expect(201);
    });
  });
});
