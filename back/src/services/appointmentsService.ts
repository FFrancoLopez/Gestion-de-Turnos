import { AppointmentModel, UserModel } from '../config/data-source';
import { AppointmentScheduleDto } from '../dto/AppointmentDto';
import { Appointment } from '../entities/Appointment';
import { Status } from '../interfaces/IAppointment';



// Obtenemos todos los turnos con sus relaciones.
export const getAllAppointmentsService = async (): Promise<Appointment[]> => {
  try {
    // Buscamos los turnos junto con la relación "user"
    const appointments = await AppointmentModel.find({
      relations: ['user'], // Incluimos las relaciones necesarias
    });

    return appointments;

  } catch (error) {

    if (error instanceof Error) {
      // Manejo de errores conocidos
      console.error('Error al obtener turnos:', error.message);
      throw new Error('No se pudieron obtener los turnos. Por favor, inténtelo más tarde.');

    } else {
      
      // Manejo de errores desconocidos
      console.error('Error desconocido al obtener turnos:', error);
      throw new Error('Ocurrió un error inesperado al intentar obtener los turnos.');
    }
  }
};



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




// Creamos un turno y lo guardamos en la base de datos.
export const createAppointmentService = async (appointmentDto: AppointmentScheduleDto): Promise<Appointment> => {
  const { date, hour, userId } = appointmentDto;

  // Validamos datos de entrada
  if (!date || !hour || !userId) {
    throw new Error('Faltan datos obligatorios para crear el turno.');
  }

  try {
    // Verifica si el usuario existe
    const user = await UserModel.findOneBy({ id: userId });
    if (!user) {
      throw new Error(`El usuario con ID ${userId} no existe.`);
    }

    // Crear y guardar el turno
    const newAppointment = AppointmentModel.create({
      date,
      hour,
      state: Status.Active,
      user,
    });
    return await AppointmentModel.save(newAppointment);

  } catch (error) {
    if (error instanceof Error) {
      // instanciamos para poder acceder a error.message
      throw new Error(error.message);
    } else {
      // Si no es una instancia de Error, maneja el caso genérico
      throw new Error('Ocurrió un error desconocido al intentar crear el turno.');
    }
  }
};





// Cancelamos un turno por ID (cambiamos su estado a "Cancelled").
export const cancelAppointmentService = async (id: number): Promise<boolean> => {
  try {
    // Buscar el turno por ID
    const appointment = await getAppointmentByIdService(id);

    if(appointment?.state === Status.Cancelled){
      throw new Error (`El turno con el ID ${id} ya fue cancelado`)
    }

    if (!appointment) {
      throw new Error(`No se encontró un turno con ID ${id}.`);
    }

    // Actualizamos el estado del turno
    appointment.state = Status.Cancelled;
    await AppointmentModel.save(appointment);

    return true;
  } catch (error) {

    if (error instanceof Error) {

      console.error(`Error al cancelar el turno con ID ${id}:`, error.message);
      throw new Error(error.message);
      
    } else {
      console.error(`Error desconocido al cancelar el turno con ID ${id}:`, error);
      throw new Error('Ocurrió un error inesperado al intentar cancelar el turno.');
    }
  }
};
