import express from 'express';
import validationRequest from '../../middleware/validateRequest';
import { AcademicFacultyController } from './academicFaculty.controller';
import { academicFacultyValidation } from './academicFaculty.validation';

const router = express.Router()

router.post('/create-academic-faculty', validationRequest(academicFacultyValidation.createAcademicFacultyValidationSchema),
    AcademicFacultyController.createAcademicFaculty)


router.get(
    '/:facultyId',
    AcademicFacultyController.getSingleAcademicFaculty,
);

router.patch(
    '/:facultyId',
    validationRequest(
        academicFacultyValidation.updateAcademicFacultyValidationSchema,
    ),
    AcademicFacultyController.updateAcademicFaculty,
);

router.get('/', AcademicFacultyController.getAllAcademicFaculties);


export const AcademicFacultyRoutes = router;