import { Request, Response } from "express";
import { getUserByIdService, getAllUsersService, createUserService} from "../services/usersService"
import { validateCredentialService } from "../services/credentialsService"
import { ILoginUserDto, IUserDto } from "../dto/UserDto";


// Obtemos el listado de todos los usuarios.
export const getAllUsers = async (req: Request, res: Response): Promise<void> => {
  try {
    const users = await getAllUsersService();
    res.status(200).json(users);
  
  }catch{
    res.status(404).json({message: 'Usuarios no encontrados.'})
  }  
};
  
// Obtenemos los detalles de un usuario especifico.
export const getUserById = async(req: Request < {id: string} >, res: Response): Promise<void> => {
  const userId = parseInt(req.params.id);
  try {
    const user = await getUserByIdService(userId);
    res.status(200).json(user);

  }catch {
    res.status(404).json({ message: `Usuario con ID ${userId} no encontrado.`});
    return;
  }
     
};
  
// Registramos un nuevo usuario.
export const registerUser = async(req: Request < unknown, unknown, IUserDto >, res: Response): Promise<void> => {
    
  try {
    const newUser = await createUserService(req.body);
    res.status(201).json(newUser);
  }catch {
    res.status(400).json({message: 'Solicitud incompleta. Usuario ya existente.'})
  }
    
     
};


// Login del usuario a la aplicacion web.
export const loginUser = async (req: Request < unknown, unknown, ILoginUserDto >, res: Response): Promise<void> => {
  const {login, userName, password} = req.body;
  try{

    const credential = await validateCredentialService(login, userName, password);
    
    if (credential !== null) {
      res.status(200).json({
        login: true,
        user: {
          id: credential.user.id,
          name: credential.user.name,
          email: credential.user.email,
          birthdate: credential.user.birthdate,
          nDni: credential.user.DNI,
        },
      });
    }  
  }catch{
    res.status(400).json({messange: 'Credencial incorrecta.'});
  }
    

};