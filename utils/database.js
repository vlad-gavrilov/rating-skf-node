const mysql = require('mysql');
const DSN = require('../keys/keys');

var connection = mysql.createConnection({
    host: DSN.HOST_NAME,
    user: DSN.USER_NAME,
    password: DSN.PASSWORD,
    database: DSN.DATABASE_NAME
});

connection.connect();

module.exports = connection;

