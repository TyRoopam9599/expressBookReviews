const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();


public_users.post("/register", (req,res) => {
  //Write your code here
  const username = req.body.username;
  const password = req.body.password;

  if (username && password) {
    if (!isValid(username)) {
      users.push({ username: username, password: password });
      return res
        .status(200)
        .json({ message: "Registered Successfully!. Now you can login" });
    } else {
      return res.status(404).json({ message: "User already exists!" });
    }
  }
  return res.status(404).json({ message: "Unable to register user." });
});

// Get the book list available in the shop
public_users.get('/',function (req, res) {
  //Write your code here
  return res.status(200).send(JSON.stringify(books, null, 4));
});

// Get book details based on ISBN
public_users.get('/isbn/:isbn',function (req, res) {
  //Write your code here
  const isbn = req.params.isbn;
  let isbnBooks = Object.values(books).filter((book) => {
    return book.isbn === isbn;
  });
  console.log(isbnBooks);
  return res.status(200).send(isbnBooks);
});
  
// Get book details based on author
public_users.get('/author/:author',function (req, res) {
  //Write your code here
  const author = req.params.author;
  let authers = Object.values(books).filter((book) => {
    return book.author === author;
  });
  return res.status(200).send(authers);
});

// Get all books based on title
public_users.get('/title/:title',function (req, res) {
  //Write your code here
  const title = req.params.title;
  let titles = Object.values(books).filter((book) => {
    return book.title === title;
  });
  return res.status(200).send(titles);
});

//  Get book review
public_users.get('/review/:isbn',function (req, res) {
  //Write your code here
  const isbn = req.params.isbn;
  console.log(isbn);
  const book = Object.values(books).find((a) => {
    return a.isbn === isbn;
  });
  if (!book) {
    return res.status(404).send("Book not found");
  }
  if (!book.reviews || Object.keys(book.reviews).length === 0) {
    return res.status(200).send("No reviews available for this book");
  }
  const reviews = book.reviews;
  console.log(reviews);
  return res.status(200).send(reviews);
});

module.exports.general = public_users;
