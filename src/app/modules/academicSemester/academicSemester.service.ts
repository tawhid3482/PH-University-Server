import { academicSemesterNameCodeMapper } from "./academicSemester.constant"
import { TAcademicSemester } from "./academicSemester.interface"
import { AcademicSemester } from "./acdemicSemester.model"

const createAcademicSemesterIntoDB = async (payload: TAcademicSemester) => {

    // semester name == semester code
 

  

    if(academicSemesterNameCodeMapper[payload.name] !== payload.code){
        throw new Error('Semester code not match')
    }
    const result = await AcademicSemester.create(payload)
    return result;
}

export const AcademicSemesterServices = {
    createAcademicSemesterIntoDB
}