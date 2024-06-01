/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { ErrorRequestHandler, NextFunction, Request, Response, } from 'express';
import { ZodError } from 'zod';
import { TErrorSource } from '../interface/error';
import config from '../config';

const globalErrorHandler: ErrorRequestHandler = (
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    err, req, res, next) => {
    // default values
    let statusCode = err.statusCode || 500;
    let message = err.message || 'Something went wrong!';



    let errorSource: TErrorSource = [{
        path: '',
        message: 'Something went wrong!'
    }]

    const handleZodError = (err: ZodError) => {
        const errorSource: TErrorSource = err.issues.map((issue) => {
            return {
                path: issue?.path[issue.path.length - 1],
                message: issue.message
            }
        })

        const statusCode = 400;

        return {
            statusCode,
            message: 'Validation error',
            errorSource,

        }

    }



    if (err instanceof ZodError) {

        const simplifiedError = handleZodError(err)
        statusCode = simplifiedError?.statusCode;
        message = simplifiedError?.message;
        errorSource = simplifiedError?.errorSource
    };






    return res.status(statusCode).json({
        success: false,
        message,
        errorSource,
        stack: config.NODE_ENV === 'development' ? err?.stack : null

    })

}
export default globalErrorHandler;