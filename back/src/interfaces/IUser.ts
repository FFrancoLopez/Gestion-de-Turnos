import ICredential from "./ICredential"
interface IUser {
    id: number,
    credential: ICredential,
    email: string,
    imagen: string
}
export default IUser;