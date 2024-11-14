import ICredential  from "../interfaces/ICredential"

const credentials: ICredential[] = [];
let credentialIdCounter = 1;

export const createCredential = (userName: string, password: string): number => {
  const newCredential: ICredential = { id: credentialIdCounter++, userName, password };
  credentials.push(newCredential);
  return newCredential.id;
}


// Verificamos si existe un par de credenciales con el "userName" y "password" dados.
export const validateCredential = (userName: string, password: string): number | null => {

    // Con ".find" buscamos en el arreglo "credentials" el primer elemento que cumpla la condición. 
    // Tomamos cada objeto "c" en el arreglo y verifica si su propiedad coincide con la que se le pasó a la función.
    const credential = credentials.find( c => c.userName === userName);

    // verificamos que se haya encontrado un usuario con ese "userName" y que el "password" de ese objeto coincida con el password proporcionado.
    //  Si lo encuentra, devuelve el id del objeto de credenciales; si no, devuelve null. 
    return credential && credential.password === password ? credential.id : null;
}


export const getCredentialById = (id: number): ICredential | undefined => {
    return credentials.find(c => c.id === id);
  }