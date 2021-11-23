const mongoose = require('mongoose')
const productSchema = new mongoose.Schema({

	name: String,
	category: String,
	price: { type: Number, require: true }
	
}, { timestamps: true }
)

module.exports = mongoose.model('Products', productSchema)
