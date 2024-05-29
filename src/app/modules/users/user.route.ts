import express from 'express'
import { UserControllers } from './user.controller'
import { createStudentValidationSchema } from '../student/student.validation'
import validationRequest from '../../middleware/validateRequest'

const router = express.Router()



router.post('/create-student', validationRequest(createStudentValidationSchema), UserControllers.createStudent)

export const userRoute = router
