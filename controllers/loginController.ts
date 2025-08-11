import express from 'express'
import userModel from '../models/user.ts'
import type { Request, Response } from 'express'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import 'dotenv/config'
import cookieParser from 'cookie-parser'


interface loginRequest {
  name: string,
  email: string,
  password: string
  role: string
}

// admin panel only can use this endpoint
export const adminRegister = async (req: Request, res: Response) => {
  try {
    const { name, email, password, role }: loginRequest = req.body
    const saltRounds: number = 10
    const hashPassword = await bcrypt.hash(password, saltRounds)
    const results = new userModel({ name, email, password: hashPassword, role })
    await results.save()
    res.status(201).json({ messgae: 'credentials saved succeesfully' })
  } catch (err) {
    console.error(err)
    res.status(401).json({ message: "credentials not saved " })
  }
}


//admin sign in 
export const adminSignin = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body
    const results = await userModel.findOne({ email })
    if (!results) {
      return console.error('email not found in database')
    }
    const isPasswordRight = await bcrypt.compare(password, results.password)
    if (!isPasswordRight) {
      return console.error('password not found in database')
    }
    if (!process.env.JWT_SECRET) {
      throw new Error("environment viarables not found")
    }
    const token = jwt.sign({ id: results._id, role: results.role }, process.env.JWT_SECRET, { expiresIn: '30m' })
    res.cookie('token', token, { httpOnly: true, secure: true, sameSite: 'lax', maxAge: 30 * 30 * 500 })

    res.status(201).json({ message: "sign in successful", results, isPasswordRight })
  } catch (err) {
    res.status(401).json({ message: 'sign in failed' })
  }
}




// admin panel to create a user endpoint
export const userRegister = async (req: Request, res: Response) => {
  try {

    // at the role: user
    const { name, email, password, role }: loginRequest = req.body
    const saltRounds: number = 10
    const hashPassword = await bcrypt.hash(password, saltRounds)
    const results = new userModel({ name, email, password: hashPassword, role })
    await results.save()
    res.status(201).json({ messgae: 'credentials saved succeesfully', results})
  } catch (err) {
    console.error(err)
    res.status(401).json({ message: "credentials not saved " })
  }
}

// users login panel 

export const sign_in = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body
    const results = await userModel.findOne({ email })
    if (!results) {
      return console.error('email not found in database')
    }
    const isPasswordRight = await bcrypt.compare(password, results.password)
    if (!isPasswordRight) {
      return console.error('password not found in database')
    }
    if (!process.env.JWT_SECRET) {
      throw new Error("environment viarables not found")
    }
    const token = jwt.sign({ id: results._id, role: results.role }, process.env.JWT_SECRET, { expiresIn: '30m' })
    res.cookie('token', token, { httpOnly: true, secure: true, sameSite: 'lax', maxAge: 30 * 30 * 500 })

    res.status(201).json({ message: "sign in successful", results, isPasswordRight })
  } catch (err) {
    res.status(401).json({ message: 'sign in failed' })
  }
}


