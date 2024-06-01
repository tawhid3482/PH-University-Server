import { ZodError } from "zod";
import { TErrorSource, TGenenricErrorResponse } from "../interface/error";
const handleZodError = (err: ZodError) : TGenenricErrorResponse => {
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

export default handleZodError;