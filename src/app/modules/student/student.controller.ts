import { StudentServices } from './student.service';
import sendResponse from '../../utils/sendResponse';
import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';


const getAllStudents = catchAsync(async (req, res ) => {
  const result = await StudentServices.getAllStudentsFromDB(req.query);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Students are retrieved succesfully',
    data: result
  })
});

const getSingleStudent = catchAsync(async (req, res ) => {

  const { id } = req.params;

  const result = await StudentServices.getSingleStudentFromDB(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Students is retrieved succesfully',
    data: result
  })

});

const deleteStudent = catchAsync(async (req, res ) => {

  const { id } = req.params;

  const result = await StudentServices.deleteStudentFromDB(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Students is deleted succesfully',
    data: result
  })

});

const updateStudent = catchAsync(async(req,res)=>{
  const { id } = req.params;
  const { student } = req.body;

  const result = await StudentServices.updateStudentFromDB(id,student);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Students is updated succesfully',
    data: result
  })
})


export const StudentControllers = {
  getAllStudents,
  getSingleStudent,
  deleteStudent,
  updateStudent
};
