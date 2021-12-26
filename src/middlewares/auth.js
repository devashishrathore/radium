const jwt = require("jsonwebtoken")

const userAuth = function(req, res, next) {
    try {
        const token = req.header('Authorization', 'Bearer Token') //setting token in the request header.
        if (!token) {
            return res.status(403).send({ status: false, message: `Missing authentication token in request` })
        }
let splitToken = token.split(' ')
        const decoded = jwt.decode(splitToken[1], 'group14'); //decoding authentication token
        if (!decoded) {
            return res.status(400).send({ status: false, message: "Invalid authentication token in request." })
        }
        if (Date.now() > (decoded.exp) * 1000) { //setting time expiration message
            return res.status(403).send({ status: false, message: "Session expired! Please login again." })
        }
        
        req.userId = decoded.userId; //matching userId for which token generated by the userId provided in the request.
        next()

    } catch (error) {
        return res.status(500).send({ status: false, message: error.message })
    }
}

module.exports = {
    userAuth
}