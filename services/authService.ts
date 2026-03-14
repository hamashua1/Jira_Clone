import type { JwtPayload } from 'jsonwebtoken'
import type { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'
import 'dotenv/config'
import userModel from "../models/user.ts"



interface MyJwtPayload extends JwtPayload {
    id: string,
    role: 'admin' | 'user'
}

export const authenticateToken = async (req: Request, res: Response, next: NextFunction) => {
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
        next()
    } catch (err) {
        console.error(err)
        res.status(401).json({ message: 'authentication failed' })
    }
}



export const authenticateRole = async (req: Request, res: Response, next: NextFunction) => {
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

