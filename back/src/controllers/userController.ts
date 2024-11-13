import { Request, Response } from "express";
// import { getUsersService, createUserService, loginUserService } from "../services/usersService";
// import IUser from "../interfaces/IUser";

export const getAllUsers = (req: Request, res: Response) => {
    res.send('Listado de todos los usuarios');
  };
  
  export const getUserById = (req: Request, res: Response) => {
    res.send(`Detalle del usuario con ID ${req.params.id}`);
  };
  
  export const registerUser = (req: Request, res: Response) => {
    res.send('Registro de un nuevo usuario');
  };
  
  export const loginUser = (req: Request, res: Response) => {
    res.send('Login del usuario');
  };

// export const createUser = async(req: Request, res: Response)=>{
//     const {id, credential, email, imagen} = req.body;
//     const newUser: IUser = await createUserService ({id, credential, email, imagen});
//     res.status(201).json(newUser);
//  };