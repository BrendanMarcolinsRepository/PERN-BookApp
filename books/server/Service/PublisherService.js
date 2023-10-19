const PublisherRepository = require("../Reposistory/PublisherRepository");


const publisherExist = async(publisher) => {

    console.log("working 3 -- " + publisher)

    if(publisher){

        console.log("working 3")
        const publisherReposistoryResult = await PublisherRepository.publisherExist(publisher);

        console.log("working 3 3 =====" + publisherReposistoryResult.rows[0])
        if(publisherReposistoryResult.rows[0]){

            console.log("working 3 done")

            return publisherReposistoryResult.rows[0];
        }else{

            console.log("working 3 done!!!!!")
            return undefined;
        }
    }
}



module.exports = {
    publisherExist
};