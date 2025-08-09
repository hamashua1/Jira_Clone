import express, { Router } from 'express'
import {addTask, allTask, findTask , removeTask, updateTask} from '../controllers/taskController.ts'
const router = express.Router()


//endpoints for tasks

router.get('/api/task', allTask)
router.get('/api/task/:id',findTask) 
router.post('/api/task', addTask)
router.patch('/api/task/:id',updateTask)
router.delete('/api/task/:id', removeTask)


export default router



