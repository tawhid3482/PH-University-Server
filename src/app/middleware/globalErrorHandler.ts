/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { ErrorRequestHandler, NextFunction, Request, Response, } from 'express';
import { ZodError } from 'zod';
import { TErrorSource } from '../interface/error';
import config from '../config';
import handleZodError from '../errors/handleZodError';

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

    if (err instanceof ZodError) {

        const simplifiedError = handleZodError(err)
        statusCode = simplifiedError?.statusCode;
        message = simplifiedError?.message;
        errorSource = simplifiedError?.errorSource
    }else if(err?.name === 'ValidationError')






    return res.status(statusCode).json({
        success: false,
        message,
        errorSource,
        err,
        stack: config.NODE_ENV === 'development' ? err?.stack : null

    })

}
export default globalErrorHandler;