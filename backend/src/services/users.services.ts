import { User} from "../interfaces/users.interface";
import prisma from "../dbhelpers/prisma";
import bcrypt from 'bcryptjs';
import { v4 } from 'uuid';


export class UserService{

createUser = async (req: unknown, res: unknown, user: User) => {
  let user_id = v4();
  const hashedPassword = await bcrypt.hash(user.password, 10);
  const newUser = await prisma.user.create({
    data: {
      user_id: user_id,
      name: user.name,
      email: user.email,
      password: hashedPassword,
      contact_no: user.contact_no,
      profile_picture: user.profile_picture,
      role: " ",
      createdAt: new Date(),
      updatedAt: new Date()
    } 
  });

  if (newUser?.user_id == user_id) {
    return {
      message: "User created successfully",
    }
  }else{
    return {
      message: "User not created",
    }
  }
}

async getUser(req: unknown, res: unknown) {
 
  return{
   users: await prisma.user.findMany()
  } 
}

async viewOneUser(req: unknown, res: unknown, user_id: string) {
  return {
    user: await prisma.user.findUnique({
      where: {
       user_id: user_id
      }
    })
  }
}
  async updateUser(updated_user: User) {
    let current_details = await prisma.user.findUnique({
      where:{
        user_id:updated_user.user_id
      }
    })
    let response = await prisma.user.update({
      where:{
        user_id:updated_user.user_id
      },
      data:{
        
        name: updated_user.name || current_details?.name,
        email: updated_user.email || current_details?.email,
        contact_no: updated_user.contact_no || current_details?.contact_no,
        profile_picture: updated_user.profile_picture || current_details?.profile_picture
        
      }
    })
    return {
      message: "User updated successfully"
    }
  }
  async deleteUser(req: unknown, res: unknown, user_id: string) {
    let response = await prisma.user.delete({
      where:{
        user_id:user_id
      }
    })
    return {
      message: "User account deleted successfully"
    }
  }
}