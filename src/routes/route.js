const express = require('express');
const router = express.Router();
const UserModel= require("../models/userModel")

const UserController= require("../controllers/userController")
// const BookController= require("../controllers/bookController")
// const AssignmentBookController= require("../controllers/assignmentBookController")


const commonMW= require("../middlewares/commonMiddlewares")


// const mid1= function (req, res, next) {
//     console.log("Hi I am a middleware named Mid1 ");
//     //logic
//     let loggedIn= false

//     if(loggedIn==true) { 
//         next()
//     }
//     else{
//         res.send("Please login or register")
//     }
// }



router.get('/basicRoute', commonMW.MW1, commonMW.mid1, commonMW.mid2, commonMW.mid3, commonMW.mid4,  UserController.basicCode  );


router.get('/mwcode', commonMW.MW1, UserController.mwcode)





//e.g. restricted and open-to-al APIs can be handled like below now
// router.get('/homePage', mid1,   UserController.feeds  );
// router.get('/profileDetails', mid1,   UserController.profileDetails  );
// router.get('/friendList', mid1,   UserController.friendList  );
// router.get('/changePassword', mid1,   UserController.changePassword );

// router.get('/termsAndConditions',  UserController.termsAndConditions );
// router.get('/register',  UserController.register );




// router.get('/basicRoute2', mid1,  UserController.basicCode2  );
// router.get('/basicRoute3', mid1,  UserController.basicCode3  );
// router.get('/basicRoute4', mid1,  UserController.basicCode4  );


// router.post('/createUser', UserController.createUser  );
// router.get('/getAllUsers', UserController.getUsersData  );

// router.post('/createBook',  BookController.createBook  );
// router.get('/getAllBooks',  BookController.getBooksData  );

// // mongo session 3: session/schema-basic3
// router.get('/getFirstBook',  BookController.getBook  );
// router.post('/updateBooks',  BookController.updateBooks  );

// router.post('/deleteBook',  BookController.deleteBook  );


// // Previous Day asignment API's
// router.post('/createBook',  AssignmentBookController.createBook  );
// router.get('/bookList',  AssignmentBookController.allBooksList  );
// router.post('/getParticularBooks',  AssignmentBookController.particularBooks  );
//  router.post('/getBooksInYear',AssignmentBookController.yearDetails);
// router.get('/getXINRBooks',  AssignmentBookController.priceDetails  );
// router.get('/getRandomBooks', AssignmentBookController.randomBooks  );

// Today's assignment

module.exports = router;