
import { User } from './user.model';



const getAllUsersFromDB = async () => {
  const result = await User.find();
  return result;
};

const getSingleUserFromDB = async(email:string)=>{
  const result = await User.findOne({email})
  return result
}

export const UserServices = {
  getAllUsersFromDB,
  getSingleUserFromDB,
};
