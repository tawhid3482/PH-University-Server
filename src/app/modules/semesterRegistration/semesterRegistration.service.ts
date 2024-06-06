import httpStatus from "http-status";
import AppError from "../../errors/AppError";
import { RegistrationStatus } from "./semesterRegistration";
import { TSemesterRegistration } from "./semesterRegistration.interface";
import { SemesterRegistration } from "./semesterRegistration.model";
import { AcademicSemester } from "../academicSemester/acdemicSemester.model";
import QueryBuilder from "../../builder/QueryBuilder";

const createSemesterRegistrationIntoDB = async (
    payload: TSemesterRegistration,
  ) => {
    /**
     * Step1: Check if there any registered semester that is already 'UPCOMING'|'ONGOING'
     * Step2: Check if the semester is exist
     * Step3: Check if the semester is already registered!
     * Step4: Create the semester registration
     */
  
    const academicSemester = payload?.academicSemester;
  
    //check if there any registered semester that is already 'UPCOMING'|'ONGOING'
    const isThereAnyUpcomingOrOngoingSEmester =
      await SemesterRegistration.findOne({
        $or: [
          { status: RegistrationStatus.UPCOMING },
          { status: RegistrationStatus.ONGOING },
        ],
      });
  
    if (isThereAnyUpcomingOrOngoingSEmester) {
      throw new AppError(
        httpStatus.BAD_REQUEST,
        `There is aready an ${isThereAnyUpcomingOrOngoingSEmester.status} registered semester !`,
      );
    }
    // check if the semester is exist
    const isAcademicSemesterExists =
      await AcademicSemester.findById(academicSemester);
  
    if (!isAcademicSemesterExists) {
      throw new AppError(
        httpStatus.NOT_FOUND,
        'This academic semester not found !',
      );
    }
  
    // check if the semester is already registered!
    const isSemesterRegistrationExists = await SemesterRegistration.findOne({
      academicSemester,
    });
  
    if (isSemesterRegistrationExists) {
      throw new AppError(
        httpStatus.CONFLICT,
        'This semester is already registered!',
      );
    }
  
    const result = await SemesterRegistration.create(payload);
    return result;
  };

  const getAllSemesterRegistrationsFromDB = async (
    query: Record<string, unknown>,
  ) => {
    const semesterRegistrationQuery = new QueryBuilder(
      SemesterRegistration.find().populate('academicSemester'),
      query,
    )
      .filter()
      .sort()
      .paginate()
      .fields();
  
    const result = await semesterRegistrationQuery.modelQuery;
    return result;
  };
  
  const getSingleSemesterRegistrationsFromDB = async (id: string) => {
    const result = await SemesterRegistration.findById(id);
  
    return result;
  };

  const updateSemesterRegistrationIntoDB = async (
    id: string,
    payload: Partial<TSemesterRegistration>,
  ) => {
    /**
     * Step1: Check if the semester is exist
     * Step2: Check if the requested registered semester is exists
     * Step3: If the requested semester registration is ended, we will not update anything
     * Step4: If the requested semester registration is 'UPCOMING', we will let update everything.
     * Step5: If the requested semester registration is 'ONGOING', we will not update anything  except status to 'ENDED'
     * Step6: If the requested semester registration is 'ENDED' , we will not update anything
     *
     * UPCOMING --> ONGOING --> ENDED
     *
     */
  
    // check if the requested registered semester is exists
    // check if the semester is already registered!
    const isSemesterRegistrationExists = await SemesterRegistration.findById(id);
  
    if (!isSemesterRegistrationExists) {
      throw new AppError(httpStatus.NOT_FOUND, 'This semester is not found !');
    }
  
    //if the requested semester registration is ended , we will not update anything
    const currentSemesterStatus = isSemesterRegistrationExists?.status;
    const requestedStatus = payload?.status;
  
    if (currentSemesterStatus === RegistrationStatus.ENDED) {
      throw new AppError(
        httpStatus.BAD_REQUEST,
        `This semester is already ${currentSemesterStatus}`,
      );
    }
  
    // UPCOMING --> ONGOING --> ENDED
    if (
      currentSemesterStatus === RegistrationStatus.UPCOMING &&
      requestedStatus === RegistrationStatus.ENDED
    ) {
      throw new AppError(
        httpStatus.BAD_REQUEST,
        `You can not directly change status from ${currentSemesterStatus} to ${requestedStatus}`,
      );
    }
  
    if (
      currentSemesterStatus === RegistrationStatus.ONGOING &&
      requestedStatus === RegistrationStatus.UPCOMING
    ) {
      throw new AppError(
        httpStatus.BAD_REQUEST,
        `You can not directly change status from ${currentSemesterStatus} to ${requestedStatus}`,
      );
    }
  
    const result = await SemesterRegistration.findByIdAndUpdate(id, payload, {
      new: true,
      runValidators: true,
    });
  
    return result;
  };
  


  export const SemesterRegistrationService = {
    createSemesterRegistrationIntoDB,
    getAllSemesterRegistrationsFromDB,
    getSingleSemesterRegistrationsFromDB,
    updateSemesterRegistrationIntoDB,

  };