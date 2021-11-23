const productmodel = require("../models/productmodel");

const createProduct = async function (req, res) {
    const product = req.body;
    let createproduct = await productmodel.create(product);
    res.send({ data: createproduct });
};



module.exports.createProduct = createProduct;