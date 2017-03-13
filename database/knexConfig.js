const dotenv = require('dotenv');
const path = require('path');

dotenv.config({ path: path.join(__dirname, '../.env') });
const {
  DB_HOST: host,
  DB_NAME: database,
  DB_USER: user,
  DB_PASSWORD: password,
  DB_PORT: port,
} = process.env;

module.exports = {
  client: 'mysql',
  connection: { host, user, password, database, port },
  migrations: {
    tableName: 'knex_migrations',
  },
};
