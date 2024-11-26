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
export const registerUser = async (req: Request<unknown, unknown, IUserDto>, res: Response): Promise<void> => {
  try {
    const newUser = await createUserService(req.body);
    res.status(201).json(newUser);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    res.status(400).json({
      status: "error",
      message: "Error al registrar el usuario.",
      details: err.field ? [{ field: err.field, message: err.message }] : [{ field: "general", message: "Error desconocido." }],
    });
  }
};



export const loginUser = async (req: Request<unknown, unknown, ILoginUserDto>, res: Response): Promise<void> => {
  const { username, password } = req.body;

  try {
    // Validamos las credenciales
    const credential = await validateCredentialService(username, password);

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
    } else {
      // Si las credenciales no son válidas, lanzar un error genérico
      throw { field: "username", message: "Usuario o contraseña incorrectos" };
    }
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    console.error("Error al intentar iniciar sesión:", error);

    if (error.message.includes("incorrecta")) {
      
      res.status(400).json({
        field: "password",
        message: "La contraseña es incorrecta",
      });

    } else if (error.message.includes("no fue encontrado")) {

      res.status(400).json({
        field: "username",
        message: "El usuario no fue encontrado",
      });

    } else {
      // En caso de un error inesperado
      res.status(500).json({
        field: "general",
        message: "Ocurrió un error inesperado. Inténtelo nuevamente más tarde.",
      });
    }
  }
};
