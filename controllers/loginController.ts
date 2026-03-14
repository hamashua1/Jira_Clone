import express from 'express'
import userModel from '../models/user.ts'
import type { Request, Response } from 'express'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import 'dotenv/config'



interface loginRequest {
  name: string,
  email: string,
  password: string
  role: string
}

// admin panel only can use this endpoint
export const adminRegister = async (req: Request, res: Response) => {
  try {
    const { name, email, password }: loginRequest = req.body
    const saltRounds: number = 10
    const hashPassword = await bcrypt.hash(password, saltRounds)
    const results = new userModel({ name, email, password: hashPassword, role: 'admin' })
    await results.save()
    const { password: _, ...safeUser } = results.toObject()
    res.status(201).json({ message: 'credentials saved successfully', user: safeUser })
  } catch (err) {
    console.error(err)
    res.status(500).json({ message: "credentials not saved" })
  }
}


//admin sign in
export const adminSignin = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body
    if (typeof email !== 'string' || typeof password !== 'string') {
      return res.status(400).json({ message: 'invalid input' })
    }
    const results = await userModel.findOne({ email })
    if (!results) {
      return res.status(401).json({ message: 'invalid email or password' })
    }
    const isPasswordRight = await bcrypt.compare(password, results.password)
    if (!isPasswordRight) {
      return res.status(401).json({ message: 'invalid email or password' })
    }
    if (!process.env.JWT_SECRET) {
      throw new Error("environment variables not found")
    }
    const token = jwt.sign({ id: results._id, role: results.role }, process.env.JWT_SECRET, { expiresIn: '30m' })
    res.cookie('token', token, { httpOnly: true, secure: true, sameSite: 'lax', maxAge: 30 * 60 * 1000 })
    const { password: _, ...safeUser } = results.toObject()
    res.status(200).json({ message: "sign in successful", user: safeUser })
  } catch (err) {
    res.status(401).json({ message: 'sign in failed' })
  }
}




// admin panel to create a user endpoint
export const userRegister = async (req: Request, res: Response) => {
  try {
    const { name, email, password }: loginRequest = req.body
    const saltRounds: number = 10
    const hashPassword = await bcrypt.hash(password, saltRounds)
    const results = new userModel({ name, email, password: hashPassword, role: 'user' })
    await results.save()
    const { password: _, ...safeUser } = results.toObject()
    res.status(201).json({ message: 'credentials saved successfully', user: safeUser })
  } catch (err) {
    console.error(err)
    res.status(500).json({ message: "credentials not saved" })
  }
}

// users login panel

export const sign_in = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body
    if (typeof email !== 'string' || typeof password !== 'string') {
      return res.status(400).json({ message: 'invalid input' })
    }
    const results = await userModel.findOne({ email })
    if (!results) {
      return res.status(401).json({ message: 'invalid email or password' })
    }
    const isPasswordRight = await bcrypt.compare(password, results.password)
    if (!isPasswordRight) {
      return res.status(401).json({ message: 'invalid email or password' })
    }
    if (!process.env.JWT_SECRET) {
      throw new Error("environment variables not found")
    }
    const token = jwt.sign({ id: results._id, role: results.role }, process.env.JWT_SECRET, { expiresIn: '30m' })
    res.cookie('token', token, { httpOnly: true, secure: true, sameSite: 'lax', maxAge: 30 * 60 * 1000 })
    const { password: _, ...safeUser } = results.toObject()
    res.status(200).json({ message: "sign in successful", user: safeUser })
  } catch (err) {
    res.status(401).json({ message: 'sign in failed' })
  }
}











