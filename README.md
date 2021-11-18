// Mixed type
// Date maniupaltions pe brief intro + https://www.sitepoint.com/managing-dates-times-using-moment-js/
// find vs findOne
    - find gives all the documents that match the condition | findOne gives only the first document that matches
    - find gives an array | findOne gives an object
    - If no match is found -  find gives [] empty array which is a truthy value  || findOne gives null which is a falsey value 


//   let books = await BookModel.updateMany (  {isPublished: false } ,  {author : "PK"}   );  // first json is the query condition  || second condition is the required update or change
//   let books = await BookModel.findOneAndUpdate(  {isPublished: true } ,  {author : "Sabiha"}   );  // it updates only the first matching doc
//   let books = await BookModel.findOneAndUpdate(  {isPublished: true } ,  {author : "Sabiha 3"} , { new: true}  );  // third param : new: true - will give you the updated document
  
//  upsert: true - it finds and updates the document but if the doc is not found(i.e it does not exist) then it creates a new document

// how to delete a document: never ever use remove (in life) .. always maintain a flag(a key in schema) "isDeleted: false" and whenever a doc is being deleted change this to "isDeleted: true"