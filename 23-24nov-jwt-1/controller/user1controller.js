const user1model = require("../models/user1model");
const jwt = require('jsonwebtoken')

const createUser1 = async function (req, res) {
    const User1 = req.body;
    let User1created = await user1model.create(User1);
    res.send({ data: User1created });
};

const login = async function (req, res) {
    userName = req.body.name
    userPassword = req.body.password

    let user = await user1model.findOne({ name: userName, password: userPassword, isDeleted: false })
    if (user) {
        const generatedToken = jwt.sign({ userId: user._id }, "radium")
        res.send({ status: true, data: user._id, token: generatedToken })
    } else {
        res.send({ status: false, message: 'Invalid credentials' })
    }
}
const getDetails = async function (req, res) {
    let userDetails = await user1model.findOne({ _id: req.params.userId, isDeleted: false })
    if (userDetails) {
        res.send({ status: true, data: userDetails })
    } else {
        res.send({ status: false, message: 'User not found' })
    }
}
const emailUpdate = async function (req, res) {
    let userId = req.params.userId
    let email = req.body.email
    let user = await user1model.findOneAndUpdate({ _id: userId }, { email: email }, { new: true })
    if (user) {
        res.send({ status: true, message: user })
    } else {
        res.send({ status: false, msg: "incorrect credential" })
    }
}
module.exports.emailUpdate = emailUpdate;
module.exports.getDetails = getDetails;
module.exports.login = login;
module.exports.createUser1 = createUser1;