import { z } from 'zod';

const createAcademicSemesterValidationSchema = z.object({
    body: z.object({
        name:z.enum(),
        code:z.string(),
        year:z.string()
    })

})

export const AscademicSemesterValidations = {
    createAcademicSemesterValidationSchema
}