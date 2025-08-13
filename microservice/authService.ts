import cookieParser from "cookie-parser"
import type { JwtPayload } from 'jsonwebtoken'
import type { Request, Response } from 'express'
import jwt from 'jsonwebtoken'
import 'dotenv/config'
import userModel from "../models/user.ts"



interface MyJwtPayload extends JwtPayload {
    id: string,
    role: 'admin' | 'user'
}

export const authenticateToken = async (req: Request, res: Response, next) => {

    if (!process.env.JWT_SECRET) {
        throw new Error("environment viarables not found")
    }
    console.log("req.cookies",req.cookies)
    const token = req.cookies?.token
    if(!token){
        throw new Error('token not found')
    }
    const verify = jwt.verify(token, process.env.JWT_SECRET) as MyJwtPayload
    console.log('anything',verify)
    const userDocs = await userModel.findById(verify.id)
    if (!userDocs) {
        throw new Error('token is invalid')
    }
    next()
}



export const authenticateRole = async (req: Request, res: Response, next) => {
    if (!process.env.JWT_SECRET) {
        throw new Error("environment viarables not found")
    }
    const token = req.cookies.token
    if(!token){
        throw new Error('token not found')
    }
    const verify = jwt.verify(token, process.env.JWT_SECRET) as MyJwtPayload
    const userDocs = await userModel.findById(verify.id)
    if (!userDocs) {
        throw new Error('token is invaid')
    }
    if (verify.role !== 'admin') {
        throw new Error('user is not authorized')
    }
    next()

}