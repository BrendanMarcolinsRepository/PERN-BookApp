const pool = require('../db');

const genreExist = async (genre) => {

    const client = await pool.connect()

    const genreExist = await client.query("SELECT * FROM genre WHERE title = $1", [genre])

    return genreExist;


}

module.exports = {genreExist}
