const express = require('express');
const index = express();
const cors = require('cors');
const pool = require('./db');
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const BookService = require('./Service/BookService')



//middleware
index.use(express.urlencoded({ extended: false }));
index.use(cors());
index.use(express.json());

//=============================ROUTERS================================
//   will need to be broken down into controller,services, reposistory (pattern) and entities (if needed)
index.listen(5000, function() {
    console.log("Server is running on port " + 5000);
});


//create a user
index.post('/register', async (requst, result) => {

    //recive the user input from the front end request
    const {username, password, email} = requst.body;

    
    console.log("User is 11" + username )
    //check if user is already exist in the database    
    const client = await pool.connect();
    
    const findUser = await client.query('SELECT * from users WHERE username = $1 OR email = $2' , [username, email])

    

    try{
        //statemets to decide whether to reject user or continue creating their account
        if(!findUser.rowCount) {
            
            //bcrypt password   
            const hashedPassword = await bcrypt.hash(password, 10);

          

            //add user to database
            const addUser = await client.query('INSERT INTO users (username, password, email) VALUES ($1, $2, $3)', [username, hashedPassword, email])


            console.log("User is " + username)

            //return condition depending on success
            if(addUser.rowCount){
                result.json({"response" :"Welcome to Book Tracker -- Your Account Has Been Added"})
            }else{
                result.json({"response" :"We in counted an error! Please try again later "})
            }
        }else{
            result.json({"response" :"You Already seem to exist in our system. Please try that account "})
        }
    }catch(e){
        result.json({"response" :"Error: " + e.message})
    }

})

//login a user
index.post('/login', async (requst, result) => {

    //recive the user input from the front end request
    const {username, password, email} = requst.body;

    //check if user is already exist in the database    
    const client = await pool.connect();
    const findUser = await client.query('SELECT * from users WHERE username = $1 OR email = $2' , [username, email])

    //statemets to decide whether to reject user or continue creating their account
    if(findUser.rowCount) {
        
       if(await bcrypt.compare(password,findUser.rows[0].password)) {
            const accessToken = jwt.sign({
                "email":findUser.rows[0].email,
                "password":findUser.rows[0].password    
            }, 'secret-key-shhhh', { expiresIn: '365d'})

            return result.status(200).send({accessToken:accessToken})
       }else{
            result.json({"response" :"Incorrect password"})
       }
    }else{
        result.json({"response" :"Please Create a new account "})
    }

})

//delete a user on users request
index.delete('/user', async (requst, result) => {

    //recive the user input from the front end request
    const {username, password, email} = requst.body;
    const token = requst.headers.authorization && requst.headers.authorization.split(' ')[1]

    console.log("token: " + token)

    jwt.verify(token, 'secret-key-shhhh', async (error, decoded) => { 

        console.log("decoded: " + decoded)

        if(decoded){

            //check if user is already exist in the database    
            const client = await pool.connect();
            const findUser = await client.query('SELECT * from users WHERE username = $1 OR email = $2' , [username, email])

            //statemets to decide whether to reject user or continue creating their account
            if(findUser.rowCount) {
                
                if(await bcrypt.compare(password,findUser.rows[0].password)) {
                    
                    await client.query('DELETE FROM users_books WHERE user_id = $1', [findUser.rows[0].user_id])
                    await client.query('DELETE FROM users WHERE user_id = $1', [findUser.rows[0].user_id])

                    return result.status(200).json({accessToken:"Success"})
                }else{
                    result.status(200).json({response:"Success"})
                }
            }else{
                result.status(200).json({"response" :"An error occurred"})
            }
        }else if(error) {
            result.status(401).json({ error: 'You must have a valid token' })
        }
    })

    

})

//create a book to read

index.post("/book", async (request, result) => {

    try{

       
        
        const resultBookService = await BookService.createABook(request);

        return result.json(resultBookService);
        
        
        

    }catch(err){
        return result.json(err);
    }
})

//get all books
index.get('/books', async (request, result) => {
   
    try{
        const serviceResult = await BookService.getAllBooks();
        return result.json(serviceResult);

    
    }catch(err){
        return result.json(err);
    }
})

//get a book to read

index.get('/book/:title', async(request, result) => {


    try {

        const {title} = await request.params;

        if(title !== undefined){
           const serviceResult = await BookService.getABook(title)
            
           result.json(serviceResult);
        }else{
            throw new Error
        }

    }catch(err) {
        result.json(err.messsage)
    }

})

//update a book to read
index.put('/book', async (request, result) => {

    try{
       
        const {id,title, description} = await request.body;

        if(id !== undefined && title !== undefined && description !== undefined) {
            const resultService = await BookService.updateABook(id, title, description);
            return result.json(resultService);
        }else {
            result.json({"response" :"Please Re-Input your entry!!"})
        }

        
    }catch(error){
        result.json({"response" :"Error updating book =" + error.message})
    }

})

//delete a specific book from service layer
index.delete('/book/:title', async(request, result) => {


    try {

        const {title} = await req.params;

        if(title !== undefined){
            const resultService = await BookService.deleteABook(title);
            
            result.json(resultService);
        
        }else{
            throw new Error
        }

        

    }catch(err) {
        result.json(err.messsage)
    }

})
//delete all book from service layer
index.delete('/books', async(request, result) => {


    try {
        const resultService = await BookService.deleteAllBooks();    
        result.json(resultService);

    }catch(err) {
        result.json(err.messsage)
    }

})





module.exports = index;