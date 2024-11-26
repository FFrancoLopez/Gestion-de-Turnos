import { EntityManager } from 'typeorm';
import { AppDataSource, UserModel } from '../config/data-source';
import { IUserDto } from '../dto/UserDto';
import { User } from '../entities/User';
import { createCredentialService } from './credentialsService';
import { Credential } from '../entities/Credential';


//  Obtienemos todos los usuarios con sus relaciones.
export const getAllUsersService = async (): Promise<User[]> => {
  try {
    const users:User[] = await UserModel.find({
      relations: ['credential', 'appointments'], // Cargamos las relaciones que necesitamos.
    });
    return users;

  } catch (error) {

    console.error('Error al obtener usuarios:', error);
    throw new Error('No se pudieron obtener los usuarios. Por favor, inténtelo más tarde.');
  }
};


// Obtienemos un usuario por ID, con sus relaciones.
export const getUserByIdService = async (id: number): Promise<User | null> => {
 try {
   const user: User | null = await UserModel.findOne({
      where: { id },
      relations: [ 'appointments' ],
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


// Creamos un nuevo usuario y asociamos su credencial
export const createUserService = async (userDto: IUserDto): Promise<User> => {
  const { email, username, nDni } = userDto;

  // Validaciones previas para evitar duplicados
  const existingEmail = await UserModel.findOne({ where: { email } });
  if (existingEmail) {
    throw { field: "email", message: "El email ya está en uso." };
  }

  const existingUsername = await AppDataSource.getRepository(Credential).findOne({ where: { username } });
  if (existingUsername) {
    throw { field: "username", message: "El nombre de usuario ya está en uso." };
  }

  const existingDni = await UserModel.findOne({ where: { DNI: nDni } });
  if (existingDni) {
    throw { field: "nDni", message: "El DNI ya está en uso." };
  }

  // Transacción para crear usuario y asociar credenciales
  try {
    const result = await AppDataSource.transaction(async (entityManager: EntityManager) => {
      // Crear credenciales
      const userCredentials: Credential = await createCredentialService(entityManager, username, userDto.password);

      // Crear usuario
      const newUser: User = entityManager.create(User, {
        name: userDto.name,
        email,
        birthdate: userDto.birthdate,
        DNI: nDni,
        credential: userCredentials,
      });

      return await entityManager.save(newUser);
    });

    return result;
  } catch (err) {
    console.error("Error al crear el usuario:", { userDto, err });
    throw { field: "general", message: "No se pudo crear el usuario. Verifique su fecha de nacimiento e intentelo nuevamente. " };
  }
};