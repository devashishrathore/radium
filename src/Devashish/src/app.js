/*4. Using the package ‘lodash’ solve below probolems
(1)Create an array of strings containing the names all the months of a year and 
split the array into 4 equally sized sub-arrays using the chunk function
(2)Using the tail function, return the last n-1 elements of an array containing the first 10 odd numbers
Create 5 arrays of numbers containing a few duplicate values.
(3)Using the function union create a merged array with only unique valuesUse the 
function fromPairs to create a object contating key value pairs. 
For example [“horror”,”The Shining"],[“drama”,”Titanic"],[“thriller”,”Shutter Island"],[“fantasy”,”Pans Labyrinth"]*/
const logger = require('./logger')
const helper = require('./util/helper')
const formatter = require('../validator/formatter')
const obj = require('underscore') 
const chunk = require('lodash.chunk')
console.log("-------------------------------------------------")
//Module-1
logger.log('Devashish Rathore')
logger.welcome()
console.log('Here is the url'+logger.url)
console.log("-------------------------------------------------")
//Module-2
helper.printData()
helper.printMonth()
helper.getBatchInfo()
console.log("-------------------------------------------------")
//Module-3
formatter.trimstring()
formatter.changetoLowerCase()
formatter.changetoUpperCase()
//External Package
console.log(obj.first(["dev","nikhil","jaydeep"],2))
console.log(obj.last([1,2,3,4,5,6,7]))
console.log(chunk(['january','feburary','march','april','may','june','july','august','september','october','november','december'], 3))