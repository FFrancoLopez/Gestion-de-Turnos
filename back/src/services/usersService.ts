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

export const createUser = (name: string, email: string, birthdate: Date, nDni: number, username: string, password: string): IUser => {
  
    // Obtenemos solo el ID de las credenciales.
    const credentialId = createCredential(username, password);

    const credential = getCredentialById(credentialId); // Obtenemos el objeto ICredential completo usando el ID
    if (!credential) {
        throw new Error('Error al crear las credenciales'); // Manejamos un caso de error si no se encuentra
    }
    const newUser: IUser = { id: userIdCounter++, name, email, birthdate, nDni, credentialsId: credential };
    users.push(newUser);
    return newUser;
}
