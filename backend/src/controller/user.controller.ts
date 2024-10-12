import {Request, Response} from 'express';
import { UserService } from '../services/users.services';

let service = new UserService();

 export async function createUser(req: Request, res: Response) {
    try {
      let response = await service.createUser(req.body);

      res.json(response);

    } catch (error) {
      return res.json({error});
    }
  }
  export async function getUser(req:Request, res: Response) {
    try {
      let response = await service.getUser();
      return res.status(201).json( response)
      }
     catch (error) {
      return res.json({
        error:error
      });
    }
  }
 export async function viewOneUser(req: Request, res: Response) {
    try {
      let response = await service.viewOneUser(req.params.id);
      res.json(response);
    } catch (error) {
      return res.json({error});
    }
  }
  export async function updateUser(req: Request, res: Response) {
    try {
      let user_id = req.params.id;
      let {name, email, created_at, password,contact_no, profile_picture, role} = req.body;
      
      let User: any = {
        user_id: user_id,
        name,
        email,
        password,
        contact_no,
        profile_picture,
        role,
        created_at,
        updatedAt: new Date()
      };
      
      let response = await service.updateUser (User);
      res.json(response);
    } catch (error) {
      return res.json({error});
    }
  }

 export async function deleteUser(req: Request, res: Response) {
    try {
      let id = req.params.id;

      let response = await service.deleteUser(id);
     return res.json(response)
    } catch (error) {
      return res.json({
        error:error});
    }
  }