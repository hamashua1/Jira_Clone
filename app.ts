import express from 'express'
import cors from 'cors'
import 'dotenv/config'
const app = express()
app.use(cors())
app.use(express.json())
const port:number = 8000


 




app.listen(port,()=>{
    console.log(`app is flying 🚀 20,000 feet on port ${port} `)
})