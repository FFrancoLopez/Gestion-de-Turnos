
export interface IUserDto {
    name: string,
    email: string,
    birthdate: Date,
    nDni: number,
    username: string,
    password: string
}

export interface ILoginUserDto {
    login: true,
    username: string,
    password: string
}