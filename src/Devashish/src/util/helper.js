function printData(){
    console.log(Date())
}
function printMonth(){
    const d = new Date()
    console.log(d.getMonth())
}
function getBatchInfo(){
    console.log("Batch name - FunctionUp")
    console.log("Week - 4th")
    console.log("Todays topic - Node JS")
}

module.exports.printData=printData;
module.exports.printMonth=printMonth;
module.exports.getBatchInfo=getBatchInfo;
