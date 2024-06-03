import express from 'express';
import validationRequest from '../../middleware/validateRequest';
import { CourseValidations } from './course.validation';
import { CourseControllers } from './course.controller';


const router = express.Router();

router.post(
  '/create-course',
//   auth('admin'),
  validationRequest(CourseValidations.createCourseValidationSchema),
  CourseControllers.createCourse,
);

router.get(
  '/:id',
//   auth('student', 'faculty', 'admin'),
  CourseControllers.getSingleCourse,
);

router.patch(
  '/:id',
//   auth('admin'),
  validationRequest(CourseValidations.updateCourseValidationSchema),
  CourseControllers.updateCourse,
);

router.delete('/:id',
//  auth('admin'),
 CourseControllers.deleteCourse);

router.put(
  '/:courseId/assign-faculties',
  validationRequest(CourseValidations.facultiesWithCourseValidationSchema),
  CourseControllers.assignFacultiesWithCourse,
);

router.delete(
  '/:courseId/remove-faculties',
  validationRequest(CourseValidations.facultiesWithCourseValidationSchema),
  CourseControllers.removeFacultiesFromCourse,
);

router.get('/', CourseControllers.getAllCourses);

export const CourseRoutes = router;