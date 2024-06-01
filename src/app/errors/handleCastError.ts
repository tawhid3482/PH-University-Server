import mongoose from "mongoose";
import { TErrorSource, TGenenricErrorResponse } from "../interface/error";

const handleCastError = (err: mongoose.Error.CastError): TGenenricErrorResponse => {

    const errorSource: TErrorSource = [{
        path: err?.path,
        message: err?.message
    }]




    const statusCode = 400;
    return {
        statusCode,
        message: 'Invalid Id ',
        errorSource,

    }
}
export default handleCastError;