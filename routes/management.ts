import express from 'express'
const router = express.Router()
import {readUser , readSpecificUser, updateUser} from '../controllers/managementController.ts'
import { authenticateToken } from '../services/authService.ts'


// user endpoints

router.get('/api/read_User', authenticateToken, readUser)
router.get('/api/read_User/:id', authenticateToken,readSpecificUser)
router.patch('/api/updateUser/:id',authenticateToken, updateUser)



export default router

