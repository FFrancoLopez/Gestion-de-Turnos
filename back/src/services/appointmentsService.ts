import { AppointmentModel, UserModel } from '../config/data-source';
import { AppointmentScheduleDto } from '../dto/AppointmentDto';
import { Appointment } from '../entities/Appointment';
import { Status } from '../interfaces/IAppointment';

// const appointments: IAppointment[] = [];
// let appointmentIdCounter = 1;

// Retornamos el arreglo de turnos.
// export const getAllAppointments = (): IAppointment[] => {
//     return appointments;
// }

// Obtenemos todos los turnos con sus relaciones.
export const getAllAppointmentsService = async (): Promise<Appointment[]> => {
    try {
      const appointments = await AppointmentModel.find({
        relations: ['user'], // Carga las relaciones necesarias.
      });
      return appointments;

    } catch (error) {
      console.error('Error al obtener turnos:', error);
      throw new Error('No se pudieron obtener los turnos. Por favor, inténtelo más tarde.');
    }
  };

// Retornamos el tuno por ID.
// export const getAppointmentById = (id: number): IAppointment | undefined => {
//     return appointments.find(app => app.id === id);
// }


// Obtenemos un turno por ID.
export const getAppointmentByIdService = async (id: number): Promise<Appointment | null> => {
    try {
        const appointment = await AppointmentModel.findOne({
            where: { id },
            relations: ['user'],
        });
  
        if (!appointment) {
            throw new Error(`Turno con ID ${id} no encontrado.`);
        }
        return appointment;
  
    } catch (error) {
        console.error(`Error al obtener turno con ID ${id}:`, error);
        throw new Error(`No se pudo obtener el turno con ID ${id}.`);
    }
  };

// // Creamos un turno y lo agregamos al array.
// export const createAppointment = (appointment: AppointmentScheduleDto): IAppointment | null => {
  
//      // No se creará un turno sin recibir un usuario.
//     if (!appointment) return null;
//     const newAppointment: IAppointment = { id: appointmentIdCounter++, date: appointment.date, hour: appointment.hour, userId: appointment.userId, state: Status.Active };
//     appointments.push(newAppointment);
//     return newAppointment;
// }


// Creamos un turno y lo guardamos en la base de datos.
export const createAppointmentService = async (appointmentDto: AppointmentScheduleDto): Promise<Appointment> => {
    const { date, hour, userId } = appointmentDto;
  
    try {
        // Validamos que el usuario exista antes de crear el turno.
        const user = await UserModel.findOneBy({ id: userId });
        if (!user) {
          throw new Error(`No se encontró un usuario con ID ${userId}.`);
        }
  
        // Creamos el turno
        const newAppointment = AppointmentModel.create({
            date,
            hour,
            state: Status.Active,
            user,
        });
        // Guardamos en la base de datos
        return await AppointmentModel.save(newAppointment);
  
      }catch (error) {
        console.error('Error al crear el turno:', error);
        throw new Error('No se pudo crear el turno. Por favor, verifique los datos.');
      }
  };

// // Recibimos un id del turno y cambiamos su estado a “cancelled” para darle un estado de turno cancelado.
// export const cancelAppointment = (id: number): boolean => {
//     const appointment = getAppointmentById(id);
//     if (appointment) {
//         appointment.state = Status.Cancelled;
//         return true;
//     }
//     return false;
// }


// Cancelamos un turno por ID (cambiamos su estado a "Cancelled").
export const cancelAppointmentService = async (id: number): Promise<boolean> => {
    try {
      const appointment = await getAppointmentByIdService(id);
  
      if (!appointment) {
        throw new Error(`No se encontró un turno con ID ${id}.`);
      }
      // Actualizamos el estado del turno.
      appointment.state = Status.Cancelled;
  
      await AppointmentModel.save(appointment);
      return true;

    }catch (error) {
      console.error(`Error al cancelar el turno con ID ${id}:`, error);
      throw new Error(`No se pudo cancelar el turno con ID ${id}.`);
    }
  };