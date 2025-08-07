import express, { response } from 'express'
import  {Request,Response} from 'express'
import taskModel from '../models/task'
const router = express.Router()


//endpoints for tasks

router.get('/api/task', async (req: Request,res: Response)=>{
     try{
      const results:[string,number] = await taskModel.find()
      res.status(200).json({message:'all tasks returned successfuly', results})
      
     }catch(err){
        console.log(err)
        res.status(400).json({message:'failed to fetch all tasks'})
     }
})
           

router.get('/api/task/:id', async(req:Request,res:Response)=>{
        try{
          const{id:string} = req.params
          const results:string= await taskModel.findById({id:string})
          res.status(200).json({message:'specific task found', results})
     }catch(Error){
    throw new Error(`value returned is not an id`)
    res.status(400).json({success:false})
        }
    })

