import ICredential from "../interfaces/ICredential"

interface IUserData {
    id: number,
    name: string,
    email: string,
    birthdate: string,
    nDni: number,
    credentialsId: ICredential,
}

export default IUserData;