import ICredential from "../interfaces/ICredential"

export interface IUserDto {
    id: number,
    name: string,
    email: string,
    birthdate: string,
    nDni: number,
    credentialsId: ICredential,
}

export interface ILoginUserDto {
    id: number,
    userName: string,
    password: string
}