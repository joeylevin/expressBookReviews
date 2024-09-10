const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();

const doesExist = (username) => {
    let userswithsamename = users.filter((user) => {
        return user.username === username;
    });
    if (userswithsamename.length > 0) return true;
    else return false;
}


public_users.post("/register", (req,res) => {
    const username = req.body.username;
    const password = req.body.password;

    if (username && password) {
        if (!doesExist(username)) {
            users.push({"username": username, "password": password});
            return res.status(200).json({message: "User successfully registered. Now you can login"});
        } else {
            return res.status(404).json({message: "User already exists!"});
        }
    }
    return res.status(404).json({message: "Unable to register user."});
});

// Get the book list available in the shop
public_users.get('/',function (req, res) {
    res.send(JSON.stringify(books, null, 4));
});

//Get book list using promises
// public_users.get('/books', function (req, res) {
//     const getBooks = new Promise((resolve, reject) => {
//         resolve(res.send(JSON.stringify(books, null, 4)));
//     });
//     getBooks.then(() => console.log("Task 10 Resolved"));
// })

// Get book details based on ISBN
public_users.get('/isbn/:isbn',function (req, res) {
    const isbn = req.params.isbn;
    res.send(books[isbn]);
 });

 //Get book details using promises
//  public_users.get('/isbn/:isbn',function (req, res) {
//     const getBook = new Promise((resolve, reject) => {
//         const isbn = req.params.isbn;
//         resolve(res.send(books[isbn]));
//     });
//     getBook.then(() => console.log("Task 11 Resolved"));
//  });
  
// Get book details based on author
public_users.get('/author/:author',function (req, res) {
    const author = req.params.author;
    let filtered = {};
    Object.keys(books).forEach((key) => {
        const book = books[key];
        if (book.author === author) {
            filtered[key] = book;
        }
    })
    res.send(filtered);
});

// Get book based on author using promises
// public_users.get('/author/:author',function (req, res) {
//     const getBooks = new Promise((resolve, reject) => {
//         const author = req.params.author;
//         let filtered = {};
//         Object.keys(books).forEach((key) => {
//             const book = books[key];
//             if (book.author === author) {
//                 filtered[key] = book;
//             }
//         })
//         resolve(res.send(filtered));
//     });
//     getBooks.then(() => console.log("Task 12 Resolved"));
// });

// Get all books based on title
public_users.get('/title/:title',function (req, res) {
    const title = req.params.title;
    let filtered = {};
    Object.keys(books).forEach((key) => {
        const book = books[key];
        if (book.title === title) {
            filtered[key] = book;
        }
    })
    res.send(filtered);
});

// Get all books based on title using promises
// public_users.get('/title/:title',function (req, res) {
//     const getBook = new Promise((resolve, reject) => {
//         const title = req.params.title;
//         let filtered = {};
//         Object.keys(books).forEach((key) => {
//             const book = books[key];
//             if (book.title === title) {
//                 filtered[key] = book;
//             }
//         })
//         resolve(res.send(filtered));
//     });
//     getBook.then(() => console.log("Task 13 Resolved"));
// });

//  Get book review
public_users.get('/review/:isbn',function (req, res) {
    const isbn = req.params.isbn;
    res.send(books[isbn].reviews);
});

module.exports.general = public_users;
