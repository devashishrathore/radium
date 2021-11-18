const BookModel = require("../Model/bookModel.js");
const AuthorModel = require("../Model/authorModel.js");

//Task-2
const createBook = async function (req, res) {
    let data = req.body;
    let authorId = req.body.author
    let authorFromRequest = await AuthorModel.findById(authorId)
    if (authorFromRequest) {
        let bookCreated = await BookModel.create(data)
        res.send({ data: bookCreated })
    } else {
        res.send('The author is not valid.')
    }
};

//Task-3
const getBooks = async function (req, res) {
    let allBooks = await BookModel.find().populate('author')
    res.send(allBooks)
}
const createBook = async function (req, res) {
    let data = req.body;
    let authorId = req.body.author
    let publisherId = req.body.publisher
    let authorFromRequest = await AuthorModel.findById(authorId)
    if (authorFromRequest) {
        let bookCreated = await BookModel.create(data)
        res.send({ data: bookCreated })
    } else {
        res.send('The author is not valid.')
    }
};

module.exports.createBook = createBook;
module.exports.getBooks = getBooks