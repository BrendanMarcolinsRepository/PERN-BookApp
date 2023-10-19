

const index = require('../server/index');

const request = require("supertest");
const express = require("express");
const app = express();

app.use(express.urlencoded({ extended: false }));
app.use("/", index);

jest.setTimeout(60000)

test("Get All books when exist", async () => {

    await request(app)
        .get("/books")
        .expect({"response" :"Got All Books"})  
        .expect(200)
})

test("Get All books when none exist", async () => {

    const result = {
        "title" : "Snow Crash",
        "description" : "fictional historical ww2 - mix with computer science",
        "author" : "Neil Stephenson",
        "publisher" : "Pengiun",
        "genre" : "fictional"
    }

    await request(app)
        .get("/books")
        .expect({"response" :"No Books Currently","result" : result}, )  
        .expect(200)
})

test("Search for a particular that does exist book", async () => {

    await request(app)
        .get("/book/Snow Crash")
        .expect({
            book_id : 1,
            title : "Snow Crash",
            description : "fictional historical ww2 - mix with computer science",  
        })
        .expect(200)
})

test("Search for a particular that doesn't exist book", async () => {

    await request(app)
        .get("/book/1984")
        .expect({"response" :"Book doesn't exist"}) 
        .expect(200)
})

test("Add a particular book that already exist", async () => {

    const server = {
        "title" : "Snow Crash",
        "description" : "fictional historical ww2 - mix with computer science",
        "author" : "Neil Stephenson",
        "publisher" : "Pengiun",
        "genre" : "fictional"
    }
    

    await request(app)
        .post("/book")
        .send(server)
        .expect({"response" :"Book Already Exists"})
        .expect(200)
        
    
})

test("Add a particular book that doesn't exist", async () => {

    const server = {
            "title" : "Termination Shock",
            "description" : "fictional historical ww2 - mix with computer science",
            "author" : "Neil Stephenson",
            "publisher" : "Pengiun",
            "genre" : "fictional"
    }
    
    await request(app)
        .post("/book")
        .send(server)
        .expect({"response" :"Book Has Been Added"})
        .expect(200)
})

test("Update a particular book that does exist", async () => {

    const server = {
        "id": 1,
        "title" : "Cryptonomicon",
        "description" : "fictional historical ww2 - mix with computer science"
            
    }
    
    await request(app)
        .put("/book")
        .send(server)
        .expect({"response" :"Book has been updated"})
        .expect(200)
})

test("Update a particular book that doesn't exist", async () => {

    const server = {
        "id": 10,
        "title" : "Cryptonomicon 2",
        "description" : "fictional historical ww2 - mix with computer science"
            
    }
    
    await request(app)
        .put("/book")
        .send(server)
        .expect({"response" :"Book Does Not Exist"})
        .expect(200)
})

test("Delete a book that doesn't exist", async () => {

    await request(app)
    .delete("/book/1984")
    .expect({"response" :"Book Has Not Been Deleted"})
    .expect(200)

})

test("Delete a book that does exist", async () => {

    await request(app)
    .delete("/book/Termination Shock")
    .expect({"response" :"Book Has Been Deleted Added"})
    .expect(200)

})

test("Delete all books that do exist", async () => {

    await request(app)
    .delete("/books")
    .expect({"response" :"All Books Have Been Deleted"})
    .expect(200)

})

test("Attempt to delete all books when none exist", async () => {

    await request(app)
    .delete("/books")
    .expect({"response" :"All Books Have Been Deleted"})
    .expect(200)

})

