import express from 'express'
import userModel from '../models/user.ts'
import type{Request,Response} from 'express'
import bcrypt from 'bcrypt'

// admin panel only can use this endpoint
export const adminRegister = async(req:Request, res:Response)=>{
    try{
       const {name,email,password} = req.body
       const saltRounds:number = 10
       const hashPassword = await bcrypt.hash(password,saltRounds)
       const results = new userModel({name,email,password:hashPassword})
       await results.save()
       res.status(201).json({messgae:'credentials saved succeesfully'})
    }catch(err){
    console.error(err)
      res.status(401).json({message:"credentials not saved " })
}}



// admin panel to create a user endpoint
export const userRegister = async(req:Request, res:Response)=>{
    try{
       const {name,email,password, permissions} = req.body
       const saltRounds:number = 10
       const hashPassword = await bcrypt.hash(password,saltRounds)
       const results = new userModel({name,email,password:hashPassword,permissions})
       await results.save()
       res.status(201).json({messgae:'credentials saved succeesfully'})
    }catch(err){
    console.error(err)
      res.status(401).json({message:"credentials not saved " })
}}

// users login panel 

export const sign_in = async(req:Request,res:Response)=>{
    try{
          const {email,password} = req.body
          const results = await userModel.findOne({email})
          if(!email){
            console.error('email not found in database')
          }
          const isPasswordRight = await bcrypt.compare(password,results.password)
          if(!isPasswordRight){
            console.error('password not found in database')
          }
          res.status(201).json({message:"sign in successful", results,isPasswordRight} )
    }catch(err){
          res.status(401).json({message: 'sign in failed'})
    }
}