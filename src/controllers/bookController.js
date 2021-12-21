const bookModel = require("../models/bookModel")
const userModel = require("../models/userModel")
const validator = require('../validators/validator')
const reviewModel = require('../models/reviewModel')
const validateDate = require("validate-date");
const aws = require("aws-sdk")

aws.config.update({
    accessKeyId: "AKIAY3L35MCRRMC6253G",  // id
    secretAccessKey: "88NOFLHQrap/1G2LqUy9YkFbFRe/GNERsCyKvTZA",  // like your secret password
    region: "ap-south-1" // Mumbai region
});


// this function uploads file to AWS and gives back the url for the file
let uploadFile = async (file) => {
    return new Promise(function (resolve, reject) { // exactly 

        // Create S3 service object
        let s3 = new aws.S3({ apiVersion: "2006-03-01" });
        var uploadParams = {
            ACL: "public-read", // this file is publically readable
            Bucket: "classroom-training-bucket", // HERE
            Key: "devashish/" + file.originalname, // HERE
            Body: file.buffer,
        };

        // Callback - function provided as the second parameter ( most oftenly)
        s3.upload(uploadParams, function (err, data) {
            if (err) {
                return reject({ "error": err });
            }
            console.log(data)
            console.log(`File uploaded successfully. ${data.Location}`);
            return resolve(data.Location); //HERE 
        });
    });
};
let bookCoverUrl = async function (req, res) {
    try {
        let files = req.files;
        if (files && files.length > 0) {
            //upload to s3 and return true..incase of error in uploading this will goto catch block( as rejected promise)
            let uploadedFileURL = await uploadFile(files[0]); // expect this function to take file as input and give url of uploaded file as output 
            res.status(201).send({ status: true, data: uploadedFileURL });

        }
        else {
            res.status(400).send({ status: false, msg: "No file to write" });
        }
    }
    catch (e) {
        console.log("error is: ", e);
        res.status(500).send({ status: false, msg: "Error in uploading file to s3" });
    }
};
//creating book
const bookCreation = async function (req, res) {
    try {
        let requestBody = req.body;
        const { title, excerpt, userId, ISBN, category, subcategory, bookCover, releasedAt } = requestBody

        //Validation starts
        if (!validator.isValidRequestBody(requestBody)) { //for empty req body.
            return res.status(400).send({ status: false, message: 'Invalid request parameters. Please provide book details' })
        }

        if (!validator.isValid(title)) {
            return res.status(400).send({ status: false, message: "Title must be present" })
        };
        if (!validator.isValid(excerpt)) {
            return res.status(400).send({ status: false, message: "excerpt must be present" })
        };
        if (!validator.isValid(userId)) {
            return res.status(400).send({ status: false, message: "userId must be present" })
        };
        if (!validator.isValid(ISBN)) {
            return res.status(400).send({ status: false, message: "ISBN must be present" })
        };
        if (!validator.isValid(category)) {
            return res.status(400).send({ status: false, message: "category must be present" })
        };
        if (!validator.isValid(subcategory)) {
            return res.status(400).send({ status: false, message: "subcategory must be present" })
        };
        if (!validator.isValid(bookCover)) {
            return res.status(400).send({ status: false, message: "bookCover must be present" })
        };
        if (!validator.isValid(releasedAt)) {
            return res.status(400).send({ status: false, message: "releasedAt must be present" })
        };
        if (!validator.isValidObjectId(userId)) {
            return res.status(400).send({ status: false, message: `Invalid userId.` })
        }

        if (!validateDate(releasedAt, responseType = "boolean")) {
            return res.status(400).send({ status: false, message: `Invalid date format. Please provide date as 'YYYY-MM-DD'.` })
        }
        //validation ends.

        //searching title & ISBN in database to maintain their uniqueness.
        const titleAlreadyUsed = await bookModel.findOne({ title: title })
        if (titleAlreadyUsed) {
            return res.status(400).send({ status: false, message: "Title is already used. Try a new title." })
        }
        const isbnAlreadyUsed = await bookModel.findOne({
            ISBN: ISBN
        });
        if (isbnAlreadyUsed) {
            return res.status(400).send({ status: false, message: "ISBN already used. Try a new ISBN." })
        }

        //Verifying user -> If not verified then won't be able to create a book.
        const user = await userModel.findById(userId)
        if (!user) {
            return res.status(400).send({ status: false, message: `User does not exists` })
        }
        if (userId != req.userId) {
            return res.status(403).send({
                status: false,
                message: "Unauthorized access."
            })
        }
        const newBook = await bookModel.create(requestBody);
        return res.status(201).send({ status: true, message: "Book created successfully", data: newBook })
    } catch (err) {
        return res.status(500).send({ status: false, message: "Something went wrong", Error: err.message })
    }
}

