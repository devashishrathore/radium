const BookModel = require("../models/bookModel.js");
const AuthorModel = require("../models/authorModel.js");
const mongoose = require("mongoose");

//Task-1
const createBook = async function (req, res) {
  const book = req.body;
  let savedBook = await BookModel.create(book);
  res.send({ msg: savedBook });
};

// Task-2 
const getlistOut = async function (req, res) {
  let allBooks = await BookModel.find({author_id: 1}).select({name:1, _id:0});
  res.send({ msg: allBooks });
};

// Task-3 16nov
const changePrice = async function (req, res) {
  let savedData = await UserModel.findOneAndUpdate({ name: "Two states" }, { price: 100 }, { new: true })
  let data = await UserModel1.findOne({ author_id: savedData.author_id })
  res.send({ "updatedPrice": savedData.price, "authorName": data.author_name })
};

// Task-4 
const FindBooks = async function (req, res) {
  let book = await BookModel.find({ price: { $gt: 49, $lt: 101 } }).select({ author_id: 1, _id: 0 })
  let auth = await AuthorModel.find({ book }).select({ author_name: 1, _id: 0 })
  res.send({ auth })
}

module.exports.createBook = createBook;
module.exports.getlistOut = getlistOut;
module.exports.changePrice = changePrice;
module.exports.FindBooks = FindBooks;

// const updateBooks = async function (req, res) {
  //   let books = await BookModel.updateMany (  {isPublished: false } ,  {author : "PK"}   );  // first json is the query condition  || second condition is the required update or change
  //   let books = await BookModel.findOneAndUpdate(  {isPublished: true } ,  {author : "Sabiha"}   );  // it updates only the first matching doc
  //   let books = await BookModel.findOneAndUpdate(  {isPublished: true } ,  {author : "Sabiha 3"} , { new: true}  );  // third param : new: true - will give you the updated document

  //  upsert: true - it finds and updates the document but if the doc is not found(i.e it does not exist) then it creates a new document
  // let books = await BookModel.findOneAndUpdate({ bookName: "Hi Pritesh2" }, { bookName: "Hi My New Book", ISBN: "basd87g8h7a88b" }, { upsert: true });

  //   { author : "PK" }
  //   { $set: {author: "PK"}   }
  // res.send(books); };


 //const deleteBook = async function (req, res) {
  //let books = await BookModel.findOneAndUpdate(req.body, { isDeleted: true });
  //res.send(books); };

