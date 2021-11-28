const express = require('express');
const router = express.Router();

const cowinController= require("../conrollers/cowinController")

router.get("/cowin/states", cowinController.getStatesList)
router.get("/cowin/districts/:stateId", cowinController.getDistrictsList)
router.get("/cowin/centers", cowinController.getByPin)
router.post("/cowin/getOtp", cowinController.getOtp)
router.get("/city/weather", cowinController.getweather)
router.get("/cities", cowinController.cities)

module.exports = router;