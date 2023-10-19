//Version 1 //

CREATE DATABASE bookstore;

DROP TABLE [IF EXISTS] 
   author_books,
   book,
   author
[CASCADE | RESTRICT];

DROP TABLE IF EXISTS author_books;
DROP TABLE IF EXISTS users_books;
DROP TABLE IF EXISTS author;
DROP TABLE IF EXISTS publisher;
DROP TABLE IF EXISTS genre;
DROP TABLE IF EXISTS book;
DROP TABLE IF EXISTS users;

CREATE TABLE book(
    book_id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description VARCHAR(255) NOT NULL

);

CREATE TABLE users(
    user_id SERIAL PRIMARY KEY,
    username VARCHAR(255) NOT NULL,
    password VARCHAR(60) NOT NULL,
    email VARCHAR(255) NOT NULL
);




CREATE TABLE genre (
    genre_id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    book_id int NOT NULL,

    CONSTRAINT fk_book FOREIGN KEY (book_id) 
    REFERENCES book (book_id) 
    ON DELETE NO ACTION ON UPDATE NO ACTION

    
);

CREATE TABLE publisher (
    publisher_id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    book_id int NOT NULL,

    CONSTRAINT fk_book FOREIGN KEY (book_id) 
    REFERENCES book (book_id) 
    ON DELETE NO ACTION ON UPDATE NO ACTION

);


CREATE TABLE author(
    author_id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL
);

CREATE TABLE author_books(
    author_books_id SERIAL PRIMARY KEY,
    author_id int NOT NULL,
    book_id int NOT NULL,

    UNIQUE (author_id,book_id),
   

    CONSTRAINT fk_author FOREIGN KEY (author_id) 
    REFERENCES author (author_id) 
    ON DELETE NO ACTION ON UPDATE NO ACTION,
    
    CONSTRAINT fk_book FOREIGN KEY (book_id) 
    REFERENCES book (book_id) 
    ON DELETE NO ACTION ON UPDATE NO ACTION
);

CREATE TABLE users_books(
    users_books_id SERIAL PRIMARY KEY,
    user_id int NOT NULL,
    book_id int NOT NULL,

    UNIQUE (user_id,book_id),
   

    CONSTRAINT fk_user FOREIGN KEY (user_id) 
    REFERENCES users (user_id) 
    ON DELETE NO ACTION ON UPDATE NO ACTION,
    
    CONSTRAINT fk_book FOREIGN KEY (book_id) 
    REFERENCES book (book_id) 
    ON DELETE NO ACTION ON UPDATE NO ACTION
);

SELECT * FROM author_books;
SELECT * FROM users_books;
SELECT * FROM book;
SELECT * FROM users;
SELECT * FROM author;
SELECT * FROM publisher;
SELECT * FROM genre;

