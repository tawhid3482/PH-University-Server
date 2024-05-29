import { NextFunction, Request, RequestHandler, Response, } from 'express';
import { StudentServices } from './student.service';
import sendResponse from '../../utils/sendResponse';
import httpStatus from 'http-status';



const catchAsync = (fn: RequestHandler) => {
  return (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(fn(req, res, next)).catch(err => next(err))
  }
};


const getAllStudents = catchAsync(async (req, res, next) => {

  const result = await StudentServices.getAllStudentsFromDB();
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Students are retrieved succesfully',
    data: result
  })
});

const getSingleStudent = catchAsync(async (req, res, next) => {

  const { studentId } = req.params;

  const result = await StudentServices.getSingleStudentFromDB(studentId);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Students are retrieved succesfully',
    data: result
  })

});

const deleteStudent = catchAsync(async (req, res, next) => {

  const { studentId } = req.params;

  const result = await StudentServices.deleteStudentFromDB(studentId);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Students is deleted succesfully',
    data: result
  })

});

export const StudentControllers = {
  getAllStudents,
  getSingleStudent,
  deleteStudent,
};
