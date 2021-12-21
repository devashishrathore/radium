const userModel = require('../models/userModel')
const jwt = require('jsonwebtoken')
const validator = require('../validators/validator')

//Registering users
const userCreation = async function(req, res) {
    try {
        const requestBody = req.body;
        const { //Object destructuring
            title,
            name,
            phone,
            email,
            password,
            address
        } = requestBody;

        //Validation starts
        if (!validator.isValidRequestBody(requestBody)) { //to check the empty request body
            return res.status(400).send({ ststus: false, message: "Invalid request parameters,Empty body not accepted." })
        }

        if (!validator.isValid(title)) {
            return res.status(400).send({ status: false, message: "Title must be present" })
        };
        if (!validator.isValidTitle(title)) {
            return res.status(400).send({ status: false, message: `Title should be among Mr, Mrs or Miss` })
        }
        if (!validator.isValid(name)) {
            return res.status(400).send({ status: false, message: "Name is required." })
        }
        if (!validator.isValid(phone)) {
            return res.status(400).send({ status: false, message: "Phone number is required" })
        }
        if (!validator.isValid(email)) {
            return res.status(400).send({ status: false, message: "Email id is required" })
        }
        if (!validator.isValid(password)) {
            return res.status(400).send({ status: false, message: "password is required" })
        }

        if (address) { //checking if the address key is present in the request body then it must have the following keys with their values, If not then address won't get stored in DB.

            if (!validator.validString(address.street)) {
                return res.status(400).send({ status: false, message: "Street address cannot be empty." })
            }
            if (!validator.validString(address.city)) {
                return res.status(400).send({ status: false, message: "City cannot be empty." })
            }
            if (!validator.validString(address.pincode)) {
                return res.status(400).send({ status: false, message: "Pincode cannot be empty." })
            }
        }
        //validation end.

        //searching phone in DB to maintain uniqueness.
        const verifyPhone = await userModel.findOne({ phone: phone })
        if (verifyPhone) {
            return res.status(400).send({ status: false, message: "Phone number already used" })
        }

        //searching email in DB to maintain uniqueness.
        const verifyEmail = await userModel.findOne({ email: email })
        if (verifyEmail) {
            return res.status(400).send({ status: false, message: "Email id is already used" })
        }

        //validating phone number of 10 digits only.
        if (!/^[0-9]{10}$/.test(phone))
            return res.status(400).send({ status: false, message: "Invalid Phone number.Phone number must be of 10 digits." })

        //validating email using RegEx.
        if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email))
            return res.status(400).send({ status: false, message: "Invalid Email id." })

        //setting password's mandatory length in between 8 to 15 characters.
        if (!(password.length >= 8 && password.length <= 15)) {
            return res.status(400).send({ status: false, message: "Password criteria not fulfilled." })
        }

        //saving user's data into DB.
        const userData = await userModel.create(requestBody)
        return res.status(201).send({ status: true, message: "Successfully saved User data", data: userData })

    } catch (err) {
        return res.status(500).send({ status: false, message: "Something went wrong", Error: err.message })
    }
}

//User login.
const loginUser = async function(req, res) {
    try {
        const requestBody = req.body;
        const { email, password } = requestBody //object destructuring

        //Validation starts.
        if (!validator.isValidRequestBody(requestBody)) { //for empty req body
            return res.status(400).send({ ststus: false, message: "Invalid request parameters,Empty body not accepted." })
        };
        if (!validator.isValid(email)) {
            return res.status(400).send({ status: false, message: "Email id is required" })
        };
        if (!validator.isValid(password)) {
            return res.status(400).send({ status: false, message: "password is required" })
        };
        //validation ends.

        //searching credentials of user in DB to cross verify.
        const findEmail = await userModel.findOne({
            email
        })
        if (!findEmail) {
            return res.status(401).send({ status: false, message: `Invalid login credentials. Please check the Email id.` });
        }
        const findPassword = await userModel.findOne({ password })
        if (!findPassword) {
            return res.status(401).send({ status: false, message: `Invalid login credentials. Please check the password.` });
        }

        const id = findEmail._id //saving userId by sarching the email & password of the specified user.

        //Generating token by the userId
        const token = await jwt.sign({
            userId: findEmail._id,
            iat: Math.floor(Date.now() / 1000), //time of issuing the token.
            exp: Math.floor(Date.now() / 1000) + 60 * 30 //setting token expiry time limit.
        }, 'group7')

        //setting token in response header.
        res.header('x-api-key', token);
        return res.status(200).send({ status: true, message: `User logged in successfully.` });
    } catch (err) {
        return res.status(500).send({ status: false, message: "Something went wrong", Error: err.message })
    }
}

module.exports = {
    userCreation,
    loginUser
}