import express from 'express';
import { AcademicSemesterController } from './academicSemester.controller';
import validationRequest from '../../middleware/validateRequest';
import { AcademicSemesterValidations } from './academicSemester.validation';

const router = express.Router()

router.post('/create-academic-semester', validationRequest(AcademicSemesterValidations.createAcademicSemesterValidationSchema),
    AcademicSemesterController.createAcademicSemester)


router.get(
    '/:semesterId',
    AcademicSemesterController.getSingleAcademicSemester,
);

router.patch(
    '/:semesterId',
    validationRequest(
        AcademicSemesterValidations.updateAcademicSemesterValidationSchema,
    ),
    AcademicSemesterController.updateAcademicSemester,
);

router.get('/', AcademicSemesterController.getAllAcademicSemesters);


export const AcademicSemesterRoutes = router;