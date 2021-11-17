const mongoose = require('mongoose')
const bookSchema = new mongoose.Schema({

    //String
    //Number
    // Boolean
    // Array
    // Object
    // Date
    // Buffer
    // ObjectId

    bookName: {
        type: String,
        required: true
    },
    ISBN: {
        type: String,
        required: true,
        unique: true
    },
    authorName: String,
    
    tags: [String], //array of strings 
    
    year:{ type : Number,
        default : 2021 },

    stockAvailable: {
        type: Boolean, //Boolean
        default: true
    },
    prices: {
        indianPrice: String,
        europeanPrice: String,
    },
    totalPages: Number,

}, { timestamps: true })

module.exports = mongoose.model('Booknew', bookSchema)