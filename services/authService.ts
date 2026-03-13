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



export const authenticateRole = async (req: Request, res: Response, next: any) => {
    try {
        if (!process.env.JWT_SECRET) {
            throw new Error("environment variables not found")
        }
        const token = req.cookies?.token
        if (!token) {
            return res.status(401).json({ message: 'token not found' })
        }
        const verify = jwt.verify(token, process.env.JWT_SECRET) as MyJwtPayload
        const userDocs = await userModel.findById(verify.id)
        if (!userDocs) {
            return res.status(401).json({ message: 'token is invalid' })
        }
        if (userDocs.role !== 'admin') {
            return res.status(403).json({ message: 'access denied: admins only' })
        }
        next()
    } catch (err) {
        console.error(err)
        res.status(401).json({ message: 'authentication failed' })
    }
}

