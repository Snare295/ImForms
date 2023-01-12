const mysql = require('mysql');

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'vlad1234',
    database: 'mydb'
});

module.exports = db;