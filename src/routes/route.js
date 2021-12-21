const express = require('express');
const router = express.Router();

//Imported controllers files and models files with middlewares.
const userController = require("../controllers/userController")
const bookController = require("../controllers/bookController")
const reviewController = require("../controllers/reviewController")
const middleware = require("../middlewares/auth")

//User APIs --> To Register & login.
router.post('/register', userController.userCreation)
router.post('/login', userController.loginUser)

//Books APIs --> Protected. => create , fetch (all books & by Id), update & delete .
router.post('/books', middleware.userAuth, bookController.bookCreation)
router.get('/books', middleware.userAuth, bookController.fetchAllBooks)
router.get('/books/:bookId', middleware.userAuth, bookController.fetchBooksById)
router.put('/books/:bookId', middleware.userAuth, bookController.updateBookDetails)
router.delete('/books/:bookId', middleware.userAuth, bookController.deleteBook)
router.post('/bookcoverurl', bookController.bookCoverUrl)

//Reviews APIs --> To Add review , update review & delete review.
router.post('/books/:bookId/review', reviewController.addReview)
router.put('/books/:bookId/review/:reviewId', reviewController.updateReview)
router.delete('/books/:bookId/review/:reviewId', reviewController.deleteReview)

module.exports = router;