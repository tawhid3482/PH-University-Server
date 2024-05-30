import express from 'express';
import validationRequest from '../../middleware/validateRequest';
import { AcademicFacultyController } from './academicFaculty.controller';

const router = express.Router()

router.post('/create-academic-faculty', validationRequest(AcademicSemesterValidations.createAcademicSemesterValidationSchema),
    AcademicSemesterController.createAcademicSemester)


router.get(
    '/:facultyId',
    AcademicFacultyController.getSingleAcademicFaculty,
);

router.patch(
    '/:facultyId',
    validationRequest(
        AcademicSemesterValidations.updateAcademicSemesterValidationSchema,
    ),
    AcademicSemesterController.updateAcademicSemester,
);

router.get('/', AcademicFacultyController.getAllAcademicFaculties);


export const AcademicSemesterRoutes = router;