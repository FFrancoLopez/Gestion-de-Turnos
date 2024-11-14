import Appointment from '../interfaces/IAppointment';

const appointments: Appointment[] = [];
let appointmentIdCounter = 1;

// Retornamos el arreglo de turnos.
export const getAllAppointments = (): Appointment[] => {
    return appointments;
}

// Retornamos el tuno por ID.
export const getAppointmentById = (id: number): Appointment | undefined => {
    return appointments.find(app => app.id === id);
}

// Creamos un turno y lo agregamos al array.
export const createAppointment = (date: Date, hour: Date, userId: number): Appointment | null => {
  
     // No se creará un turno sin recibir un usuario.
    if (!userId) return null;
    const newAppointment: Appointment = { id: appointmentIdCounter++, date, hour, userId, state: "active" };
    appointments.push(newAppointment);
    return newAppointment;
}

// Recibimos un id del turno y cambiamos su estado a “cancelled” para darle un estado de turno cancelado.
export const cancelAppointment = (id: number): boolean => {
    const appointment = getAppointmentById(id);
    if (appointment) {
        appointment.state = "cancelled";
        return true;
    }
    return false;
}
