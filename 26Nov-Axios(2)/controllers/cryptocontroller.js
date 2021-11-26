const axios = require('axios')
const cryptoModel = require("../models/cryptoModel")

const getAssets = async function (_req, res) {
    try {

        //-------------------fetch data--------------------------
        let options = {
            method: "get",
            url: 'http://api.coincap.io/v2/assets',
            headers: {
                "Authorization": "Bearer ff9ad3ea-ecd5-4f61-a1dc-580002a8f962"
            }
        }
        let response = await axios(options)

        //------------------store in database------------------
        let dataArray = response.data.data
        for (i in dataArray) {
            let cryptoData = {
                symbol: dataArray[i].symbol,
                name: dataArray[i].name,
                marketCapUsd: dataArray[i].marketCapUsd,
                priceUsd: dataArray[i].priceUsd
            }
     await cryptoModel.findOneAndUpdate({ symbol: dataArray[i].symbol }, cryptoData, { upsert: true, new: true });
        }
        //------------------sorting by changePercent24Hr------------------
        dataArray.sort( function (a, b) { return a.changePercent24Hr - b.changePercent24Hr; });
        res.status(200).send({ status: true, Data: dataArray })

    } catch (error) {
        res.status(500).send({ msg: "failed", error: error.message })
    }

};

module.exports.getAssets = getAssets;

