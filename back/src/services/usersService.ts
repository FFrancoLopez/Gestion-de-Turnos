import { IUserDto } from '../dto/UserDto';
import IUser from '../interfaces/IUser';
import { createCredential, getCredentialById } from './credentialsService';

const users: IUser[] = [];
let userIdCounter = 1;

export const getAllUsers = (): IUser[] => {
  return users;
}

export const getUserById = (id: number): IUser | undefined => {
  return users.find(user => user.id === id);
}

export const createUser = async (user: IUserDto): Promise<IUser> => {
  
    // Obtenemos solo el ID de las credenciales.
    const credentialsId: number = createCredential(user.userName, user.password);

    const credential = getCredentialById(credentialsId); // Obtenemos el objeto ICredential completo usando el ID
    if (!credential) {
        throw new Error('Error al crear las credenciales'); // Manejamos un caso de error si no se encuentra
    }
    const newUser: IUser = { id: userIdCounter++, name: user.name, email: user.email, birthdate: user.birthdate, nDni: user.nDni, credentialsId: credentialsId };
    users.push(newUser);
    return newUser;
}
