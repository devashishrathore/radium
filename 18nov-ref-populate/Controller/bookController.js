const BookModel = require("../Model/bookModel.js");
const AuthorModel = require("../Model/authorModel.js");
const PublisherModel = require("../Model/publisherModel.js");

//Task-2
/*const createBook = async function (req, res) {
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
*/
//Task-3
const getBooks = async function (req, res) {
    let allBooks = await BookModel.find().populate('author')
    res.send(allBooks)
}

//Task-5-request (Update with only requirement detils- _id, author_name and age only)
const authorBooks = async function (_req, res) {
    let allBooks = await BookModel.find().populate('author','author_name _id age')
     // only return the Persons name
    res.send(allBooks)
};

//Task-4
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
    let publisherFromRequest = await PublisherModel.findById(publisherId)
    if (publisherFromRequest) {
        let bookCreated = await BookModel.create(data)
        res.send({ data: bookCreated })
    } else {
        res.send("publisherId is not valid")
    }
};
module.exports.authorBooks = authorBooks;
module.exports.createBook = createBook;
module.exports.getBooks = getBooks