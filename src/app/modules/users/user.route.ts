import express, { NextFunction, Request, Response } from 'express'
import { UserControllers } from './user.controller'

const router = express.Router()

const checkValidation = (req: Request, res: Response, next: NextFunction) => {
    console.log(req.body)
    next()
}


router.post('/create-student', checkValidation, UserControllers.createStudent)

export const userRoute = router
