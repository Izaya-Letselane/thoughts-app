import mongoose from "mongoose";

const connectDB = async()=>{
 try {
    mongoose.connect(process.env.MONGO)
    console.log("DB coonected successfully")
    //console.log(process.env.MONGO);
 } catch (error) {
    console.log("Error connecting database", error)
    process.exit(1)
 }
}

export {connectDB}