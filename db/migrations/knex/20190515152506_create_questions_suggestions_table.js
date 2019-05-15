const getMigrationQuery = require("../../../scripts/db/getMigrationQuery");

exports.up = async knex => {
  await knex.raw(getMigrationQuery("20190515152506_create_questions_suggestions_table").up());
};

exports.down = async knex => {
  await knex.raw(getMigrationQuery("20190515152506_create_questions_suggestions_table").down());
};
