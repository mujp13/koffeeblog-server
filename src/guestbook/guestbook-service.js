const GuestbookService = {
  getAllGuestbook(knex) {
    return knex.select('*').from('guestbook');
  },
  insertGuestbook(knex, newGuestbook) {
    return knex
      .insert(newGuestbook)
      .into('guestbook')
      .returning('*')
      .then((rows) => {
        return rows[0];
      });
  },
};

module.exports = GuestbookService;
