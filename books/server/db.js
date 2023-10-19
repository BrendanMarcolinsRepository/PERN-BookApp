const Pool = require("pg").Pool;

const pool = new Pool({
    user : "random",
    password : "random",
    host: "localhost",
    port: 5432,
    database: "store"
});

module.exports = pool;