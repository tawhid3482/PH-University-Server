/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextFunction, Request, Response, } from 'express';

const globalErrorHandler = (
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    err: any,
    req: Request,
    res: Response,
    // eslint-disable-next-line no-unused-vars
    next: NextFunction) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || 'Something went wrong!';
    return res.status(statusCode).json({
        success: false,
        message,
        error: err
    })

}
export default globalErrorHandler;