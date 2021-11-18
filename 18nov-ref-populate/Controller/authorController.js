const AuthorModel = require("../Model/authorModel.js");

//Task-1
const createAuthor = async function (req, res) {
    const data = req.body;
    let authorCreated = await AuthorModel.create(data);
    res.send({ data: authorCreated });
};

module.exports.createAuthor = createAuthor;