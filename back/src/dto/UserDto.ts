import ICredential from "../interfaces/ICredential"

interface IUserData {
    id: number,
    credential: ICredential,
    email: string,
    imagen: string
}

export default IUserData;