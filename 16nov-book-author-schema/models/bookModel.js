const mongoose = require('mongoose')
const bookSchema = new mongoose.Schema({


    name: String,
    author_id: {
        type: Number,
        required: true
    },
    price: Number,
    ratings: Number,
},
)
module.exports = mongoose.model('Books', bookSchema)
