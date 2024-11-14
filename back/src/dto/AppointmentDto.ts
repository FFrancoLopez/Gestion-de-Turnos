export interface AppointmentScheduleDto {
    id : number,
    date : Date,
    hour: Date,
    userId: number,
    state: Status.Active
}

export enum Status {
    "Active" = "active",
    "Cancelled" = "cancelled"
}