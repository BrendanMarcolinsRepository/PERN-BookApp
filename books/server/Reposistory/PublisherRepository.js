const pool = require('../db');



const publisherExist = async (publisher) => {

    const client = await pool.connect()

    console.log("working 3 2")

    const publisherExist = await client.query("SELECT * FROM publisher WHERE title = $1", [publisher])

    console.log("working 3 3 =====" + publisherExist.rows[0])

    return publisherExist;


}

module.exports = {
    publisherExist
}