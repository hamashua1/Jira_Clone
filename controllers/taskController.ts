import taskModel from "../models/task.ts"
import type { Request, Response } from "express"



export type Task = {
    title: string,
    deadline: string,
    description: string,
    assignedId: string,
    status: string
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
        const { title, deadline, description, assignedId, status }: Task = req.body
        const results = new taskModel({ title, deadline, description, assignedId, status })
        await results.save()
        res.status(200).json({ message: 'tasks added successfully to database', results })
    } catch (err) {
        console.error(err)
        res.status(404).json({ message: 'couldnt add to database' })
    }
}

export const updateTask = async (req: Request, res: Response) => {
    try {
        const {id} = req.params
        const updates: Task = req.body
        const results = await taskModel.findByIdAndUpdate(id, updates, {new: true, runValidators: true })
        res.status(200).json({ message: 'filed has successfully updated in database', results })
    } catch (err) {
        console.error(err)
        res.status(401).json({ message: 'updates not successful' })
    }
}
export const removeTask = async (req: Request, res: Response) => {
    try {
        const {id} = req.params
        const results = await taskModel.findByIdAndDelete(id)
        res.status(200).json({ message: 'sucessfully deleted', results })
    } catch (err) {
        console.error(err)
        res.status(401).json({ message: 'could not delete task' })
    }
}
