import { EntityManager } from "typeorm";
import { CredentialModel } from "../config/data-source";
import { Credential } from "../entities/Credential";
import bcrypt from "bcrypt";

// Función para cifrar la contraseña usando bcrypt.
const crypPass = async (password: string): Promise<string> => {
  const saltRounds = 10; // Puedes ajustar los rounds según tus necesidades
  const hashedPassword = await bcrypt.hash(password, saltRounds);
  return hashedPassword;
};

// Creamos una nueva credencial.
export const createCredentialService: (entityManager: EntityManager, username: string, password: string) => Promise<Credential> = async (entityManager: EntityManager, username: string, password: string): Promise<Credential> => {
  try {
    if (!username || !password) {
      throw new Error("El nombre de usuario y la contraseña son obligatorios.");
    }

    const passwordEncripted: string = await crypPass(password);

    const credentials: Credential = entityManager.create(Credential, {
      username: username,
      password: passwordEncripted
    });

    // Guardamos nueva credencial
    return await entityManager.save(credentials);
  } catch (error) {
    console.error("Error al crear la credencial:", error);
    throw new Error("No se pudo crear la credencial.");
  }
};

// Valida credenciales por nombre de usuario y contraseña.
export const validateCredentialService = async (username: string, password: string): Promise<Credential | null> => {
  try {
    // Validaciones previas
    if (!username) {
      throw { field: "username", message: "El nombre de usuario es obligatorio." };
    }
    if (!password) {
      throw { field: "password", message: "La contraseña es obligatoria." };
    }

    // Buscamos la credencial por nombre de usuario.
    const credentialRepository = CredentialModel;
    const credential: Credential | null = await credentialRepository.findOne({
      where: { username },
      relations: ["user"],
    });

    if (!credential) {
      throw { field: "username", message: `El usuario ${username} no fue encontrado.` };
    }

    // Comparamos la contraseña ingresada con la almacenada en la base de datos
    const passwordMatch = await bcrypt.compare(password, credential.password);

    if (!passwordMatch) {
      throw { field: "password", message: "La contraseña es incorrecta." };
    }

    return credential; // Retornamos la credencial si las credenciales son correctas

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    
    console.error(`Error al validar credenciales para ${username}:`, error);
    if (error.field && error.message) {
      throw error;
    } else {
      // error inesperado:
      throw { field: "general", message: "No se pudo validar las credenciales. Intenta nuevamente." };
    }
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
