import mongoose from "mongoose"

const userSchema = new mongoose.Schema({
     email:{type:String},
     name:{type:String},
     password:{type:String, required:true},
     role: {type:String}
})

const userModel =  mongoose.model('user',userSchema)

export default userModel
