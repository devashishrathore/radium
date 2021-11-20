const mongoose = require('mongoose')
const express = require('express');
const router = express.Router();
const BookController = require("../controllers/bookController")
const AuthorController = require("../controllers/authorController")

router.post('/createBook', BookController.createBook);
router.post('/createAuthor', AuthorController.createAuthor);
router.get('/getlistOut', BookController.getlistOut);
router.get('/changePrice', BookController.changePrice);
router.get('/FindBook', BookController.FindBooks);

module.exports = router;