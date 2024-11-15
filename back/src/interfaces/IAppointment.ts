export interface IAppointment {
    id: number,
    date: Date,
    hour: string,
    userId: number,
    state: Status
}

export enum Status {
    "Active" = "active",
    "Cancelled" = "cancelled"
}
