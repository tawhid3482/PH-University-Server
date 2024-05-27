import config from "../../config";
import { TStudent } from "../student/student.interface";
import { NewUser } from "./user.interface";
import { user } from "./user.model";

const createStudentIntoDB = async (password:string, studentData: TStudent) => {

     /// create user object

     const user : NewUser = {};


     user.password = password || ( config.default_password as string)

    // if(!password){
    //   user.password = config.default_password as string;
    // }else{
    //   user.password = password;
    // }

 
    // set student role
    user.role = 'student'

    // create user
    const result = await user.create(user);
    
    return result;
  };

  
export const UserServices = {
    createStudentIntoDB
  };
  
  