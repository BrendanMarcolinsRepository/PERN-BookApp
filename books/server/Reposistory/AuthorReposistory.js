const pool = require('../db');

const getAnAuthor = async (author) => {

    const client = await pool.connect()

    const authorInsertReturnResult = await client.query("SELECT * FROM author WHERE name = $1", [author])

    return authorInsertReturnResult;
    

}

const insertAnAuthor = async (author) => {

    
    const client = await pool.connect()

    return await client.query("INSERT INTO author (name) VALUES ($1) RETURNING * ",[author] )
}

module.exports = {
    getAnAuthor,
    insertAnAuthor
}