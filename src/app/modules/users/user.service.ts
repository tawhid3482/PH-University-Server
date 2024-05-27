import config from "../../config";
import { TStudent } from "../student/student.interface";
import { Student } from "../student/student.model";
import { TUser } from "./user.interface";
import { User } from "./user.model";

const createStudentIntoDB = async (password:string, studentData: TStudent) => {

     /// create user object

     const userData : Partial<TUser> = {};


     userData.password = password || ( config.default_password as string)

    // if(!password){
    //   user.password = config.default_password as string;
    // }else{
    //   user.password = password;
    // }

 
    // set student role
    userData.role = 'student'


    // temporary set manually id gen
    userData.id= '2030100001'

    // create user
    const newUser = await User.create(userData);

    if(Object.keys(newUser).length){
      // get id and _id as user
      studentData.id = newUser.id;
      studentData.user = newUser._id
      const newStudent = await Student.create(studentData)
      return newStudent
    }
  };

  
export const UserServices = {
    createStudentIntoDB
  };
  
  