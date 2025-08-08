import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import taskRoutes from './routes/task.ts'
import authRoutes from './routes/auth.ts'
import {connectDB} from './database/db.ts'
const app = express()
app.use(cors())
app.use(express.json())
app.use(taskRoutes)
app.use(authRoutes)
const PORT:number = 8000
connectDB()



app.listen(PORT,()=>{
    console.log(`app is flying 🚀 20,000 feet on port ${PORT}`)
})

