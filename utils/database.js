const bluebird = require('bluebird');
const mysql = require('mysql2/promise');

const DSN = require('../keys/keys');

const pool = mysql.createPool({
  host: DSN.HOST_NAME,
  user: DSN.USER_NAME,
  password: DSN.PASSWORD,
  database: DSN.DATABASE_NAME,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
  Promise: bluebird,
});

module.exports = pool;
