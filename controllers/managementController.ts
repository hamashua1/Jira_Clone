import type { Response, Request } from "express"
import userModel from '../models/user.ts'
import 'dotenv/config'



export const readUser = async(req:Request,res:Response)=>{
      try{
      const results = await userModel.find()
      res.status(201).json({message:'user info', results})
      }catch(err){
         res.status(401).json({message:'failed to fetch user info '})
      }
}

export const readSpecificUser = async (req:Request,res:Response)=>{
      try{
      const results = await userModel.findById(req.params.id)
         res.status(201).json({message:'user found', results})
      }catch(err){
        res.status(401).json({message:'user not found'})
      }
}

export const updateUser = async (req: Request, res: Response) => {
    try {
        const {id} = req.params
        const updates= req.body
        const results = await userModel.findByIdAndUpdate(id, updates, {new: true, runValidators: true })
        res.status(200).json({ message: 'filed has successfully updated in database', results })
    } catch (err) {
        console.error(err)
        res.status(401).json({ message: 'updates not successful' })
    }
}