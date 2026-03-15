require('dotenv').config();
var pg = require('pg');

var pool = process.env.DATABASE_URL
  ? new pg.Pool({ connectionString: process.env.DATABASE_URL, ssl: { rejectUnauthorized: false } })
  : new pg.Pool({
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