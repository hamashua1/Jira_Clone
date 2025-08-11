import express, { Router } from 'express'
import {addTask, allTask, findTask , removeTask, updateTask} from '../controllers/taskController.ts'
const router = express.Router()
import { authenticateRole } from '../microservice/authService.ts'
import { authenticateToken } from '../microservice/authService.ts'


//endpoints for tasks

router.get('/api/task',authenticateToken, allTask)
router.get('/api/task/:id',authenticateToken, findTask) 
router.post('/api/task', authenticateRole, addTask)
router.patch('/api/task/:id',authenticateToken, updateTask)
router.delete('/api/task/:id', authenticateRole,removeTask)


export default router



