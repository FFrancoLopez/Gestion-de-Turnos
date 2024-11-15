import { AppointmentScheduleDto } from '../dto/AppointmentDto';
import {IAppointment, Status} from '../interfaces/IAppointment';

const appointments: IAppointment[] = [];
let appointmentIdCounter = 1;

// Retornamos el arreglo de turnos.
export const getAllAppointments = (): IAppointment[] => {
    return appointments;
}

// Retornamos el tuno por ID.
export const getAppointmentById = (id: number): IAppointment | undefined => {
    return appointments.find(app => app.id === id);
}

// Creamos un turno y lo agregamos al array.
export const createAppointment = (appointment: AppointmentScheduleDto): IAppointment | null => {
  
     // No se creará un turno sin recibir un usuario.
    if (!appointment) return null;
    const newAppointment: IAppointment = { id: appointmentIdCounter++, date: appointment.date, hour: appointment.hour, userId: appointment.userId, state: Status.Active };
    appointments.push(newAppointment);
    return newAppointment;
}

// Recibimos un id del turno y cambiamos su estado a “cancelled” para darle un estado de turno cancelado.
export const cancelAppointment = (id: number): boolean => {
    const appointment = getAppointmentById(id);
    if (appointment) {
        appointment.state = Status.Cancelled;
        return true;
    }
    return false;
}
