const mongoose = require('mongoose')

const cryptoCurrency = new mongoose.Schema({

	symbol: { type: String, unique: true },
	name: { type: String, unique: true },
	marketCapUsd: String,
	priceUsd: String

}, { timestamps: true } )


module.exports = mongoose.model('CryptoData', cryptoCurrency)
