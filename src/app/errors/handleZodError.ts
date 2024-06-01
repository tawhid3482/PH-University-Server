import { ZodError } from "zod";
import { TErrorSource } from "../interface/error";
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

export default handleZodError;