import { Router } from "express";
import { StudentRoutes } from "../modules/student/student.route";
import { userRoute } from "../modules/users/user.route";
import { AcademicSemesterRoutes } from "../modules/academicSemester/academicSemester.route";
import { AcademicFacultyRoutes } from "../modules/academicFaculty/academicFaculty.route";

const router = Router()

const moduleRoutes = [
    {
        path: '/student',
        route: StudentRoutes
    },
    {
        path: '/user',
        route: userRoute
    },
    {
        path: '/academic-semesters',
        route: AcademicSemesterRoutes
    },
    {
        path: '/academic-faculties',
        route: AcademicFacultyRoutes
    },
]

moduleRoutes.forEach((route) => router.use(route.path, route.route))

export default router