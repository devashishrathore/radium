const express = require('express');
const router = express.Router();
const authorController = require('../Controller/authorController')
const bookController = require('../Controller/bookController')
const publisherController = require('../Controller/publisherController')

// Author api
router.post('/authors', authorController.createAuthor)

// Book api
router.post('/createbooks', bookController.createBook)
router.get('/books', bookController.getBooks)

// Publisher api
router.post('/createpublisher', publisherController.createPublisher)

module.exports = router;