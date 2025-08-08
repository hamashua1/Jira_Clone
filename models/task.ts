import mongoose from 'mongoose'


const taskSchema = new mongoose.Schema({
       title:{type:String},
       deadline:{type:String},
       description:{type:String},
       assignedId:{type:Number},
       status:{type:String}
})

const taskModel = mongoose.model('task', taskSchema)

export default taskModel