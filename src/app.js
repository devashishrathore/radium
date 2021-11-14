const logger = require('./logger')
const helper = require('./util/helper')

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
/*Module-3
formatter.trimstring()
formatter.changetoLowerCase()
formatter.changetoUpperCase()*/
//External Package
console.log(obj.first(["dev","nikhil","jaydeep"],2))
console.log(obj.last([1,2,3,4,5,6,7]))
console.log(chunk(['january','feburary','march','april','may','june','july','august','september','october','november','december'], 3))