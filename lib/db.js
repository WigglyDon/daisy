let dbParams = {};
if (process.env.DATABASE_URL) {
  dbParams.connectionString = process.env.DATABASE_URL;
} else {
  dbParams = {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME
  };
}

module.exports = dbParams;

// const pool = new pool({
//   DB_HOST:'localhost',
//   DB_USER:'labber',
//   DB_PASS:'labber',
//   DB_NAME:'midterm',
//   DB_PORT: 5432
// });

// console.log(`I made a pool: ${pool}`);