//fetching all books.
const fetchAllBooks = async function (req, res) {
    try {
        const queryParams = req.query
        const {
            userId,
            category,
            subcategory
        } = queryParams

        //Validation for invalid userId in params
        if (!validator.validatingInvalidObjectId(userId)) {
            return res.status(400).send({ status: false, message: "Invalid userId in params." })
        }

        //Combinations of query params.
        if (userId || category || subcategory) {

            let obj = {};
            if (userId) {
                obj.userId = userId
            }
            if (category) {
                obj.category = category;
            }
            if (subcategory) {
                obj.subcategory = subcategory
            }
            obj.isDeleted = false

            //Authorizing user --> If not then won't be able to fetch books of someone else's.
            const check = await bookModel.findOne(obj)
            if (check) {
                if (check.userId != req.userId) {
                    return res.status(403).send({
                        status: false,
                        message: "Unauthorized access."
                    })
                }
            }

            //Searching books according to the request 
            let books = await bookModel.find(obj).select({ subcategory: 0, ISBN: 0, isDeleted: 0, updatedAt: 0, createdAt: 0, __v: 0 }).sort({
                title: 1
            });
            const countBooks = books.length

            //If no found by the specific combinations revert error msg ~-> No books found.
            if (books == false) {
                return res.status(404).send({ status: false, message: "No books found" });
            } else {
                res.status(200).send({ status: true, message: `${countBooks} books found.`, data: books })
            }
        } else {
            return res.status(400).send({ status: false, message: "No filters applied." });
        }
    } catch (err) {
        return res.status(500).send({ status: false, message: "Something went wrong", Error: err.message })
    }
}

//Fetching books by their Id.
const fetchBooksById = async function (req, res) {
    try {
        const params = req.params.bookId

        //validating bookId after accessing it from the params.
        if (!validator.isValidObjectId(params)) {
            return res.status(400).send({ status: false, message: "Inavlid bookId." })
        }

        //Finding the book in DB by its Id & an attribute isDeleted:false
        const findBook = await bookModel.findOne({
            _id: params,
            isDeleted: false
        })
        if (!findBook) {
            return res.status(404).send({ status: false, message: `Book does not exist or is already been deleted for this ${params}.` })
        }

        //Checking the authorization of the user -> Whether user's Id matches with the book creater's Id or not.
        if (findBook.userId != req.userId) {
            return res.status(403).send({
                status: false,
                message: "Unauthorized access."
            })
        }

        //Accessing the reviews of the specific book which we got above, -> In reviewsData key sending the reviews details of that book.
        const fetchReviewsData = await reviewModel.find({ bookId: params, isDeleted: false }).select({ deletedAt: 0, isDeleted: 0, createdAt: 0, __v: 0, updatedAt: 0 }).sort({
            reviewedBy: 1
        })

        const { _id, title, excerpt, userId, category, subcategory, isDeleted, reviews, deletedAt, releasedAt, createdAt, updatedAt } = findBook

        //Structuring for response body.
        const reviewObj = {
            _id: _id,
            title: title,
            excerpt: excerpt,
            userId: userId,
            category: category,
            subcategory: subcategory,
            isDeleted: isDeleted,
            reviews: reviews,
            deletedAt: deletedAt,
            releasedAt: releasedAt,
            createdAt: createdAt,
            updatedAt: updatedAt,
            reviewsData: fetchReviewsData //extra added key in which reviews will get populated.
        };
        return res.status(200).send({ status: true, message: "Book found Successfully.", data: reviewObj })
    } catch (err) {
        return res.status(500).send({ status: false, message: "Something went wrong", Error: err.message })
    }
}

