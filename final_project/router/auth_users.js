const express = require('express');
const jwt = require('jsonwebtoken');
let books = require("./booksdb.js");
const regd_users = express.Router();

let users = [];

const isValid = (username)=>{ //returns boolean
//write code to check is the username is valid
let usersWithSameName = users.filter((user) => {
  return user.username === username;
});
if (usersWithSameName.length > 0) {
  return true;
} else {
  return false;
}
}

const authenticatedUser = (username,password)=>{ //returns boolean
//write code to check if username and password match the one we have in records.
let validusers = users.filter((user) => {
  return user.username === username && user.password === password;
});
if (validusers.length > 0) {
  return true;
} else {
  return false;
}
}

//only registered users can login
regd_users.post("/login", (req,res) => {
  //Write your code here
  const username = req.body.username;
  const password = req.body.password;

  if (!username || !password) {
    return res.status(404).json({ message: "Error logging in" });
  }

  if (authenticatedUser(username, password)) {
    let accessToken = jwt.sign(
      {
        data: password,
      },
      "access",
      { expiresIn: 100 * 60 * 1000 }
    );

    req.session.authorization = {
      accessToken,
      username,
    };
    return res.status(200).send("User successfully logged in");
  } else {
    return res
      .status(208)
      .json({ message: "Invalid Login. Check username and password" });
  }
});

// Add a book review
regd_users.put("/auth/review/:isbn", (req, res) => {
  //Write your code here
  const isbn = req.params.isbn;
  let book = Object.values(books).filter((a) => {
    return a.isbn === isbn;
  });
  if (book) {
    let review = req.body.reviews;
    if (review) {
      book["reviews"] = review;
    }
    books[isbn] = book;
    console.log(books[isbn]);
    res.send(`Book with the isbn  ${isbn} updated.`);
  } else {
    res.send("Unable to find book!");
  }
});

// Delete a book review
regd_users.delete("/auth/review/:isbn", (req, res) => {
  const isbn = req.params.isbn;
  let book = Object.values(books).filter((a) => {
    return a.isbn === isbn;
  });
  console.log(book)
  if (!book) {
    return res.status(404).send("Book not found.");
  }
  book.reviews = {};
  res.status(200).send(`Reviews of the book with ISBN ${isbn} deleted.`);
});

module.exports.authenticated = regd_users;
module.exports.isValid = isValid;
module.exports.users = users;
