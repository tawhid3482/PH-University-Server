import { TAcademicSemester } from "../academicSemester/academicSemester.interface";
import { User } from "./user.model";

const findLastStudentId = async (): Promise<string | undefined> => {
  const lastStudent = await User.findOne(
    { role: 'student' },
    { id: 1, _id: 0 }
  )
    .sort({ createdAt: -1 })
    .lean();

  return lastStudent?.id ? lastStudent.id : undefined;
};

export const generateStudentId = async (payload: TAcademicSemester): Promise<string> => {
  let currentId = (0).toString(); // by default 0000

  const lastStudentId = await findLastStudentId();
  const lastStudentSemesterCode = lastStudentId?.substring(4, 6) //01
  const lastStudentYear = lastStudentId?.substring(0, 4); //2030
  const currentSemesterCode = payload.code;
  const currentSemesterYear = payload.year;

  if ((lastStudentId && lastStudentSemesterCode === currentSemesterCode && lastStudentYear === currentSemesterYear)) {
    currentId = lastStudentId.substring(6)
  }
  const incrementId = (Number(currentId) + 1).toString().padStart(4, '0');
  return `${payload.year}${payload.code}${incrementId}`;
};
