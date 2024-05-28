import { Router } from "express";
import { StudentRoutes } from "../modules/student/student.route";
import { userRoute } from "../modules/users/user.route";

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
]

moduleRoutes.forEach((route) => router.use(route.path, route.route))

export default router