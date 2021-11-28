const axios = require("axios");

// res.status(200). send( { data: userDetails } )

const getStatesList = async function (req, res) {
  try {
    let options = {
      method: "get",
      url: "https://cdn-api.co-vin.in/api/v2/admin/location/states",
    };
    const cowinStates = await axios(options);

    console.log("WORKING");
    let states = cowinStates.data;
    res.status(200).send({ msg: "Successfully fetched data", data: states });

  }
  catch (err) {
    console.log(err.message);
    res.status(500).send({ msg: "Some error occured" });
  }

};


const getDistrictsList = async function (req, res) {

  try {
    let id = req.params.stateId
    console.log(" state: ", id)

    let options = {
      method: "get",
      url: `https://cdn-api.co-vin.in/api/v2/admin/location/districts/${id}` //plz take 5 mins to revise template literals here
    }
    let response = await axios(options)

    let districts = response.data

    console.log(response.data)
    res.status(200).send({ msg: "Success", data: districts })

  }
  catch (err) {
    console.log(err.message)
    res.status(500).send({ msg: "Something went wrong" })
  }
}

const getByPin = async function (req, res) {

  try {

    let pin = req.query.pincode
    let date = req.query.date

    let options = {
      method: "get",
      url: `https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/findByPin?pincode=${pin}&date=${date}`
    }
    let response = await axios(options)



    let centers = response.data
    console.log(centers)
    res.status(200).send({ msg: "Success", data: centers })

  }
  catch (err) {
    console.log(err.message)
    res.status(500).send({ msg: "Something went wrong" })
  }
}


const getOtp = async function (req, res) {

  try {

    let options = {
      method: "post", // method has to be post
      url: `https://cdn-api.co-vin.in/api/v2/auth/public/generateOTP`,
      data: { "mobile": req.body.mobile } // we are sending the json body in the data 
    }
    let response = await axios(options)

    let id = response.data
    res.status(200).send({ msg: "Success", data: id })

  }
  catch (err) {
    console.log(err.message)
    res.status(500).send({ msg: "Something went wrong" })
  }
}


const getweather = async function (req, res) {

  let q = req.query.q

  const option = {
    method: 'get',
    url: `http://api.openweathermap.org/data/2.5/weather?q=${q}&appid=cba50b5331334e783edeab4d522b688e`,

  }

  let response = await axios(option)

  let tem = response.data.main.temp

  res.status(200).send({ msg: "succesfull", data: tem })

}


const cities = async function (req, res) {
  try {
    let city = ["Bengaluru", "Mumbai", "Delhi", "Kolkata", "Chennai", "London", "Moscow"]
    let arr = [];
    for (let i = 0; i < city.length; i++) {
      let options = {
        method: "get",
        url: ` http://api.openweathermap.org/data/2.5/weather?q=${city[i]}&appid=ffc803e155dca2e8efa4ea6cc04891e1`
      };
      let Temp = await axios(options)
      arr.push({ "city": city[i], "temp": Temp.data.main.temp })

    }
    let world = arr.sort(function (a, b) { return parseFloat(a.temp) - parseFloat(b.temp) })
    res.status(200).send({ msg: "The data is here", "temp": world });
  } catch (err) {
    console.log(err.message);
    res.status(500).send({ msg: "There is some error" })
  }

}




module.exports.getStatesList = getStatesList;
module.exports.getDistrictsList = getDistrictsList;
module.exports.getByPin = getByPin;
module.exports.getOtp = getOtp;


module.exports.getweather = getweather;
module.exports.cities = cities;