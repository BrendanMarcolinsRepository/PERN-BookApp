
//----------Service Book Layer --------------------
//get all books from the resposistory layer
const BookReposistory = require('../Reposistory/BookReposistory')

const getAllBooks = async () => {

    const resultRepository = await BookReposistory.getAllBooks()

    console.log("herer "  + resultRepository.rowCount)

    if(resultRepository.rowCount > 0){
        return {"response" :"Got All Books","result" : resultRepository}
    }else{
        return {"response" :"No Books Currently"}
    }

}

//get a specific book
const getABook = async (title) => {

   if(title !== undefined){

        const resultRepository = await BookReposistory.getABook(title);

        if(resultRepository.rowCount > 0){
            return resultRepository.rows[0];
        }else{
            return undefined;
        }

   }else{

        return undefined;
   }


}

//get a specific book by Id
const getABookById = async (id) => {

    if(id){
 
         const resultRepository = await BookReposistory.getABookById(id);
 
         return resultRepository;
 
    }else{
 
         return undefined;
    }
 
 
 }

//create a specific book for the resposistory layer

const createABook = async (request) => {


    if(request.body !== undefined){

        console.log("working 1")

        const resultRepository = await BookReposistory.createBook(request)

        

        if(resultRepository){
            return {"response" :"Book has been created"}
        }else{
            return {"response" :"Book already exists in your library"};
        }
    }else{
        return {"response" :"We ecounteded an error. Please try again later"};
    }    
}

//update/put a specific book from the resposistory layer

const updateABook = async (id,title, description) => {

    const resultRepository = await BookReposistory.getABook(id,title, description)

    if(resultRepository){
           
        return {"response" :"Book has been updated"}

    }else {
        return {"response" :"Book Does Not Exist"}
    }

}

//add a book and book to a publisher 
const publisherAndBookCreate = async(publisher, book_id) => {

    if(publisher){
        const userReposistoryResult = await PublisherRepository.publisherAndBookCreate(publisher, book_id)


        if(userReposistoryResult){
           
            return {"response" :"Book has been updated"}
    
        }else {
            return {"response" :"Book Does Not Exist"}
        }

    }

}


//delete a specific book from respository layer
const deleteABook = async (title) => {
    
    const resultRepository = await BookReposistory.deleteABook(title);

    if(resultRepository.result){
        return {"response" :"Book Has Been Deleted Added"}
    }else{
        return {"response" :"Book Has Not Been Deleted"}
    }

}

//delete all books from reposistory layer
const deleteAllBooks = async () => {

    
    
    const resultRepository = await BookReposistory.deleteAllBooks();
    
    console.log("resultRepository result " + resultRepository);

    if(resultRepository){
        return {"response" :"All Books Have Been Deleted"}
    }else{
        return {"response" :"No Books To Delete"}
    }

}

module.exports = {getAllBooks, getABook, updateABook, deleteABook, deleteAllBooks,createABook, publisherAndBookCreate, getABookById};
