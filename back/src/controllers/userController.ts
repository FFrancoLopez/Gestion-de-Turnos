import { Request, Response } from "express";
import {getAllUsers, getUserById, createUser} from "../services/usersService"
import { validateCredential } from "../services/credentialsService"
import { ILoginUserDto, IUserDto } from "../dto/UserDto";
// import IUser from "../interfaces/IUser";


// Obtemos el listado de todos los usuarios.
export const getUsers = (req: Request, res: Response): void => {
    const users = getAllUsers();
    res.json(users);
  };
  
  // Obtenemos los detalles de un usuario especifico.
  export const getUser = (req: Request < {id: string} >, res: Response): void => {
    const userId = parseInt(req.params.id);
    const user = getUserById(userId);
    if (user) {
      res.json(user);
    }else{
      res.status(404).json({message: 'Usuario no encontrado'});
    }
  };
  
  // Registramos un nuevo usuario.
  export const registerUser = (req: Request < unknown, unknown, IUserDto >, res: Response):void => {
    const {name, email, birthdate, nDni, credentialsId: ICredential} = req.body;
    
    if (!name || !email || !birthdate || !nDni || !ICredential.userName || !ICredential.password) {
      
      res.status(400).json({ message: 'Faltan datos para el registro' });
    }
    const newUser = createUser(name, email, new Date(birthdate), nDni, ICredential.userName, ICredential.password);
    res.status(201).json(newUser);  
  };
  
  // Login del usuario a la aplicacion web.
  export const loginUser = (req: Request < unknown, unknown, ILoginUserDto >, res: Response): void => {
    const {userName, password} = req.body;
    const credentialId = validateCredential(userName, password);
    if (credentialId !== null) {
      
      res.json({message: 'Inicio de sesión exitoso', credentialId});
    }else{

      res.status(401).json({messange: 'Credenciales incorrectas'});
    }
  };
