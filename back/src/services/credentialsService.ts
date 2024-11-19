import { EntityManager } from "typeorm";
import { CredentialModel } from "../config/data-source";
import { Credential } from "../entities/Credential";

const crypPass = async (password: string): Promise<string> => {
  const encoder = new TextEncoder()
  const data = encoder.encode(password)
  const hash = await crypto.subtle.digest("SHA-256", data)
  const hashArray = Array.from(new Uint8Array(hash))
  const passCrypt = hashArray.map( b => b.toString(16).padStart(2, "0")).join("")
  return passCrypt
};
// export const createCredentialService: (a: string, b: string) => Promise<Credential> = async (entityManager: EntityManager,
//   username: string, password: string): Promise<Credential> => {
  
  // const credentialObject = {
  // username,
  // password: passwordEncripted
  
  // const newCredential = CredentialModel.create(credentialObject)
  // return await CredentialModel.save(newCredential)

// Creamos una nueva credencial.
export const createCredentialService: ( entityManager: EntityManager, a: string, b: string ) => Promise<Credential> = async ( entityManager: EntityManager, userName: string, password: string ): Promise<Credential> => {
 
  const passwordEncripted: string = await crypPass(password)

  try {
    if (!userName || !password) {
      throw new Error("El nombre de usuario y la contraseña son obligatorios.");
    }


    // Creamos nueva credencial.
    // const credentialRepository = CredentialModel;
    // const newCredential = new Credential;
    // newCredential.username = userName;
    // newCredential.password = passwordEncripted;
    const credentials: Credential = entityManager.create(Credential, {
      username: userName,
      password: passwordEncripted
    })

    // guardamos nueva credencial
    return await entityManager.save(credentials)
    

  }catch (error) {
    console.error("Error al crear la credencial:", error);
    throw new Error("No se pudo crear la credencial.");
 }
};



//  Valida credenciales por nombre de usuario y contraseña.
export const validateCredentialService = async (login: boolean, userName: string, password: string): Promise<Credential> => {

 try {
   if (!userName || !password) {
     throw new Error("El nombre de usuario y la contraseña son obligatorios.");
   }

   // Buscamos credencial por nombre de usuario.
   const credentialRepository = CredentialModel;
   const credential = await credentialRepository.findOne({
     where: { username: userName },
     relations: ["user"],
   });

   if (!credential) {
     throw new Error(`El usuario ${userName} no fue encontrado.`);
    }

   // Validacion de contraseña
   if (credential.password !== password) {
    throw new Error(`La contraseña ${password} es incorrecta.`);
    // Credenciales inválidas
    }
    return credential;
    
  } catch (error) {
   console.error(`Error al validar credencial para ${userName}:`, error);
   throw new Error("No se pudo validar la credencial.");
  }
};



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