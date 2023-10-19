const AuthorReposistory = require('../Reposistory/AuthorReposistory');

const getAnAuthor = async (author) => {

    if(author){

        const resultRepository = await AuthorReposistory.getAnAuthor(author)

        console.log("working 2 ==  " + resultRepository.rows[0])

        if(resultRepository.rows[0]){
            console.log("working 2 ==  d" + resultRepository.rows[0])
            return resultRepository.rows[0]
        }else{
            console.log("working 2 ==  d2")
            return undefined;
        }
    }else{
        return undefined;
    }    


}

const insertAnAuthor = async (author) => {

    if(author){

        const resultRepository = await AuthorReposistory.insertAnAuthor(author)

        console.log("working 222 ==  d" + resultRepository.rows[0])

        if(resultRepository.rows[0]){
            return resultRepository.rows[0];

        }else{
            return undefined;
        }

        
    }else{
        return undefined;
    }    
    
}


module.exports = {
    getAnAuthor,
    insertAnAuthor
}