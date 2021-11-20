const mongoose = require("mongoose");
const AuthorModel = require("../models/authorModel.js");


const createAuthor = async function (req, res) {
  const author = req.body;
  let savedauthor = await AuthorModel.create(author);
  res.send({ msg: savedauthor });
};

module.exports.createAuthor = createAuthor;