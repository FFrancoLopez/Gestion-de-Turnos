interface IAppointment {
    id: number,
    date: Date,
    hour: Date,
    userId: number,
    state: "active" | "cancelled"
}

export default IAppointment;