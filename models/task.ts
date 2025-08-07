import mongoose from 'mongoose'


const taskSchema = new mongoose.Schema({
       title:{type:String},
       deadline:{type:String},
       description:{type:String},
       assignedID:{type:Number},
       status:{type:String}
})

const taskModel = new mongoose.Model('task', taskSchema)

