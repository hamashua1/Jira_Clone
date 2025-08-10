import taskModel from "../models/task.ts"
import jwt from 'jsonwebtoken'
import type { JwtPayload } from 'jsonwebtoken'
import type { Request, Response } from "express"
import 'dotenv/config'
import userModel from "../models/user.ts"
import cookieParser from "cookie-parser"



export interface Task {
    title: string,
    deadline: string,
    description: string,
    assignedId: string,
    status: string
}


interface MyJwtPayload extends JwtPayload {
    _id: string,
    role: 'admin' | 'user'
}




export const allTask = async (req: Request, res: Response) => {
    try {
        const results = await taskModel.find()
        res.status(200).json({ message: 'all tasks returned successfuly', results })
    } catch (err) {
        console.error(err)
        res.status(404).json({ message: 'failed to fetch all tasks' })
    }
}

export const findTask = async (req: Request, res: Response) => {
    try {
        const { id } = req.params
        const results = await taskModel.findById(id)
        res.status(200).json({ message: 'specific task found', results })
    } catch (err) {
        console.error(err)
        res.status(404).json({ success: false })
    }
}

export const addTask = async (req: Request, res: Response) => {
    try {

        // checking for authorized users
        if (!process.env.JWT_SECRET) {
            throw new Error("environment viarables not found")
        }
        const token = req.cookies.token as string
        if (!token) {
            return res.status(404).json({ message: 'not authorized' })
        }

        const verify = jwt.verify(token, process.env.JWT_SECRET) as MyJwtPayload
        const userDocs = await userModel.findById(verify._id)
        if (!userDocs) {
            throw new Error('token expired')
        }
        if (verify.role !== 'admin') {
            throw new Error('not authrorized for this endpoint')
        }

        const results = new taskModel(req.body)
        await results.save()
        res.status(200).json({ message: 'tasks added successfully to database', results })
    } catch (err) {
        console.error(err)
        res.status(404).json({ message: 'couldnt add to database' })
    }
}


export const updateTask = async (req: Request, res: Response) => {
    try {
        const { id } = req.params
        const updates: Task = req.body
        const results = await taskModel.findByIdAndUpdate(id, updates, { new: true, runValidators: true })
        res.status(200).json({ message: 'filed has successfully updated in database', results })
    } catch (err) {
        console.error(err)
        res.status(401).json({ message: 'updates not successful' })
    }
}
export const removeTask = async (req: Request, res: Response) => {
    try {

        // checking for authorized users
        if (!process.env.JWT_SECRET) {
            throw new Error("environment viarables not found")
        }
        const token = req.cookies.token as string
        if (!token) {
            return res.status(404).json({ message: 'not authorized' })
        }
        const verify = jwt.verify(token, process.env.JWT_SECRET) as MyJwtPayload
        const pass = await userModel.findById(verify._id)
        if (!pass) {
            throw new Error('token expired')
        }
        if (verify.role !== 'admin') {
            throw new Error('not authrorized for this endpoint')
        }
        const results = await taskModel.findByIdAndDelete(req.params.id)
        res.status(200).json({ message: 'sucessfully deleted', results })
    } catch (err) {
        console.error(err)
        res.status(401).json({ message: 'could not delete task' })
    }
}




