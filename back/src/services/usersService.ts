import { CredentialModel, UserModel } from '../config/data-source';
import { IUserDto } from '../dto/UserDto';
import { User } from '../entities/User';
import { createCredentialService } from './credentialsService';

// const users: IUser[] = [];
// let userIdCounter = 1;

// export const getAllUsersService = async (): Promise <User[]> => {
//   const users = await UserModel.find();
//   return users;
// }

//  Obtienemos todos los usuarios con sus relaciones.
export const getAllUsersService = async (): Promise<User[]> => {
  try {
    const users = await UserModel.find({
      relations: ['credential', 'appointments'], // Cargamos las relaciones que necesitamos.
    });
    return users;

  } catch (error) {

    console.error('Error al obtener usuarios:', error);
    throw new Error('No se pudieron obtener los usuarios. Por favor, inténtelo más tarde.');
  }
};

// export const getUserById = async (id: number): Promise< User | null > => {
//   const user = await UserModel.findOneBy({id})
//   return user;
// }

// Obtienemos un usuario por ID, con sus relaciones.
export const getUserByIdService = async (id: number): Promise<User | null> => {
 try {
   const user = await UserModel.findOne({
      where: { id },
      relations: ['credential', 'appointments'],
    });

   if (!user) {
      throw new Error(`Usuario con ID ${id} no encontrado.`);
    }
    return user;

  } catch (error) {
    console.error(`Error al obtener usuario con ID ${id}:`, error);
    throw new Error(`No se pudo obtener el usuario con ID ${id}.`);
  }
};

// export const createUserService = async (user: IUserDto): Promise<IUser> => {
  
//   // Obtenemos solo el ID de las credenciales.
//   const credentialsId: number = createCredential(user.userName, user.password);
//   const credential = getCredentialById(credentialsId); // Obtenemos el objeto ICredential completo usando el ID
//   if (!credential) {
//     throw new Error('Error al crear las credenciales'); // Manejamos un caso de error si no se encuentra
//   }

//   const newUser: IUser = { id: userIdCounter++, name: user.name, email: user.email, birthdate: user.birthdate, nDni: user.nDni, credentialsId: credentialsId };
  
//   users.push(newUser);
//   return newUser;
// }

// Creamos un nuevo usuario y asociamos su credencial.
export const createUserService = async (userDto: IUserDto): Promise<User> => {
  const { userName, password, name, email, birthdate, nDni } = userDto;

  try {
    if (!userName || !password) {
      throw new Error("El nombre de usuario y la contraseña son obligatorios.");
    }

    // Crear credenciales y obtener su ID
    const credentialId = await createCredentialService(userName, password);
    const credentialRepository = CredentialModel;
    const credential = await credentialRepository.findOneBy({ id: credentialId });

    if (!credential) {
      throw new Error("No se pudo asociar las credenciales al usuario.");
    }

    // Creamos usuario y asociamos su credencial.
    const userRepository = UserModel;
    const newUser = new User();
    newUser.name = name;
    newUser.email = email;
    newUser.birthdate = birthdate; // Se converte a formato de fecha.
    newUser.DNI = nDni;
    newUser.credential = credential;

    // Guardamos usuario en la base de datos
    const savedUser = await userRepository.save(newUser);
    return savedUser;
  } catch (error) {
    console.error("Error al crear el usuario:", { userDto, error });
    throw new Error("No se pudo crear el usuario.");
  }
};
