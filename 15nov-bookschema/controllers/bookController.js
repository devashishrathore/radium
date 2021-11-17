const BookModel = require("../models/bookModel.js")
const mongoose = require("mongoose")

// Task 1- Create a collection of 11+ books.
const createBook = async function (req, res) {
    const book = req.body
    let savedBook = await BookModel.create(book)
    res.send({ msg: savedBook })
};

// Task 2- return all the bookName and authorName only.
const getBooksData = async function (req, res) {
    let bookList = await BookModel.find().select({ bookName: 1, authorName: 1, _id: 0 });
    res.send({ msg: bookList })
};

// Task 3- Return all those bookName which published in a inputed year
const yearDetails = async function (req, res) {
    let getBooksInYear = await BookModel.find(req.body.year);
    res.send({ msg: getBooksInYear })
};

// Task 4- send the reponse after satisfying the condition to bookName and year.
const particularBook = async function (req, res) {
    let getParticularBooks = await BookModel.find(req.body);
    res.send({ msg: getParticularBooks })
    console.log(getParticularBooks)
};

// Task 5- send bookName of those book only which have indianprice of 100 inr or 200 inr or 500 inr.
const priceDetails = async function (req, res) {
    let getXINRBooks = await BookModel.find({ 'prices.indianPrice': { $in: ["100INR", "200INR", "500INR"] } });
    res.send({ msg: getXINRBooks })
    console.log(getXINRBooks)
};

//Task 6- Send the details of those books which are in stock or having more than 500 pags.
const randomBooks = async function (req, res) {
    let getRandomBooks = await BookModel.find({ $or: [{ stockAvailable: true }, { totalPages: { $gt: 500 } }] })
    res.send({ msg: randomBooks })
    console.log(getRandomBooks)
};

module.exports.createBook = createBook;
module.exports.getBooksData = getBooksData;
module.exports.yearDetails = yearDetails;
module.exports.particularBook = particularBook;
module.exports.priceDetails = priceDetails;
module.exports.randomBooks = randomBooks;


//and is when all the conditions have to be true
// or is when even if any condition is true , it is included
// let allBooks= await BookModel.find( { sales: 0 , isPublished : false} )
// let allBooks= await BookModel.find(  {  $or: [ {sales: 0} , {isPublished : false} ]  } )  
// let allBooks= await BookModel.find(  {  $or: [ {sales: 0} , {isPublished : false} ]  }  ).count()             
//  allBooks= await SalesModel.find({phoneName: "OnePlus7", createdAt: {$gt:"21-03-1999"}  }  ).count()             

// let allBooks= await BookModel.find( {  sales:   { $gt: 10}     }  )
// let allBooks= await BookModel.find( {  sales:   { $lt: 10}     }  )

// let allBooks= await BookModel.find( {  sales:   { $gte: 10   }    }  )
// let allBooks= await BookModel.find( {  sales:   { $lte: 10   }    }  )

// let allBooks= await BookModel.find( {  sales:   { $ne: 0   }    }  )
// let allBooks= await BookModel.find( {  sales:   { $in: [ 0, 100, 4 , 1 ,2 ,3]   }     }  )
// let allBooks= await BookModel.find( {  sales:   { $nin: [ 0, 100, 4 , 1 ,2 ,3]   }     }  )


// let allBooks= await BookModel.find( ).sort(  { bookName: 1 } ) //ascending sort

// let allBooks= await BookModel.find( {  sales:   { $gt: 0   }    }  ).sort(  { bookName: -1 } ) //descending sort :-1

// let allBooks= await BookModel.find( {  sales:   { $gt: 0   }    }  ).sort(  { bookName: 1 } ).limit(2) //limit will give only next 2 elements

// let allBooks= await BookModel.find( {  sales:   { $gt: 0   }    }  ).sort(  { bookName: 1 } ).limit(2).skip( 3 ) //SKIP is used for pagination
// let allBooks= await BookModel.find( {  sales: { $gt: 0   }  } ).select( { bookName: 1, sales: 1, _id: 0 } )

// let allBooks= await BookModel.findById(     mongoose.Types.ObjectId('61922aacac5fa8b15518d590') )

// REGULAR EXPRESSIONS(regex) : 

// let allBooks= await BookModel.find( {  bookName: /.*Node.*/i   } ) //has the word Node 
// let allBooks= await BookModel.find( {  bookName: /Node$/i   } ) //ends with Node
// let allBooks= await BookModel.find( {  bookName: /^Intro/i   } ) //starts with Node

//let allBooks = await BookModel.find({ "prices.europeanPrice": "4Pounds" }) // without await, this line will start to get executed..but the server will move to next line without COMPLETING the execution..this might cause code to break in the next few lines
// hence we use await to ask the program to wait for the completion of this line..till this line completes, execution wont move to next line

// await is typically used at 2 places:
//- intearacting with database
//- calling another service (axios)..will be covered next week

//NOTE: await can not be used inside array functions like forEach / map / filter etc..self discovery and do post 

//res.send({ msg: allBooks })