require('dotenv').config();
const { Pool } = require('pg');

const pool = new Pool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  database: process.env.DB_NAME,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
});

pool.connect(function(err) {
  if (err) console.error('Erreur DB:', err.message);
  else console.log('PostgreSQL connecte');
});

module.exports = pool;