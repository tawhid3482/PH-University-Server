import httpStatus from "http-status";
import config from "../../config";
import { AcademicSemester } from "../academicSemester/acdemicSemester.model";
import { TStudent } from "../student/student.interface";
import { Student } from "../student/student.model";
import { TUser } from "./user.interface";
import { User } from "./user.model";
import { generateStudentId } from "./user.utils";
import AppError from "../../errors/AppError";

const createStudentIntoDB = async (password: string, payload: TStudent) => {
  const userData: Partial<TUser> = {};
  userData.password = password || (config.default_password as string);
  userData.role = 'student';

  const admissionSemester = await AcademicSemester.findById(payload.admissionSemester).lean().exec();
  
  if (!admissionSemester) {
    throw new AppError(httpStatus.NOT_FOUND,'Invalid admission semester');
  }

  userData.id = await generateStudentId(admissionSemester);

  const newUser = await User.create(userData);

  if (Object.keys(newUser).length) {
    payload.id = newUser.id;
    payload.user = newUser._id;
    const newStudent = await Student.create(payload);
    return newStudent;
  }
};

export const UserServices = {
  createStudentIntoDB,
};
