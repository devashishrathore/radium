const mongoose = require('mongoose')
const user1Schema = new mongoose.Schema({


    name: {
        type: String,
        unique: true,
        required: true
    },
    mobile: {
        type: Number,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    isDeleted: {
        type: Boolean,
        default: false
    }
}
)
module.exports = mongoose.model('User1', user1Schema)