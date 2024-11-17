import { CredentialModel } from "../config/data-source";
import { Credential } from "../entities/Credential";

// const credentials: ICredential[] = [];
// let credentialIdCounter: number = 1;


// export const createCredentialService: (a:string, b:string) => number = (userName: string, password: string): number => {
  
//   const newCredential: ICredential = { id: credentialIdCounter++, userName, password };
  
//   credentials.push(newCredential);
//   return newCredential.id;
// } 

// Creamos una nueva credencial.
export const createCredentialService = async (userName: string, password: string): Promise<number> => {
 try {
    if (!userName || !password) {
      throw new Error("El nombre de usuario y la contraseña son obligatorios.");
    }

    // Creamos nueva credencial.
    const credentialRepository = CredentialModel;
    const newCredential = new Credential;
    newCredential.username = userName;
    newCredential.password = password;

    // guardamos nueva credencial
    const savedCredential = await credentialRepository.save(newCredential);
    return savedCredential.id;

  }catch (error) {
    console.error("Error al crear la credencial:", error);
    throw new Error("No se pudo crear la credencial.");
 }
};

// Verificamos si existe un par de credenciales con el "userName" y "password" dados.
// export const validateCredentialService = async(userName: string, password: string):Promise<number | undefined> => {

//     // Con ".find" buscamos en el arreglo "credentials" el primer elemento que cumpla la condición. 
//     // Tomamos cada objeto "c" en el arreglo y verifica si su propiedad coincide con la que se le pasó a la función.
//     const credential = credentials.find( c => c.userName === userName);
//     if(!credentials) throw new Error(`El usuario ${userName} no fue encontrado`)

//     // verificamos que se haya encontrado un usuario con ese "userName" y que el "password" de ese objeto coincida con el password proporcionado.
//     //  Si lo encuentra, devuelve el id del objeto de credenciales; si no, devuelve null. 
//     return credential && credential.password === password ? credential.id : undefined;
// }

//  Valida credenciales por nombre de usuario y contraseña.
export const validateCredentialService = async (userName: string, password: string): Promise<number | undefined> => {

 try {
   if (!userName || !password) {
     throw new Error("El nombre de usuario y la contraseña son obligatorios.");
   }

   // Buscamos credencial por nombre de usuario.
   const credentialRepository = CredentialModel;
   const credential = await credentialRepository.findOne({
     where: { username: userName },
   });

   if (!credential) {
     throw new Error(`El usuario ${userName} no fue encontrado.`);
    }

   // Validacion de contraseña
   if (credential.password !== password) {
     return undefined; // Credenciales inválidas
    }
    return credential.id;

 } catch (error) {
   console.error(`Error al validar credencial para ${userName}:`, error);
   throw new Error("No se pudo validar la credencial.");
 }
};

// export const getCredentialByIdService = (id: number): ICredential | undefined => {
//     return credentials.find(c => c.id === id);
//   }

// Obtiene una credencial por ID.
export const getCredentialByIdService = async (id: number): Promise<Credential | undefined> => {

  try {
    const credentialRepository = CredentialModel;
    const credential = await credentialRepository.findOneBy({ id });

    if (!credential) {
      throw new Error(`Credencial con ID ${id} no encontrada.`);
    }
    return credential;

  } catch (error) {
    console.error(`Error al obtener credencial con ID ${id}:`, error);
    throw new Error("No se pudo obtener la credencial.");
  }
};