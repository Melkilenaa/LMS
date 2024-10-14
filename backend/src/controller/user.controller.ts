import {Request, Response} from 'express';
import { UserService } from '../services/users.services';

let service = new UserService();
export async function createUser(req: Request, res: Response) {
  try {
      let response = await service.createUser(req, res, req.body);
      res.json(response);
  } catch (error) {
      res.status(500).json({ error });
  }
}

export async function getUser(req: Request, res: Response) {
  try {
      const result = await service.getUser(req, res); // Call the appropriate service function here
      res.send(result);
  } catch (error) {
      res.status(500).send(error);
  }
}
export async function viewOneUser(req: Request, res: Response) {
  try {
    const user_id = req.params.id;

    const response = await service.viewOneUser(req, res, user_id);
    
    if (!response) {
     res.status(404).json({ error: "User not found" });
    }
    res.json(response);
  } catch (error) {
    console.error("Error fetching user:", error);
    res.status(500).json({ error: (error as Error).message || "An error occurred" });
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
      res.status(500).json({ error });    }
  }

 export async function deleteUser(req: Request, res: Response) {
    try {
      let user_id = req.params.id;
      let response = await service.deleteUser(req, res, user_id);

      res.json(response)
    }  catch (error) {
      if (error instanceof Error) {
        res.status(500).json({ error: error.message });
      }
      res.status(500).json({ error: "An unknown error occurred" });
    }
  }