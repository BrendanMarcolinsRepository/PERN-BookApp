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

module.exports = {
    getUserByUsername
};