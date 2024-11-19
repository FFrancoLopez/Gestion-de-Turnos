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


// Creamos un nuevo usuario y asociamos su credencial.
export const createUserService = async (userDto: IUserDto): Promise<User> => {
  
  
  try {
    const result = await AppDataSource.transaction(async (entityManager: EntityManager) => {
      const userCredentials: Credential = await createCredentialService(entityManager, userDto.userName, userDto.password)
      const newUser: User = entityManager.create(User, {
        name: userDto.name,
        email: userDto.email,
        birthdate: userDto.birthdate, 
        DNI: userDto.nDni,
        credential: userCredentials,
      })
      return await entityManager.save(newUser)
    })
    return result
    
  } catch (error) {
    console.error("Error al crear el usuario:", { userDto, error });
    throw new Error("No se pudo crear el usuario.");
  }
};