import sendResponse from "../../utils/sendResponse";
import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";



const createAcademicSemester = catchAsync(async (req, res) => {

  //const { password, student: studentData } = req.body;

  //   const zodParsedData = studentValidationSchema.parse(studentData);

  //const result = await UserServices.createStudentIntoDB(password, studentData);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'academic-semester is created succesfully',
    data: result
  })
});

export const AcademicSemesterController = {
    createAcademicSemester
};
