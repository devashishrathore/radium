const express = require('express');
const router = express.Router();
const user1controller = require("../controller/user1controller")
const middleware = require("../middlewares/middleware")
/*router.post('/test-me', function (req, res, next) {    
    console.log('Inside the route handler checking the header batch: '+req.headers['batch'])
    let host = req.headers['host']
    let hostWithName = host + " " + "Sabiha Khan"
    console.log('My response headers: '+res.getHeaderNames())
    res.setHeader('hostWithName', hostWithName)
    //res.send({data: 'I was in the handler'})
    res.finalData = {data: 'I was in the handler'}
    next()
});
*/
router.get('/users/:userId', middleware.validationToken, user1controller.getDetails)
router.post('/login', user1controller.login)
router.post('/createuser1', user1controller.createUser1)
router.put('/users/:userId', middleware.validationToken, user1controller.emailUpdate)
module.exports = router;


