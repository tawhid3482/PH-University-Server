import express from 'express';
import validationRequest from '../../middleware/validateRequest';
import { academicDepartmentValidation } from './academicDepartment.validation';
import { AcademicDepartmentController } from './academicDepartment.controller';

const router = express.Router()


router.post('/create-academic-department',
//  validationRequest(academicDepartmentValidation.createAcademicDepartmentValidationSchema),
    AcademicDepartmentController.createAcademicDepartment)


router.get(
    '/:departmentId',
    AcademicDepartmentController.getSingleAcademicDepartment,
);

router.patch(
    '/:departmentId',
    validationRequest(
        academicDepartmentValidation.updateAcademicDepartmentValidationSchema,
    ),
    AcademicDepartmentController.updateAcademicDepartment,
);

router.get('/', AcademicDepartmentController.getAllAcademicDepartments);


export const AcademicDepartmentRoutes = router;