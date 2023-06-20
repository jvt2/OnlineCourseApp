// db.js
const mysql = require('mysql');

const pool = mysql.createPool({
  connectionLimit: 10, // Number of connections in the pool
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME
});

pool.getConnection((err, connection) => {
  if (err) {
    console.error('Error connecting to the database: ', err);
    return;
  }
  console.log('Connected to the MySQL server.');
  connection.release();
});

module.exports = pool;

