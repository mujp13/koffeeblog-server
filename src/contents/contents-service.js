const ContentsService = {
  getAllContents(knex) {
    return knex.select('*').from('koffeeblog_articles');
  },
  insertContent(knex, newContent) {
    return knex
      .insert(newContent)
      .into('koffeeblog_articles')
      .returning('*')
      .then((rows) => {
        return rows[0];
      });
  },
};

module.exports = ContentsService;
