const ContentsService = {
  getAllContents(knex) {
    return knex.select('*').from('koffeeblog_articles');
  },
};

module.exports = ContentsService;
