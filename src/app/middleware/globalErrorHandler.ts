/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { ErrorRequestHandler, NextFunction, Request, Response, } from 'express';

const globalErrorHandler: ErrorRequestHandler = (
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    err, req, res, next) => {
    // default values
    const statusCode = err.statusCode || 500;
    const message = err.message || 'Something went wrong!';
    type TErrorSource = {
        path: string | number;
        message: string
    }[]
    const errorSource: TErrorSource = [{
        path: '',
        message: 'Something went wrong!'
    }]

    return res.status(statusCode).json({
        success: false,
        message,
        errorSource,
        amiError:err
    })

}
export default globalErrorHandler;