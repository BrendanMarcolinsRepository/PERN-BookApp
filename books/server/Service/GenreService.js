const GenreRepository = require("../Reposistory/GenreReposistory")

const genreExist = async(genre) => {

    if(genre){

        const genreReposistoryResult = await GenreRepository.genreExist(genre);

        if(genreReposistoryResult.rows[0]){
            return genreReposistoryResult.rows[0];
        }else{
            return undefined;
        }
    }else{
        return null;
    }


}

module.exports = {
    genreExist
}