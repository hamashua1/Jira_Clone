import cookieParser from "cookie-parser"
import type { JwtPayload } from 'jsonwebtoken'
import type { Request, Response } from 'express'
import jwt from 'jsonwebtoken'
import 'dotenv/config'
import userModel from "../models/user"



interface MyJwtPayload extends JwtPayload {
    _id: string,
    role: 'admin' | 'user'
}

export const authenticateToken = async (req: Request, res: Response) => {

    if (!process.env.JWT_SECRET) {
        throw new Error("environment viarables not found")
    }
    const token = req.cookies.token
    const verify = jwt.verify(token, process.env.JWT_SECRET) as MyJwtPayload
    const userDocs = await userModel.findById(verify._id)
    if (!userDocs) {
        throw new Error('token is invaid')
    }



}



export const authenticateRole = async(req:Request,res:Response)=>{
    if (!process.env.JWT_SECRET) {
        throw new Error("environment viarables not found")
    }
    const token = req.cookies.token
    const verify = jwt.verify(token, process.env.JWT_SECRET) as MyJwtPayload
    const userDocs = await userModel.findById(verify._id)
    if (!userDocs) {
        throw new Error('token is invaid')
    }
    if(verify.role !== 'admin'){
        throw new Error('user is not authorized')
    }

}