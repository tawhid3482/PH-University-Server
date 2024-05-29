import config from "../../config";
import { AcademicSemester } from "../academicSemester/acdemicSemester.model";
import { TStudent } from "../student/student.interface";
import { Student } from "../student/student.model";
import { TUser } from "./user.interface";
import { User } from "./user.model";
import { generateStudentId } from "./user.utils";

const createStudentIntoDB = async (password: string, payload: TStudent) => {

  /// create user object

  const userData: Partial<TUser> = {};


  userData.password = password || (config.default_password as string)

  // if(!password){
  //   user.password = config.default_password as string;
  // }else{
  //   user.password = password;
  // }

  // set student role
  userData.role = 'student'

 

  // find academic semester info

  const admissionSemester = await AcademicSemester.findById(payload.admissionSemester);

  if (!admissionSemester) {
    throw new Error('Admission semester not found');
  }

  // temporary set manually id gen
  userData.id = generateStudentId(admissionSemester)

  // create user
  const newUser = await User.create(userData);

  if (Object.keys(newUser).length) {
    // get id and _id as user
    payload.id = newUser.id;
    payload.user = newUser._id
    const newStudent = await Student.create(payload)
    return newStudent
  }
};


export const UserServices = {
  createStudentIntoDB
};

