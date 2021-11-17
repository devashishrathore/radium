const express = require('express');
const router = express.Router();
const UserModel= require("../models/bookModel")
const BookController= require("../controllers/bookController")


router.post('/createBook',  BookController.createBook  );
router.get('/bookList',  BookController.getBooksData  );
router.post('/getBooksInYear', BookController.yearDetails);
router.post('/getParticularBooks', BookController.particularBook);
router.get('/getXINRBooks',BookController.priceDetails);
router.get('/getRandomBooks',BookController.randomBooks);


module.exports = router;