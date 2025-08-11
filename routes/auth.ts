import express from 'express'
const router = express.Router()
import {adminRegister, adminSignin, sign_in, userRegister} from '../controllers/loginController.ts'

router.post('/api/task/register',adminRegister)
router.post('/api/task/sign_in', sign_in)
router.post('/api/adminSignin', adminSignin)
router.post('/api/task/userRegister',userRegister)


export default router