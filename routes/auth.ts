import express from 'express'
const router = express.Router()
import {adminRegister, sign_in} from '../controllers/loginController.ts'

router.post('/api/task/register',adminRegister)
router.post('/api/task/sign_in', sign_in)



export default router