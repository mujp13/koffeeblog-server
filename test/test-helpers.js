const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

function makeGuestbookArray() {
  return [
    {
      name: 'Ronaldinho',
      comment: 'This website is very awesome!',
      date_published: new Date('2029-01-22T16:28:32.615Z'),
    },
    {
      name: 'Kaka',
      comment: 'This website is very good!',
      date_published: new Date('2029-01-24T16:28:32.615Z'),
    },
    {
      name: 'Rivaldo',
      comment: 'This website is very ok!',
      date_published: new Date('2029-01-23T16:28:32.615Z'),
    },
  ];
}

function makeContentsArray() {
  return [
    {
      typeid: 'Bean',
      title: 'Spanish',
      imageurl: 'www.coffeemakesgoogle.com',
      contents: 'Spanish beans are the best in the world',
      date_published: new Date('2029-01-22T16:28:32.615Z'),
    },
    {
      typeid: 'Drinks',
      title: 'Brazilian',
      imageurl: 'www.coffeemakesgoogle.com',
      contents: 'Spanish beans are the best in the world',
      date_published: new Date('2029-01-22T16:28:32.615Z'),
    },
    {
      typeid: 'Brewing',
      title: 'American',
      imageurl: 'www.coffeemakesgoogle.com',
      contents: 'Spanish beans are the best in the world',
      date_published: new Date('2029-01-22T16:28:32.615Z'),
    },
  ];
}

function makeMaliciousGuestbook() {
  const maliciousArticle = {
    id: 911,
    name: 'How-to',
    comment: 'Good good good',
    date_published: new Date(),
  };
  const expectedArticle = {
    ...maliciousArticle,
    name: 'Naughty naughty very naughty &lt;script&gt;alert("xss");&lt;/script&gt;',
    content: `Bad image <img src="https://url.to.file.which/does-not.exist">. But not <strong>all</strong> bad.`,
  };
  return {
    maliciousArticle,
    expectedArticle,
  };
}

function makeGuestbookFixtures() {
  const testGuestbook = makeGuestbookArray(testUsers);
  return { testGuestbook };
}

function cleanTables(db) {
  return db.transaction((trx) =>
    trx
      .raw(
        `TRUNCATE
        koffeeblog_articles,
        guestbook
      `
      )
      .then(() =>
        Promise.all([
          trx.raw(`ALTER SEQUENCE guestbook_id_seq minvalue 0 START WITH 1`),
          trx.raw(`SELECT setval('guestbook_id_seq', 0)`),
        ])
      )
  );
}

function seedGuestbookTables(db, items, comments = []) {
  // use a transaction to group the queries and auto rollback on any failure
  return db.transaction(async (trx) => {
    await trx.into('guestbook').insert(items);
    // update the auto sequence to match the forced id values
    await trx.raw(`SELECT setval('guestbook_id_seq', ?)`, [items[items.length - 1].id]);
    // only insert comments if there are some, also update the sequence counter
  });
}

function seedMaliciousGuestbook(db, item) {
  return db.into('guestbook').insert([item]);
}

module.exports = {
  makeGuestbookArray,
  makeMaliciousGuestbook,
  cleanTables,
  seedGuestbookTables,
  makeGuestbookFixtures,
  seedMaliciousGuestbook,
};
