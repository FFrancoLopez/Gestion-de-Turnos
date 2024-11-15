
export interface IUserDto {
    name: string,
    email: string,
    birthdate: Date,
    nDni: number,
    userName: string,
    password: string
}

export interface ILoginUserDto {
    userName: string,
    password: string
}