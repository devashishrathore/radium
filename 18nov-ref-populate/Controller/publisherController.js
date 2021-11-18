const PublisherModel = require("../Model/publisherModel.js");

//Task-4
const createPublisher = async function (req, res) {
    const data = req.body;
    let publisherCreated = await PublisherModel.create(data);
    res.send({ data: publisherCreated });
};

module.exports.createPublisher = createPublisher;