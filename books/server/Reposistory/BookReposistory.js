

//----------Reposistory Layer --------------------
//Get All Books from the database
const pool = require('../db');
const PublishService = require('../Service/PublisherService');
const AuthorService = require('../Service/AuthorService');
const GenreService = require('../Service/GenreService');
const UserService = require('../Service/UserService');


const getAllBooks = async () => {
    return await pool.query("SELECT * FROM book");
}

const getABook = async (title) => {

    const client = await pool.connect()

    const resultDatabase = await client.query("SELECT * FROM book WHERE title = $1", [title]);
    
    return resultDatabase


}

const getABookById = async (id) => {

    const client = await pool.connect()

    const resultDatabase = await client.query("SELECT * FROM book WHERE book_id = $1", [id]);
    
    return resultDatabase


}

//create a specific book for the database layer
const createBook = async (request) => {

    const {username,title, description, author, publisher, genre} = await request.body;

    const client = await pool.connect()
    let bookExist = await client.query("SELECT * FROM book WHERE title = $1", [title])
    let responseBook = bookExist.rows[0];

    if(responseBook !== undefined){

        return false;

    }else{

        const usernameSeachResult = await UserService.getUserByUsername(username)

        

        if(usernameSeachResult !== undefined){

            console.log("working 2")
            
            const bookInsertReturnResult = await client.query(
                "INSERT INTO book (title, description) VALUES ($1,$2) RETURNING *", 
                [ title, description]
            )

            

            const bookUserInsert = await client.query(
                "INSERT INTO users_books (user_id, book_id) VALUES ($1,$2) RETURNING *",[usernameSeachResult.user_id,bookInsertReturnResult.rows[0].book_id] 
            )
            
            const publisherExist = await PublishService.publisherExist(publisher)

            if(publisherExist === undefined){
                publisherAndBookCreate(publisher, bookInsertReturnResult.rows[0].book_id)
            }
    
           
            const genreExist = await GenreService.genreExist(genre);
            
            if(genreExist === undefined){
                genreAndBookCreate(genre, bookInsertReturnResult.rows[0].book_id)
            }
    
            let authorInsertReturnResult = await AuthorService.getAnAuthor(author)

            console.log("working 2 ==  " + authorInsertReturnResult)

            if(authorInsertReturnResult === undefined){

                console.log("working 22 ==  ")
                authorInsertReturnResult =  AuthorService.insertAnAuthor(author)
            }

        
            const newAuthorBooks = await client.query(
                "INSERT INTO author_books (author_id, book_id) VALUES ($1,$2)" ,[authorInsertReturnResult.author_id, bookInsertReturnResult.rows[0].book_id],
            )

                console.log("working 6")
            return true;
        }else{
            return false;
        }
        
        
    }


}

//update/put a specific book from the database layer

const updateABook = async (id,title, description) => {
    const client = await pool.connect()

    const resultDatabase = await client.query("UPDATE book SET title = $1, description = $2 WHERE book_id = $3", [title, description, id])

    return resultDatabase;


}


//delete a specific book from the database layer

const deleteABook = async (title) => {
    const client = await pool.connect()

    const getABook = await this.getABook(title);

    if(getABook){

        const resultDeleteFromAuthor_Book = await client.query("DELETE FROM author_books WHERE book_id = $1 IS TRUE RETURNING *", [getABook.rows[0].book_id]);
        const resultDeleteFromBook = await client.query("DELETE FROM book WHERE title = $1 IS TRUE RETURNING *", [title]);


        if(resultDeleteFromBook.rowCount && resultDeleteFromAuthor_Book.rowCount){
            return true;
        }else{
            return false;
        }
    }else{
        return false;
    }

}

//delete all books from database layer
const deleteAllBooks = async () => {
    
    const client = await pool.connect()

    //will be replaced in the future with other request from different services
    //------------------------------------------------------------------------------------------------
    await client.query("DELETE FROM author_books RETURNING *");
    await client.query("DELETE FROM genre *")
    await client.query("DELETE FROM publisher *")
    //------------------------------------------------------------------------------------------------
    
    const resultDeleteFromBook = await client.query("DELETE FROM book RETURNING *");

    if(resultDeleteFromBook){
        return true;
    }else{
        return false;
    }


}

const publisherAndBookCreate = async(publisher, book_id) => {

    console.log("working 3 == " + publisher + book_id)

    const client = await pool.connect()

    const publisherAndBookCreateResult = await client.query("INSERT INTO publisher (title, book_id) VALUES ($1, $2)",[publisher, book_id])

    if(publisherAndBookCreateResult){
        return true;
    }else{
        return false;
    }
}

const genreAndBookCreate = async(genre, book_id) => {

    const client = await pool.connect()
    const result = await client.query(
        "INSERT INTO genre (title, book_id) VALUES ($1, $2)",[genre, book_id]
    )

    if(result){
        return true;
    }else{
        return false;
    }
}


module.exports = {
    getAllBooks,
    getABook, 
    updateABook, 
    deleteABook, 
    deleteAllBooks, 
    createBook,
    publisherAndBookCreate,
    genreAndBookCreate,
    getABookById
};
