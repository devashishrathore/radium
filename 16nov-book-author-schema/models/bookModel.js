const mongoose = require('mongoose')
const bookSchema = new mongoose.Schema({


    name:String,
    author_id: {
        type: Number,
        unique: true
    },
    price: Number,
    ratings: Number,
},
)
module.exports = mongoose.model('BooksAuthor', bookSchema)
