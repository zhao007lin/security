import * as dotenv from 'dotenv' 
dotenv.config()
import mongoose from "mongoose";
const{Schema, model} =mongoose;
import encrypt from "mongoose-encryption"


const userSchema = new mongoose.Schema({
   
    email: {
        type:String,
       
    },
    password: {
        type: String,
        
    },


})

userSchema.plugin(encrypt,{secret: process.env.SECRET, encryptedFields: ["password"]});

const User = model("User", userSchema);
export default User;
