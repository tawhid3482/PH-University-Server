import { object } from "zod";
import config from "../../config";
import { TStudent } from "../student/student.interface";
import { NewUser } from "./user.interface";
import { User } from "./user.model";

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


    // temporary set manually id gen
    user.id= '2030100001'

    // create user
    const result = await User.create(user);

    if(Object.keys(result).length){
      // get id and _id as user
      studentData.id = result.id;
      studentData.user = result._id
    }


    return result;
  };

  
export const UserServices = {
    createStudentIntoDB
  };
  
  