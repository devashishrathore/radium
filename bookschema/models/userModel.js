const mongoose=require('mongoose')

const bookSchema=new mongoose.Schema({

    bookName: {
        type : String,
        required : true,
    },
    ISBN: {
        type: String,
        unique: true,
        required: true,
    },
    
    authorName: String,
    category: String, 
    year : Number,


    // isIndian: Boolean,
    // parentsInfo : { motherName: String, fatherName: String , siblingName: String },
    // cars: [ String ]

}, {timestamps: true} )

 module.exports=mongoose.model('Book',bookSchema)
 //module.exports=mongoose.model('User',userSchema)
// String, Number
// Boolean, Object/json, array