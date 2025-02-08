const mongoose = require('mongoose')

const connectToDB=async()=>{
    try{
        await mongoose.connect(process.env.URI)
        console.log("Connect to DB")
    }catch(err){
        console.error('DB Connection Failed')
        process.exit(1);
    }
}

module.exports = connectToDB;