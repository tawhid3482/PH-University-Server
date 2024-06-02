/* eslint-disable @typescript-eslint/no-explicit-any */
import httpStatus from "http-status";
import config from "../../config";
import { AcademicSemester } from "../academicSemester/acdemicSemester.model";
import { TStudent } from "../student/student.interface";
import { Student } from "../student/student.model";
import { TUser } from "./user.interface";
import { User } from "./user.model";
import { generateStudentId } from "./user.utils";
import AppError from "../../errors/AppError";
import mongoose from "mongoose";

const createStudentIntoDB = async (password: string, payload: TStudent) => {
  const userData: Partial<TUser> = {};
  userData.password = password || (config.default_password as string);
  userData.role = 'student';

  const admissionSemester = await AcademicSemester.findById(payload.admissionSemester).lean().exec();

  if (!admissionSemester) {
    throw new AppError(httpStatus.NOT_FOUND, 'Invalid admission semester');
  }

  const session = await mongoose.startSession()

  try {
    session.startTransaction()

    userData.id = await generateStudentId(admissionSemester);

    // create user (transition-1)
    const newUser = await User.create([userData], { session });

    if (!newUser.length) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create user')
    }
    payload.id = newUser[0].id;
    payload.user = newUser[0]._id;

    // create a student (transition-2)

    const newStudent = await Student.create([payload], { session });
    if (!newStudent.length) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create student')

    }

    await session.commitTransaction()
    await session.endSession()
    return newStudent;
  }
  catch (err: any) {
    await session.abortTransaction()
    await session.endSession()
    throw new Error(err)
  }



}
export const UserServices = {
  createStudentIntoDB,
}

