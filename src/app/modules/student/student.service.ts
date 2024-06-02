import mongoose from 'mongoose';
import { Student } from './student.model';
import AppError from '../../errors/AppError';
import httpStatus from 'http-status';
import { User } from '../users/user.model';
import { TStudent } from './student.interface';

const getAllStudentsFromDB = async (query: Record<string, unknown>) => {
  const queryObj = { ...query }; //copy

  const studentSearchableField = ['email', 'name.firstName', 'presentAddress']

  let searchTerm = '';
  if (query?.searchTerm) {
    searchTerm = query?.searchTerm as string;
  }

  const searchQuery = Student.find({
    $or: studentSearchableField.map((field) => ({
      [field]: { $regex: searchTerm, $options: 'i' }
    }))
  })

  // filtaring
  const excludeFields = ['searchTerm', 'sort','limit']
  excludeFields.forEach(el => delete queryObj[el])


  const filterQuery = searchQuery.find(queryObj).populate('admissionSemester').populate({
    path: 'academicDepartment',
    populate: {
      path: 'academicFaculty',
    }
  });

  let sort = '-createdAt'; // SET DEFAULT VALUE 

  // IF sort  IS GIVEN SET IT

  if (query.sort) {
    sort = query.sort as string;
  }

  const sortQuery = filterQuery.sort(sort);


  let limit = 1
  if (query.limit) {
    limit = query.limit 
  }

  const limitQuery = await sortQuery.limit(limit)



  return limitQuery;
};

const getSingleStudentFromDB = async (id: string) => {
  const result = await Student.findOne({ id }).populate('admissionSemester').populate({
    path: 'academicDepartment',
    populate: {
      path: 'academicFaculty',
    }
  });;
  return result;
};

const deleteStudentFromDB = async (id: string) => {
  const session = await mongoose.startSession()
  try {

    session.startTransaction()

    const deleteStudent = await Student.findOneAndUpdate({ id }, { isDeleted: true },
      { new: true, session }
    );

    if (!deleteStudent) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to delete student')
    }
    const deletedUser = await User.findOneAndUpdate({ id },
      { isDeleted: true },
      { new: true, session }
    )
    if (!deletedUser) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to delete User')
    }

    await session.commitTransaction()
    await session.endSession()

    return deleteStudent;
  } catch (err) {

    await session.abortTransaction()
    await session.endSession()
    throw new Error('Felid to delete User')

  }

};

const updateStudentFromDB = async (id: string, payload: Partial<TStudent>) => {
  const { name, guardian, localGuardian, ...remainingStudentData } = payload;

  const modifiedUpdatedData: Record<string, unknown> = {
    ...remainingStudentData,
  };


  if (name && Object.keys(name).length) {
    for (const [key, value] of Object.entries(name)) {
      modifiedUpdatedData[`name.${key}`] = value;
    }
  }

  if (guardian && Object.keys(guardian).length) {
    for (const [key, value] of Object.entries(guardian)) {
      modifiedUpdatedData[`guardian.${key}`] = value;
    }
  }

  if (localGuardian && Object.keys(localGuardian).length) {
    for (const [key, value] of Object.entries(localGuardian)) {
      modifiedUpdatedData[`localGuardian.${key}`] = value;
    }
  }

  // console.log(modifiedUpdatedData);
  const result = await Student.findOneAndUpdate({ id }, modifiedUpdatedData, {
    new: true,
    runValidators: true,
  });
  return result;
};




export const StudentServices = {
  getAllStudentsFromDB,
  getSingleStudentFromDB,
  deleteStudentFromDB,
  updateStudentFromDB
};
