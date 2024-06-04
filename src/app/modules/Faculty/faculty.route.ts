import express from 'express';
import { FacultyControllers } from './faculty.controller';
import validationRequest from '../../middleware/validateRequest';
import { updateFacultyValidationSchema } from './faculty.validation';


const router = express.Router();

router.get('/:id', FacultyControllers.getSingleFaculty);

router.patch(
  '/:id',
  validationRequest(updateFacultyValidationSchema),
  FacultyControllers.updateFaculty,
);

router.delete('/:id', FacultyControllers.deleteFaculty);

router.get('/', FacultyControllers.getAllFaculties);

export const FacultyRoutes = router;