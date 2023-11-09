const UserReposistory = require('../Reposistory/UserReposistory');

const getUserByUsername = async (username) => {

    console.log("working 1")

    if(username){

        console.log("working 1")

        const userReposistoryResult = await UserReposistory.getUserByUsername(username);

        console.log("working 1 -- username == " + userReposistoryResult.rows[0].user_id  )
    
        return userReposistoryResult.rows[0];
    }

}

const getUserBooks = async (id) => {

    if(id){
        const userBooks = await UserReposistory.getUserBooks(id);

        console.log("working 2 - user id " + userBooks.rows[0].user_id )


        return userBooks;
    }

}

module.exports = {
    getUserByUsername,
    getUserBooks
};