const express = require('express');
const router = express.Router();
const usercontroller = require("../controller/usercontroller")
const productcontroller = require("../controller/productcontroller")
const ordercontroller = require("../controller/ordercontroller")
const middelWare = require("../middlewares/middelWare");
/*router.post('/test-me', function (req, res, next) {
    console.log('Inside the route handler checking the header batch: ' + req.headers['batch'])
    let host = req.headers['host']
    let hostWithName = host + " " + "Sabiha Khan"
    console.log('My response headers: ' + res.getHeaderNames())
    res.setHeader('hostWithName', hostWithName)
    //res.send({data: 'I was in the handler'})
    res.finalData = { data: 'I was in the handler' }
    next()
});
*/
router.post('/createuser', middelWare.validateAppType, usercontroller.createUser);
router.post('/createproduct', productcontroller.createProduct);
router.post('/createorder', middelWare.validateAppType, ordercontroller.createOrder);

module.exports = router;

