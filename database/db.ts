import mongoose from 'mongoose'
import 'dotenv/config'

export const connectDB = async()=>{
    const uri= process.env.MONGODB_URI
    if(!uri){
        throw new Error('environment variable not found')
    }
    await mongoose.connect(uri)
    console.log('Database is now in the cloud ☁️')
}