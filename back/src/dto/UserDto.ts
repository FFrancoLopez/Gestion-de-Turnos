
export interface IUserDto {
    name: string,
    email: string,
    birthdate: Date,
    nDni: number,
    userName: string,
    password: string
}

export interface ILoginUserDto {
    login: true,
    userName: string,
    password: string
}