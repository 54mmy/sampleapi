var knex = require('knex')({
  client: 'mysql',
  connection: {
    host : '127.0.0.1',
    user : 'root',
    password : 'admin',
    database : 'skills'
  }
});
module.exports = knex;