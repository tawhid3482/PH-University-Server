import express from 'express'
import { UserControllers } from './user.controller'
import { studentValidationSchema } from '../student/student.validation'
import validationRequest from '../../middleware/validateRequest'

const router = express.Router()



router.post('/create-student', validationRequest(studentValidationSchema), UserControllers.createStudent)

export const userRoute = router
