import { z } from 'zod';

const userValidationSchema = z.object({
    password:z.string({
        invalid_type_error: "Password must be a string",
    }).max(20,{message:'Password con not be more then 20 characters'}).optional(),
    status:z.enum(['in-progress','blocked']).default('in-progress'),

})

export const userValidation = {
    userValidationSchema
}