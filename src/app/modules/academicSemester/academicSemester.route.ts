import express from 'express';
import { AcademicSemesterController } from './academicSemester.controller';
import validationRequest from '../../middleware/validateRequest';
import { AscademicSemesterValidations } from './academicSemester.validation';

const router = express.Router()

router.post('/create-academic-semester', validationRequest(AscademicSemesterValidations), AcademicSemesterController.createAcademicSemester)


export const AcademicSemesterRoutes = router;