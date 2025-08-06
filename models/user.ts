import mongoose from "mongoose"

const userSchema = new mongoose.Schema({
     email:{type:String},
     name:{type:String},
     password:{type:[String,Number], required:true},
     permissions:{type:Boolean}
})

const userModel =  new mongoose.Model('user',userSchema)