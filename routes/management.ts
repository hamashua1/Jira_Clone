import express from 'express'
const router = express.Router()
import {readUser , readSpecificUser, updateUser} from '../controllers/managementController.ts'


// user endpoints

router.get('/api/read_User', readUser)
router.get('/api/read_User/:id', readSpecificUser)
router.patch('/api/updateUser/:id', updateUser)



export default router

