const express = require('express');
const router = express.Router();

const cryptoController = require("../controllers/cryptocontroller")

router.get("/getCryptodata", cryptoController.getAssets)

module.exports = router;