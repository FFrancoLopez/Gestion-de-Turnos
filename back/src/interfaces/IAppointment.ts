export interface IAppointment {
    id: number,
    description: string,
    date: Date,
    hour: string,
    userId: number,
    state: Status
}

export enum Status {
    "Active" = "Activo",
    "Cancelled" = "Cancelado"
}
