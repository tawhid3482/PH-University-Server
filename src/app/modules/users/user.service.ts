import { TStudent } from "../student/student.interface";
import { Student } from "../student/student.model";

const createStudentIntoDB = async (studentData: TStudent) => {
    if (await Student.isUserExists(studentData.id)) {
      throw new Error('User already exists!');
    }
    const result = await Student.create(studentData);
    return result;
  };

  
export const UserServices = {
    createStudentIntoDB
  };
  
  