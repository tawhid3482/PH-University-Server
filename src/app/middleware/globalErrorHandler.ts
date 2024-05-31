/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { ErrorRequestHandler, NextFunction, Request, Response, } from 'express';
import { ZodError } from 'zod';

const globalErrorHandler: ErrorRequestHandler = (
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    err, req, res, next) => {
    // default values
    let statusCode = err.statusCode || 500;
    let message = err.message || 'Something went wrong!';
    type TErrorSource = {
        path: string | number;
        message: string
    }[]
    const errorSource: TErrorSource = [{
        path: '',
        message: 'Something went wrong!'
    }]

    if (err instanceof ZodError) {
        statusCode = 404;
        message = 'ami zod tumi ki'
    };






    return res.status(statusCode).json({
        success: false,
        message,
        errorSource,
        Error: err
    })

}
export default globalErrorHandler;