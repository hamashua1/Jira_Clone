import express from 'express'
import type {Request,Response} from 'express'
import taskModel from '../models/task.ts'
const router = express.Router()


//endpoints for tasks

router.get('/api/task', async (req: Request,res: Response)=>{
     try{
      const results = await taskModel.find()
      res.status(200).json({message:'all tasks returned successfuly', results})
      
     }catch(err){
        console.error(err)
        res.status(404).json({message:'failed to fetch all tasks'})
     }
})
           

router.get('/api/task/:id', async(req:Request,res:Response)=>{
        try{
          const{id} = req.params
          const results= await taskModel.findById(id)
          res.status(200).json({message:'specific task found', results})
     }catch(err){
    console.error(err)
    res.status(404).json({success:false})
        }
    })

router.post('/api/task', async(req:Request,res:Response)=>{
     try{
       const {title,deadline,description,assignedId,status} = req.body
       const results = new taskModel({title,deadline,description,assignedId,status})
       await results.save()
       res.status(200).json({message:'tasks added successfully to database',results})
     }catch(err){
          console.error(err)
          res.status(404).json({message:'couldnt add to database'})
}
})
    

export default router