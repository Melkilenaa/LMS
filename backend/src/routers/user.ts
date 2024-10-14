import { Router } from "express";
import { createUser, getUser, viewOneUser, updateUser, deleteUser } from "../controller/user.controller";

let user_router = Router();

user_router.post('/createUser', createUser);
user_router.get('/fetchall', getUser)
user_router.get('/get/:user_id', viewOneUser);
user_router.put('/update/:user_id',updateUser);
user_router.delete('/delete/:user_id', deleteUser);

export default user_router;