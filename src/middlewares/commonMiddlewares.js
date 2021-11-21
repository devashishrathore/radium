const mid1= function (req, res, next) {
    console.log("Hi I am a middleware named Mid1 ");
    next()    
}

const mid2= function (req, res, next) {
    console.log("Hi I am a middleware named Mid2 ");
    next()    
}

const mid3= function (req, res, next) {
    console.log("Hi I am a middleware named Mid3 ");
    next()    
}

const mid4= function (req, res, next) {
    console.log("Hi I am a middleware named Mid4 ");
    next()    
}

const MW1= function (req, res, next) {

    let date=new Date(new Date())
    let ip= req.ip;
    let URL = req.url
    console.log(" Todays Date and Time: "+date+"\n My IP Address: "+ip+"\n My API Url: "+URL);
    // console.log(date,ip,URL)
    next()    
}


module.exports.mid1= mid1
module.exports.mid2= mid2
module.exports.mid3= mid3
module.exports.mid4= mid4

module.exports.MW1= MW1;
