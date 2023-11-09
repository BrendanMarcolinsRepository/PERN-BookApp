//----------Reposistory Layer --------------------

const pool = require('../db');

// get a user by their username
const getUserByUsername = async (username) => {

    const client = await pool.connect()

    console.log("working 1 - user")

    const resultUsername = await client.query("SELECT * FROM users WHERE username = $1", [username]);

    console.log("working 1 - user " + resultUsername.rows[0])

    return resultUsername;
    
    

}

const getUserBooks = async (id) => {
    const client = await pool.connect();

    const resultUserbooks = await client.query("SELECT * FROM users_books WHERE user_id = $1", [id])

    return resultUserbooks;
}

module.exports = {
    getUserByUsername,
    getUserBooks
};