import { Schema, model, } from "mongoose";
import { TAcademicSemester, TAcademicSemesterCode, TAcademicSemesterName, TMonths } from "./academicSemester.interface";

const Months: TMonths[] = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December'
];

const AcademicSemesterName: TAcademicSemesterName[] = ['Autumn', 'Summar', 'Fall']

const AcademicSemesterCode: TAcademicSemesterCode[] = ['01', '02', '03']

const academicSemesterSchema = new Schema<TAcademicSemester>({
    name: {
        type: String,
        required: true,
        enum: AcademicSemesterName

    },
    code: {
        type: String,
        required: true,
        enum: AcademicSemesterCode
    },
    year: {
        type: Date,
        required: true
    },
    startMonth: {
        type: String,
        required: true,
        enum: Months
    },
    endMoth: {
        type: String,
        required: true,
        enum: Months
    }
},
    {
        timestamps: true
    }
);


export const AcademicSemester = model<TAcademicSemester>('AcademicSemester', academicSemesterSchema)