//Update books details.
const updateBookDetails = async function (req, res) {
    try {
        const params = req.params.bookId
        const requestUpdateBody = req.body
        const userIdFromToken = req.userId
        const { title, excerpt, releasedAt, ISBN } = requestUpdateBody;

        //validation starts.
        if (!validator.isValidObjectId(userIdFromToken)) {
            return res.status(402).send({ status: false, message: "Unauthorized access !" })
        }
        if (!validator.isValidObjectId(params)) {
            return res.status(400).send({ status: false, message: "Invalid bookId." })
        }

        if (!validator.isValidRequestBody(requestUpdateBody)) {
            return res.status(400).send({ status: false, message: 'Invalid request parameters. Please provide book details to update.' })
        }
        //validation ends

        //setting the combinations for the updatation.
        if (title || excerpt || ISBN || releasedAt) {

            //validation for empty strings/values.
            if (!validator.validString(title)) {
                return res.status(400).send({ status: false, message: "Title is missing ! Please provide the title details to update." })
            }
            if (!validator.validString(excerpt)) {
                return res.status(400).send({ status: false, message: "Excerpt is missing ! Please provide the Excerpt details to update." })
            };
            if (!validator.validString(ISBN)) {
                return res.status(400).send({ status: false, message: "ISBN is missing ! Please provide the ISBN details to update." })
            };
            if (!validator.validString(releasedAt)) {
                return res.status(400).send({ status: false, message: "Released date is missing ! Please provide the released date details to update." })
            };
        } //validation ends.

        //searching book in which we want to update the details.
        const searchBook = await bookModel.findById({
            _id: params,
        })
        if (!searchBook) {
            return res.status(404).send({ status: false, message: `Book does not exist by this ${params}.` })
        }

        //Authorizing user -> only the creator of the book can update the details.
        if (searchBook.userId != req.userId) {
            return res.status(403).send({
                status: false,
                message: "Unauthorized access."
            })
        }

        //finding title and ISBN in DB to maintain their uniqueness.
        const findTitle = await bookModel.findOne({ title: title, isDeleted: false })
        if (findTitle) {
            return res.status(400).send({ status: false, message: `${title.trim()} is already exists.Please try a new title.` })
        }
        const findIsbn = await bookModel.findOne({ ISBN: ISBN, isDeleted: false })
        if (findIsbn) {
            return res.status(400).send({ status: false, message: `${ISBN.trim()} is already registered.` })
        }

        //checcking the attribute isDeleted:false, then only the user is allowed to update.
        if (searchBook.isDeleted == false) {
            const changeDetails = await bookModel.findOneAndUpdate({ _id: params }, { title: title, excerpt: excerpt, releasedAt: releasedAt, ISBN: ISBN }, { new: true })

            res.status(200).send({ status: true, message: "Successfully updated book details.", data: changeDetails })
        } else {
            return res.status(400).send({ status: false, message: "Unable to update details.Book has been already deleted" })
        }
    } catch (err) {
        return res.status(500).send({ status: false, message: "Something went wrong", Error: err.message })
    }
}

//deleting an existing book.
const deleteBook = async function (req, res) {
    try {
        const params = req.params.bookId; //accessing the bookId from the params.

        //validation for the invalid params.
        if (!validator.isValidObjectId(params)) {
            return res.status(400).send({ status: false, message: "Inavlid bookId." })
        }

        //finding the book in DB which the user wants to delete.
        const findBook = await bookModel.findById({ _id: params })

        if (!findBook) {
            return res.status(404).send({ status: false, message: `No book found by ${params}` })
        }
        //Authorizing the user -> if the user doesn't created the book, He/she won't be able to delete it.
        else if (findBook.userId != req.userId) {
            return res.status(403).send({
                status: false,
                message: "Unauthorized access."
            })
        }
        //if the attribute isDeleted:true , then it is already deleted.
        else if (findBook.isDeleted == true) {
            return res.status(400).send({ status: false, message: `Book has been already deleted.` })
        } else {
            //is ttribute isDeleted:false, then change the isDeleted flag to true, and remove all the reviews of the book as well.
            const deleteData = await bookModel.findOneAndUpdate({ _id: { $in: findBook } }, { $set: { isDeleted: true, deletedAt: new Date() } }, { new: true }).select({ _id: 1, title: 1, isDeleted: 1, deletedAt: 1 })

            await reviewModel.updateMany({ bookId: params }, { isDeleted: true, deletedAt: new Date() })
            return res.status(200).send({ status: true, message: "Book deleted successfullly.", data: deleteData })
        }
    } catch (err) {
        return res.status(500).send({ status: false, message: "Something went wrong", Error: err.message })
    }
}
module.exports = {
    bookCreation,
    fetchAllBooks,
    fetchBooksById,
    updateBookDetails,
    deleteBook,
    bookCoverUrl
}