/*let captureInfo = function (req, res, next) {
    let acceptHeaderValue = req.headers['accept']
    req.headers['batch']='Radium'
    console.log('Global middleware called')
    res.send('Global middleware called')
}
*/
const jwt = require('jsonwebtoken')
const validationToken = function (req, res, next) {
    let token = req.headers['x-auth-token']
    if (!token) {
        return res.send({ status: false, message: 'No authentication token present' })
    } else {
        let decodedToken = jwt.verify(token, 'radium')
        if (decodedToken) {
            next();
        } else {
            res.send({ status: false, message: 'Token not valid' })
        }
    }
}
module.exports.validationToken = validationToken;
