import { Request, Response } from "express";
import { getUserByIdService, getAllUsersService, createUserService} from "../services/usersService"
import { validateCredentialService } from "../services/credentialsService"
import { ILoginUserDto, IUserDto } from "../dto/UserDto";


// Obtemos el listado de todos los usuarios.
export const getUsers = async (req: Request, res: Response): Promise<void> => {
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
      if (!user) {
        res.status(404).json({ message: `Usuario con ID ${userId} no encontrado.` });
      return;
      }
      res.status(200).json(user);
    }catch{
      res.status(500).json({ message: 'Error interno del Servidor' });
    }
     
  };
  
  // Registramos un nuevo usuario.
  export const registerUser = async(req: Request < unknown, unknown, IUserDto >, res: Response): Promise<void> => {
    
    // const {name, email, birthdate, nDni, userName, password} = req.body;
    try {
      const newUser = await createUserService(req.body);
      res.status(201).json(newUser);

    }catch {
      res.status(400).json({message: 'Solicitud incompleta'})
    }
    
    // if (!name || !email || !birthdate || !nDni || !userName || !password) {
      
    //   res.status(400).json({ message: 'Faltan datos para el registro' });
    // }
    // const newUser = createUserService(req.body);
    // res.status(201).json(newUser);  
  };
  
  // Login del usuario a la aplicacion web.
  export const loginUser = (req: Request < unknown, unknown, ILoginUserDto >, res: Response): void => {
    const {userName, password} = req.body;
    const credentialId = validateCredentialService(userName, password);
    if (credentialId !== null) {
      
      res.json({message: 'Inicio de sesión exitoso', credentialId});
    }else{

      res.status(401).json({messange: 'Credenciales incorrectas'});
    }
  };
